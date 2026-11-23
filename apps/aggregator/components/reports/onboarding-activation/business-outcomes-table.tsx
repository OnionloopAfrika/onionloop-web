import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BUSINESS_OUTCOMES = [
  {
    type: "Agent",
    accounts: "8",
    approved: "5",
    pending: "2",
    rejected: "1",
    activated: "4",
  },
  {
    type: "Merchant",
    accounts: "11",
    approved: "6",
    pending: "4",
    rejected: "1",
    activated: "5",
  },
];

export default function BusinessOutcomesTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        OUTCOME BY BUSINESS TYPE
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Accounts</TableHead>
              <TableHead>Approved</TableHead>
              <TableHead>Pending</TableHead>
              <TableHead>Rejected</TableHead>
              <TableHead>Activated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BUSINESS_OUTCOMES.map((row) => (
              <TableRow key={row.type}>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.accounts}</TableCell>
                <TableCell>{row.approved}</TableCell>
                <TableCell>{row.pending}</TableCell>
                <TableCell>{row.rejected}</TableCell>
                <TableCell>{row.activated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
