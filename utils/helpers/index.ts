import { Transaction, TransactionStats } from "@/types/transactions/types";
import { TODAY } from "../constant/const";

export const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

function prevMonth(month: string): string {
    const [y, m] = month.split('-').map(Number);
    return m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, '0')}`;
}

function prevDay(day: string): string {
    const d = new Date(day);
    d.setUTCDate(d.getUTCDate() - 1);
    return d.toISOString().slice(0, 10);
}

function pct(curr: number, prev: number): number {
    if (prev === 0) return curr === 0 ? 0 : 100;
    return Math.round(((curr - prev) / prev) * 100);
}

export function computeStats(txns: Transaction[], month: string): TransactionStats {
    const last = prevMonth(month);
    const yesterday = prevDay(TODAY);

    const inMonth = (t: Transaction, m: string) => t.date.startsWith(m);
    const inDay = (t: Transaction, d: string) => t.date.startsWith(d);

    const thisMonth = txns.filter((t) => inMonth(t, month));
    const lastMonth = txns.filter((t) => inMonth(t, last));

    const revenue = (xs: Transaction[]) =>
        xs.filter((t) => t.status === 'completed' && t.amount > 0)
            .reduce((s, t) => s + t.amount, 0);

    const completed = thisMonth.filter((t) => t.status === 'completed');
    const avgValue = completed.length
        ? Math.round(completed.reduce((s, t) => s + Math.abs(t.amount), 0) / completed.length)
        : 0;

    return {
        monthlyRevenue: {
            amount: revenue(thisMonth),
            changePercent: pct(revenue(thisMonth), revenue(lastMonth)),
        },
        totalTransactions: {
            count: thisMonth.length,
            changePercent: pct(
                txns.filter((t) => inDay(t, TODAY)).length,
                txns.filter((t) => inDay(t, yesterday)).length,
            ),
        },
        refundsToday: {
            total: thisMonth.filter((t) => t.status === 'refunded').length,
            issuedToday: txns.filter((t) => t.status === 'refunded' && inDay(t, TODAY)).length,
        },
        avgTransactionValue: {
            value: avgValue,
        },
    };
}


