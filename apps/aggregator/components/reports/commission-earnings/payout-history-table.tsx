import Badge from "@/components/ui/badge";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PAYOUT_ROWS = [
  {
    date: "15 Oct",
    reference: "PAY-88214",
    destination: "GTBank **4821",
    amount: "₦34,000",
  },
  {
    date: "28 Sep",
    reference: "PAY-88214",
    destination: "GTBank **4821",
    amount: "₦250,000",
  },
];

export default function PayoutHistoryTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        PAYOUT HISTORY
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PAYOUT_ROWS.map((row) => (
              <TableRow key={`${row.date}-${row.amount}`}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.reference}</TableCell>
                <TableCell>{row.destination}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  <Badge variant="completed">Paid</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
