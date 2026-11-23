import Badge from "@/components/ui/badge";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ONBOARDING_ROWS = [
  { level: "Tier 3", status: "Pending", variant: "pending" as const },
  { level: "Tier 3", status: "Pending", variant: "pending" as const },
  { level: "Tier 2", status: "Paid", variant: "completed" as const },
  { level: "Tier 2", status: "Paid", variant: "completed" as const },
  { level: "Tier 1", status: "Paid", variant: "completed" as const },
  { level: "Tier 1", status: "Paid", variant: "completed" as const },
];

export default function OnboardingVerificationTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        ONBOARDING VERIFICATION QUEUE
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Visit date</TableHead>
              <TableHead>KYC level</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ONBOARDING_ROWS.map((row, index) => (
              <TableRow key={`${row.level}-${index}`}>
                <TableCell>Constitution Rd Bakery</TableCell>
                <TableCell>14 Oct 2026</TableCell>
                <TableCell>{row.level}</TableCell>
                <TableCell>₦1,920</TableCell>
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
