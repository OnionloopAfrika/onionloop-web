import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const QUEUE = [
  {
    type: "Merchant",
    submitted: "Visit scheduled",
    waiting: "Waiting on aggregator",
  },
  {
    type: "Agent",
    submitted: "Visit in progress",
    waiting: "Waiting on aggregator",
  },
  {
    type: "Merchant",
    submitted: "Not yet assigned",
    waiting: "Waiting on aggregator",
  },
  {
    type: "Agent",
    submitted: "Documents incomplete",
    waiting: "Waiting on business",
  },
  {
    type: "Merchant",
    submitted: "Visit completed",
    waiting: "Waiting on Onionloop Ops",
  },
  {
    type: "Agent",
    submitted: "Visit completed",
    waiting: "Waiting on Onionloop Ops",
  },
];

export default function VerificationQueueTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        VERIFICATION QUEUE
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Waiting on</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {QUEUE.map((row, index) => (
              <TableRow key={`${row.type}-${index}`}>
                <TableCell>Constitution Rd Bakery</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.submitted}</TableCell>
                <TableCell>8 Kano Rd, Lagos</TableCell>
                <TableCell>{row.waiting}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
