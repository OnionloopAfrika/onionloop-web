import Badge from "@/components/ui/badge";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VISITS = [
  { status: "Scheduled", outcome: "—", variant: "system" as const },
  {
    status: "Pending",
    outcome: "Occupant not present — revisit set",
    variant: "in_progress" as const,
  },
  {
    status: "Complete",
    outcome: "Verified — GPS and photo matched",
    variant: "completed" as const,
  },
  {
    status: "Complete",
    outcome: "Verified — GPS and photo matched",
    variant: "completed" as const,
  },
  {
    status: "Failed",
    outcome: "GPS mismatch — 410m from submitted address",
    variant: "failed" as const,
  },
  {
    status: "Complete",
    outcome: "Verified — GPS and photo matched",
    variant: "completed" as const,
  },
];

export default function AddressVisitTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        ADDRESS VISIT LOG
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Visit date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {VISITS.map((visit, index) => (
              <TableRow key={`${visit.status}-${index}`}>
                <TableCell>Constitution Rd Bakery</TableCell>
                <TableCell>8 Kano Rd, Lagos</TableCell>
                <TableCell>20 Oct</TableCell>
                <TableCell>
                  <Badge variant={visit.variant}>{visit.status}</Badge>
                </TableCell>
                <TableCell>{visit.outcome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
