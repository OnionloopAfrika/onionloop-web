import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PROJECTION_ROWS = [
  {
    measure: "Transaction volume",
    pace: "₦23.5M",
    target: "₦25.0M",
    gap: "−₦1.5M",
  },
  {
    measure: "Onboarded businesses",
    pace: "24",
    target: "30",
    gap: "−6",
  },
  {
    measure: "Total expected earnings",
    pace: "₦780,000",
    target: "—",
    gap: "—",
  },
];

export default function TargetProjectionTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[10px] font-[700] text-[#04907E]">
        PAYOUT HISTORY
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Measure</TableHead>
              <TableHead>Current pace</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Gap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PROJECTION_ROWS.map((row) => (
              <TableRow key={row.measure}>
                <TableCell>{row.measure}</TableCell>
                <TableCell>{row.pace}</TableCell>
                <TableCell>{row.target}</TableCell>
                <TableCell>{row.gap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
