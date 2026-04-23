export type InvoiceStatus = 'Paid' | 'Failed';

export interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: InvoiceStatus;
    isWarning?: boolean;
    isCritical?: boolean;
}