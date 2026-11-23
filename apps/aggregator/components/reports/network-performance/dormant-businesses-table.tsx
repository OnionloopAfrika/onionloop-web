import Badge from "@/components/ui/badge";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const INACTIVE_BUSINESSES = [
  { type: "Agent", status: "Dormant", lastTransaction: "41 days ago" },
  {
    type: "Merchant · OnionCrew",
    status: "Dormant",
    lastTransaction: "36 days ago",
  },
  {
    type: "Agent",
    status: "Voluntary Exit",
    lastTransaction: "58 days ago",
  },
  {
    type: "Merchant · OnionSolo",
    status: "Voluntary Exit",
    lastTransaction: "73 days ago",
  },
];

export default function DormantBusinessesTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        DORMANT &amp; EXITED BUSINESSES
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
            {INACTIVE_BUSINESSES.map((row, index) => (
              <TableRow key={`${row.type}-${row.status}-${index}`}>
                <TableCell>Constitution Rd Bakery</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.status === "Dormant" ? "in_progress" : "failed"
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>₦0</TableCell>
                <TableCell>{row.lastTransaction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
