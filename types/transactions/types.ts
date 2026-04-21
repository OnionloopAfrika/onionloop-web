export type Period = "7days" | "30days" | "90days";

export type TransactionStatus = "completed" | "pending" | "refunded" | "failed";

export interface Transaction {
    id: string;              // "TXN-7821"
    customerName: string;    // "Adaeze Nwosu"
    amount: number;          // signed: +credit / -debit (e.g. 45000, -3200)
    processedBy: string;     // "Titi Folarin"
    status: TransactionStatus;
    date: string;            // ISO 8601
}

export interface TransactionStats {
    monthlyRevenue: {
        amount: number;          // Σ completed credits in selected month
        changePercent: number;   // vs previous month
    };
    totalTransactions: {
        count: number;           // count in selected month
        changePercent: number;   // today's count vs yesterday's
    };
    refundsToday: {
        total: number;           // refunded txns in selected month
        issuedToday: number;     // refunded txns dated today
    };
    avgTransactionValue: {
        value: number;           // mean |amount| of completed txns in month
    };
}

export interface TransactionFilters {
    search?: string;
    status?: TransactionStatus | 'all';
    month?: string;            // "YYYY-MM"
    page?: number;
    pageSize?: number;
}

export interface TransactionListResponse {
    transactions: Transaction[];
    total: number;
    page: number;
    pageSize: number;
}

export interface DataPoint {
    label: string;
    value: number;
}

export interface RevenuePayload {
    period: Period;
    earnedToday: number; // most-recent bucket total — formatting is the UI's job
    series: DataPoint[];
}