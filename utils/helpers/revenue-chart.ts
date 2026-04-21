import { Transaction } from "@/types/transactions/types";
import { Period } from "@/types/transactions/types";
import { DAY_NAMES } from "../constant/const";
import { MONTH_NAMES } from "../constant/const";
import { DataPoint } from "@/types/transactions/types";
import { RevenuePayload } from "@/types/transactions/types";
import { MOCK_TRANSACTIONS } from "@/lib/mockdata";

function toDateKey(iso: string): string {
    return iso.slice(0, 10); // "YYYY-MM-DD"
}

function addDays(base: Date, n: number): Date {
    const d = new Date(base);
    d.setUTCDate(d.getUTCDate() + n);
    return d;
}

function sumAmounts(txns: Transaction[]): number {
    return txns.reduce((acc, t) => acc + t.amount, 0);
}

function latestDate(txns: Transaction[]): Date {
    return new Date(Math.max(...txns.map((t) => new Date(t.date).getTime())));
}


function build7DaySeries(txns: Transaction[]): { series: DataPoint[]; earnedToday: number } {
    const latest = latestDate(txns);

    const byDay = new Map<string, number>();
    for (const t of txns) {
        const k = toDateKey(t.date);
        byDay.set(k, (byDay.get(k) ?? 0) + t.amount);
    }

    const start = addDays(latest, -6);
    const series = Array.from({ length: 7 }, (_, i) => {
        const d = addDays(start, i);
        return {
            label: DAY_NAMES[d.getUTCDay()],
            value: byDay.get(toDateKey(d.toISOString())) ?? 0,
        };
    });

    return {
        series,
        earnedToday: byDay.get(toDateKey(latest.toISOString())) ?? 0,
    };
}

/**
 * 30-day view
 * Window  : most recent calendar month in the data
 * Labels  : Wk 1 (days 1–7) | Wk 2 (8–14) | Wk 3 (15–21) | Wk 4 (22–end)
 * earnedToday: Wk 4 total
 *
 * Result from MOCK_TRANSACTIONS (March 2026):
 *   Wk 1 15 000 | Wk 2 28 400 | Wk 3 −3 200 | Wk 4 64 300
 */
function build30DaySeries(txns: Transaction[]): { series: DataPoint[]; earnedToday: number } {
    const latest = latestDate(txns);
    const year = latest.getUTCFullYear();
    const month = latest.getUTCMonth();

    const inMonth = txns.filter((t) => {
        const d = new Date(t.date);
        return d.getUTCFullYear() === year && d.getUTCMonth() === month;
    });

    const WEEKS = [
        { label: "Wk 1", test: (d: number) => d >= 1 && d <= 7 },
        { label: "Wk 2", test: (d: number) => d >= 8 && d <= 14 },
        { label: "Wk 3", test: (d: number) => d >= 15 && d <= 21 },
        { label: "Wk 4", test: (d: number) => d >= 22 },
    ];

    const series = WEEKS.map(({ label, test }) => ({
        label,
        value: sumAmounts(inMonth.filter((t) => test(new Date(t.date).getUTCDate()))),
    }));

    return { series, earnedToday: series[series.length - 1].value };
}

/**
 * 90-day view
 * Window  : last 3 distinct calendar months present in the data
 * Labels  : month abbreviation  (Jan, Feb, Mar)
 * earnedToday: most recent month total
 *
 * Result from MOCK_TRANSACTIONS:
 *   Jan 118 200 | Feb 125 100 | Mar 104 500
 */
function build90DaySeries(txns: Transaction[]): { series: DataPoint[]; earnedToday: number } {
    const monthKeys = [
        ...new Set(
            txns.map((t) => {
                const d = new Date(t.date);
                return `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
            })
        ),
    ].sort((a, b) => {
        const [ay, am] = a.split("-").map(Number);
        const [by, bm] = b.split("-").map(Number);
        return ay !== by ? ay - by : am - bm;
    });

    const series = monthKeys.slice(-3).map((key) => {
        const [y, m] = key.split("-").map(Number);
        const inMonth = txns.filter((t) => {
            const d = new Date(t.date);
            return d.getUTCFullYear() === y && d.getUTCMonth() === m;
        });
        return { label: MONTH_NAMES[m], value: sumAmounts(inMonth) };
    });

    return { series, earnedToday: series[series.length - 1].value };
}

// ─── Period router ────────────────────────────────────────────────────────────

function computeRevenue(period: Period): RevenuePayload {
    const { series, earnedToday } = {
        "7days": build7DaySeries,
        "30days": build30DaySeries,
        "90days": build90DaySeries,
    }[period](MOCK_TRANSACTIONS);

    return { period, earnedToday, series };
}

// ─── Public fetch ─────────────────────────────────────────────────────────────

function simulateDelay(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}

export async function fetchRevenue(period: Period): Promise<RevenuePayload> {
    await simulateDelay(500);
    return computeRevenue(period);
}

