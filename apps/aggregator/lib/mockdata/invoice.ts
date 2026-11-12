import { Invoice } from "@/types/invoice";

export const INVOICES: Invoice[] = [
    { id: 'INV-2026-0123', date: '12 April 2027', amount: '₦15,000', status: 'Paid' },
    { id: 'INV-2026-0123', date: '10 Sept 2026', amount: '₦15,000', status: 'Paid' },
    { id: 'INV-2026-0123', date: '12 Jan 2029', amount: '₦15,000', status: 'Paid' },
    { id: 'INV-2026-0123', date: '12 march 2026', amount: '₦15,000', status: 'Failed' },
    { id: 'INV-2026-0123', date: '12 April 2026', amount: '₦15,000', status: 'Paid' },
    { id: 'INV-2026-0123', date: '12 April 2026', amount: '₦1,200', status: 'Paid', },
    { id: 'INV-2026-0123', date: '01 April 2026', amount: '₦12,000', status: 'Paid',},
];