import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BUSINESS_TYPE_ROWS = [
  {
    type: "Merchant",
    owners: "82",
    active: "64",
    volume: "₦11,400,000",
    transactions: "9,840",
    average: "₦178,125",
  },
  {
    type: "Agent",
    owners: "66",
    active: "48",
    volume: "₦7,200,000",
    transactions: "6,120",
    average: "₦150,000",
  },
];

export default function BusinessTypeTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        PERFORMANCE BY BUSINESS TYPE
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Owners</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Transactions</TableHead>
              <TableHead>Avg volume per active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BUSINESS_TYPE_ROWS.map((row) => (
              <TableRow key={row.type}>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.owners}</TableCell>
                <TableCell>{row.active}</TableCell>
                <TableCell>{row.volume}</TableCell>
                <TableCell>{row.transactions}</TableCell>
                <TableCell>{row.average}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
