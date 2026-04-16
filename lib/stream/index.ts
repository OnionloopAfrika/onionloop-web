import { computeStats } from "@/utils/helpers";
import { delay } from "@/utils/helpers";
import { MOCK_TRANSACTIONS } from "../mockdata";
import { TransactionFilters, TransactionListResponse, TransactionStats } from "@/types/transactions/types";

export async function fetchTransactionStats(month = '2026-03'): Promise<TransactionStats> {
    await delay();
    return computeStats(MOCK_TRANSACTIONS, month);
}

export async function fetchTransactions(
    filters: TransactionFilters = {},
): Promise<TransactionListResponse> {
    await delay();

    const { search, status, month, page = 1, pageSize = 10 } = filters;
    let results = [...MOCK_TRANSACTIONS];

    if (status && status !== 'all') {
        results = results.filter((t) => t.status === status);
    }
    if (month) {
        results = results.filter((t) => t.date.startsWith(month));
    }
    if (search) {
        const q = search.toLowerCase().trim();
        results = results.filter(
            (t) => t.id.toLowerCase().includes(q) || Math.abs(t.amount).toString().includes(q),
        );
    }

    results.sort((a, b) => b.date.localeCompare(a.date)); // newest first

    const total = results.length;
    const start = (page - 1) * pageSize;

    return {
        transactions: results.slice(start, start + pageSize),
        total,
        page,
        pageSize,
    };
}