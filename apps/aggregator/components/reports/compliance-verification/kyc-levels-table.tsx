import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const KYC_LEVELS = [
  { level: "Tier 3", owners: "47", share: "31.8%", limit: "Highest" },
  { level: "Tier 2", owners: "79", share: "53.4%", limit: "Standard" },
  {
    level: "Tier 1",
    owners: "22",
    share: "14.9%",
    limit: "Lowest — upgrade candidates",
  },
];

export default function KycLevelsTable({
  heading = "KYC LEVELS ACROSS YOUR NETWORK",
}: {
  heading?: string;
}) {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        {heading}
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>KYC level</TableHead>
              <TableHead>Owners</TableHead>
              <TableHead>Share</TableHead>
              <TableHead>Transaction limit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {KYC_LEVELS.map((row) => (
              <TableRow key={row.level}>
                <TableCell>{row.level}</TableCell>
                <TableCell>{row.owners}</TableCell>
                <TableCell>{row.share}</TableCell>
                <TableCell>{row.limit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
