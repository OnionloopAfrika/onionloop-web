import Badge from "@/components/ui/badge";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FUNNEL_STAGES = [
  { stage: "Submitted", count: "19", share: "100%" },
  { stage: "Documents complete", count: "11", share: "27.6%" },
  { stage: "Address visit completed", count: "9", share: "72.4%" },
  { stage: "Approved", count: "2", share: "72.4%", approved: true },
  {
    stage: "Activated (first transaction ≤ 30 days)",
    count: "7",
    share: "72.4%",
  },
];

export default function OnboardingFunnelTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        ONBOARDING FUNNEL
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stage</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Share of submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FUNNEL_STAGES.map((row) => (
              <TableRow key={row.stage}>
                <TableCell>
                  {row.approved ? (
                    <Badge variant="approved">{row.stage}</Badge>
                  ) : (
                    row.stage
                  )}
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
