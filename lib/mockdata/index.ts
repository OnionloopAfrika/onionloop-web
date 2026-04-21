import { Transaction } from "@/types/transactions/types";

export const MOCK_TRANSACTIONS: Transaction[] = [
    // January 2026
    { id: 'TXN-7802', customerName: 'Emeka Eze', amount: 15000, processedBy: 'Titi Folarin', status: 'completed', date: '2026-01-05T10:20:00Z' },
    { id: 'TXN-7803', customerName: 'Adaeze Nwosu', amount: 32000, processedBy: 'Mary Olarenwaju', status: 'completed', date: '2026-01-08T14:15:00Z' },
    { id: 'TXN-7804', customerName: 'Femi Adeyemi', amount: -5500, processedBy: 'David Anigbogu', status: 'refunded', date: '2026-01-12T09:30:00Z' },
    { id: 'TXN-7805', customerName: 'Nkechi Uba', amount: 18700, processedBy: 'Samuel Saidu', status: 'completed', date: '2026-01-18T16:45:00Z' },
    { id: 'TXN-7806', customerName: 'Chidinma Obi', amount: 9200, processedBy: 'Titi Folarin', status: 'pending', date: '2026-01-22T11:10:00Z' },
    { id: 'TXN-7807', customerName: 'Gbenga Olanrewaju', amount: 41000, processedBy: 'Kemi Saidu', status: 'completed', date: '2026-01-25T13:25:00Z' },
    { id: 'TXN-7808', customerName: 'Emeka Eze', amount: 7800, processedBy: 'Adanma Dappa', status: 'failed', date: '2026-01-29T15:50:00Z' },

    // February 2026
    { id: 'TXN-7809', customerName: 'Adaeze Nwosu', amount: 22500, processedBy: 'Titi Folarin', status: 'completed', date: '2026-02-03T08:40:00Z' },
    { id: 'TXN-7810', customerName: 'Chidinma Obi', amount: -4100, processedBy: 'Mary Olarenwaju', status: 'refunded', date: '2026-02-07T17:20:00Z' },
    { id: 'TXN-7811', customerName: 'Femi Adeyemi', amount: 35800, processedBy: 'David Anigbogu', status: 'completed', date: '2026-02-11T10:55:00Z' },
    { id: 'TXN-7812', customerName: 'Nkechi Uba', amount: 45000, processedBy: 'Titi Folarin', status: 'completed', date: '2026-02-14T12:30:00Z' },
    { id: 'TXN-7813', customerName: 'Emeka Eze', amount: 7600, processedBy: 'Titi Folarin', status: 'pending', date: '2026-02-19T14:05:00Z' },
    { id: 'TXN-7814', customerName: 'Gbenga Olanrewaju', amount: 22100, processedBy: 'Samuel Saidu', status: 'completed', date: '2026-02-23T16:15:00Z' },
    { id: 'TXN-7815', customerName: 'Adaeze Nwosu', amount: -3800, processedBy: 'Kemi Saidu', status: 'failed', date: '2026-02-27T09:45:00Z' },

    // March 2026
    { id: 'TXN-7816', customerName: 'Nkechi Uba', amount: 15000, processedBy: 'Adanma Dappa', status: 'completed', date: '2026-03-05T11:20:00Z' },
    { id: 'TXN-7817', customerName: 'Femi Adeyemi', amount: 28400, processedBy: 'Samuel Saidu', status: 'pending', date: '2026-03-12T13:35:00Z' },
    { id: 'TXN-7818', customerName: 'Chidinma Obi', amount: -3200, processedBy: 'David Anigbogu', status: 'refunded', date: '2026-03-18T15:00:00Z' },
    { id: 'TXN-7819', customerName: 'Emeka Eze', amount: 6500, processedBy: 'Mary Olarenwaju', status: 'completed', date: '2026-03-23T10:12:00Z' },
    { id: 'TXN-7820', customerName: 'Emeka Eze', amount: 12800, processedBy: 'Titi Folarin', status: 'completed', date: '2026-03-24T08:30:00Z' },
    { id: 'TXN-7821', customerName: 'Adaeze Nwosu', amount: 45000, processedBy: 'Titi Folarin', status: 'refunded', date: '2026-03-24T09:12:00Z' },
];