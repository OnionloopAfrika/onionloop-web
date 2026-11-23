import Badge from "@/components/ui/badge";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const COMMISSION_STAGES = [
  {
    stage: "Transaction commission",
    values: ["₦284,000", "₦284,000", "₦284,000"],
    status: "Complete",
    variant: "completed" as const,
  },
  {
    stage: "Onboarding commission",
    values: ["₦284,000", "₦284,000", "₦284,000"],
    status: "Pending",
    variant: "pending" as const,
  },
  {
    stage: "Address visit completed",
    values: ["₦284,000", "₦284,000", "₦284,000"],
    status: null,
    variant: null,
  },
  {
    stage: "Bonuses (targets met)",
    values: ["₦284,000", "—", "₦284,000"],
    status: "Complete",
    variant: "completed" as const,
  },
];

export default function CommissionSummaryTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        COMMISSION SUMMARY
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stage</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {COMMISSION_STAGES.map((row) => (
              <TableRow key={row.stage}>
                <TableCell>{row.stage}</TableCell>
                {row.values.map((value, index) => (
                  <TableCell key={`${row.stage}-${index}`}>{value}</TableCell>
                ))}
                <TableCell>
                  {row.status && row.variant ? (
                    <Badge variant={row.variant}>{row.status}</Badge>
                  ) : (
                    "—"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
