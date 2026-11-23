import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TRANSACTION_ROWS = [
  { type: "Merchant", volume: "₦640,000" },
  { type: "Merchant", volume: "₦284,000" },
  { type: "Agent", volume: "₦284,000" },
  { type: "Merchant", volume: "₦284,000" },
  { type: "Merchant", volume: "₦284,000" },
  { type: "Agent", volume: "₦284,000" },
  { type: "Agent", volume: "₦284,000" },
  { type: "Agent", volume: "₦284,000" },
];

export default function TransactionCommissionTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        TRANSACTION COMMISSION DETAILS
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Commission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TRANSACTION_ROWS.map((row, index) => (
              <TableRow key={`${row.type}-${index}`}>
                <TableCell>Constitution Rd Bakery</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.volume}</TableCell>
                <TableCell>0.3%</TableCell>
                <TableCell>₦1,920</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
