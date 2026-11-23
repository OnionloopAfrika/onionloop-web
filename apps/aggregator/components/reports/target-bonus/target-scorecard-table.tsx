import Badge from "@/components/ui/badge";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SCORECARD_ROWS = [
  {
    measure: "Transaction volume",
    goal: "₦25,000,000",
    achieved: "₦18,600,000",
    progress: "74.4%",
    status: "On track",
    variant: "on_track" as const,
  },
  {
    measure: "Onboarding (approved businesses)",
    goal: "30",
    achieved: "17",
    progress: "56.7%",
    status: "Behind",
    variant: "target_inactive" as const,
  },
  {
    measure: "Dormant rate",
    goal: "Below 20%",
    achieved: "24.3%",
    progress: "—",
    status: "Not met",
    variant: "failed" as const,
  },
  {
    measure: "Active businesses",
    goal: "120",
    achieved: "112",
    progress: "93.3%",
    status: "On track",
    variant: "on_track" as const,
  },
];

export default function TargetScorecardTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[10px] font-[700] text-[#04907E]">
        TARGET SCORECARD
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Achieved</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SCORECARD_ROWS.map((row) => (
              <TableRow key={row.measure}>
                <TableCell>{row.measure}</TableCell>
                <TableCell>{row.goal}</TableCell>
                <TableCell>{row.achieved}</TableCell>
                <TableCell>{row.progress}</TableCell>
                <TableCell>
                  <Badge variant={row.variant}>{row.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
