import Badge from "@/components/ui/badge";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BONUS_ROWS = [
  {
    bonus: "Volume bonus",
    condition: "Reach 100% of volume target",
    reward: "₦75,000",
    status: "In reach",
    variant: "selected" as const,
  },
  {
    bonus: "Onboarding bonus",
    condition: "Onboard 30 businesses",
    reward: "₦50,000",
    status: "In reach",
    variant: "selected" as const,
  },
  {
    bonus: "Retention bonus",
    condition: "Dormant rate below 20%",
    reward: "₦20,000",
    status: "Not met",
    variant: "failed" as const,
  },
];

export default function BonusEligibilityTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[10px] font-[700] text-[#04907E]">
        BONUS ELIGIBILITY
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bonus</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Reward</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BONUS_ROWS.map((row) => (
              <TableRow key={row.bonus}>
                <TableCell>{row.bonus}</TableCell>
                <TableCell>{row.condition}</TableCell>
                <TableCell>{row.reward}</TableCell>
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
