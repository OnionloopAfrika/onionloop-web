import Badge from "@/components/ui/badge";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TOP_PERFORMANCE_ROWS = [
  { type: "Agent", volume: "₦640,000", lastTransaction: "Today" },
  {
    type: "Merchant · OnionCrew",
    volume: "₦284,000",
    lastTransaction: "Today",
  },
  { type: "Agent", volume: "₦284,000", lastTransaction: "Yesterday" },
  {
    type: "Merchant · OnionCrew",
    volume: "₦284,000",
    lastTransaction: "Today",
  },
  {
    type: "Merchant · OnionSolo",
    volume: "₦284,000",
    lastTransaction: "2 days ago",
  },
];

export default function TopPerformanceTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        TOP PERFORMANCE BY VOLUME
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>30-day volume</TableHead>
              <TableHead>Last transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TOP_PERFORMANCE_ROWS.map((row, index) => (
              <TableRow key={`${row.type}-${index}`}>
                <TableCell>Constitution Rd Bakery</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <Badge variant="completed">Complete</Badge>
                </TableCell>
                <TableCell>{row.volume}</TableCell>
                <TableCell>{row.lastTransaction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
