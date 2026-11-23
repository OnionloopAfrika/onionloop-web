import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LEDGER_ENTRIES = [
  {
    date: "20 Oct",
    description: "Opening balance",
    type: "—",
    debit: "—",
    credit: "—",
    balance: "₦298,500",
  },
  {
    date: "20 Oct",
    description: "Withdrawal to GTBank **4821",
    type: "Withdrawal",
    debit: "₦298,500",
    credit: "—",
    balance: "₦298,500",
  },
  {
    date: "20 Oct",
    description: "Onboarding bonus (September)",
    type: "Bonus",
    debit: "—",
    credit: "₦298,500",
    balance: "₦298,500",
  },
  {
    date: "20 Oct",
    description: "Onboarding commission (net of WHT)",
    type: "Commission",
    debit: "—",
    credit: "₦298,500",
    balance: "₦298,500",
  },
  {
    date: "20 Oct",
    description: "Onboarding commission (net of WHT)",
    type: "Withdrawal",
    debit: "₦114,000",
    credit: "—",
    balance: "₦114,000",
  },
  {
    date: "20 Oct",
    description: "Withdrawal to GTBank **4821",
    type: "Commission",
    debit: "—",
    credit: "₦412,500",
    balance: "₦412,500",
  },
];

export default function AccountLedgerTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        ACCOUNT LEDGER
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visit date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Debit</TableHead>
              <TableHead>Credit</TableHead>
              <TableHead>Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LEDGER_ENTRIES.map((entry, index) => (
              <TableRow key={`${entry.description}-${index}`}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell>{entry.type}</TableCell>
                <TableCell>{entry.debit}</TableCell>
                <TableCell>{entry.credit}</TableCell>
                <TableCell>{entry.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
