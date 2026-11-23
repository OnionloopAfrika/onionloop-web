import Badge from "@/components/ui/badge";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ACTIVITY_ROWS = [
  {
    status: "Active",
    count: "112",
    share: "75.7%",
    variant: "active" as const,
  },
  {
    status: "Dormant",
    count: "26",
    share: "17.6%",
    variant: "in_progress" as const,
  },
  {
    status: "Voluntary Exit",
    count: "10",
    share: "6.8%",
    variant: "failed" as const,
  },
];

export default function ActivityStatusTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        ACTIVITY STATUS
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Share of network</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ACTIVITY_ROWS.map((row) => (
              <TableRow key={row.status}>
                <TableCell>
                  <Badge variant={row.variant}>{row.status}</Badge>
                </TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{row.share}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
