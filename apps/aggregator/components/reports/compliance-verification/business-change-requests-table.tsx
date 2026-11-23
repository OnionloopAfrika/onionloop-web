import Badge from "@/components/ui/badge";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CHANGE_REQUESTS = [
  {
    type: "Merchant",
    status: "Requested",
    reason: "Wants to also accept merchant payments",
    variant: "selected" as const,
  },
  {
    type: "Agent",
    status: "Requested",
    reason: "Shifting to merchant-only operations",
    variant: "selected" as const,
  },
  {
    type: "Merchant",
    status: "Approved",
    reason: "Added cash-in/cash-out service",
    variant: "approved" as const,
  },
  {
    type: "Agent",
    status: "Approved",
    reason: "Owner relocated to Abuja",
    variant: "approved" as const,
  },
  {
    type: "Merchant",
    status: "Approved",
    reason: "Wants to also accept merchant payments",
    variant: "approved" as const,
  },
  {
    type: "Agent",
    status: "Rejected",
    reason: "Open dispute on account",
    variant: "failed" as const,
  },
];

export default function BusinessChangeRequestsTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        BUSINESS CHANGE REQUEST
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason / note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CHANGE_REQUESTS.map((row, index) => (
              <TableRow key={`${row.type}-${index}`}>
                <TableCell>Constitution Rd Bakery</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>20 Oct</TableCell>
                <TableCell>
                  <Badge variant={row.variant}>{row.status}</Badge>
                </TableCell>
                <TableCell>{row.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
