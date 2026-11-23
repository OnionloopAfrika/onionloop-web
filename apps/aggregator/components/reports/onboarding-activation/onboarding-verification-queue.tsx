import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VERIFICATION_QUEUE = [
  {
    type: "Merchant · OnionSolo",
    stage: "Address visit not yet assigned",
    waitingOn: "Aggregator",
  },
  {
    type: "Merchant · OnionCrew",
    stage: "CAC document incomplete",
    waitingOn: "Business Owner",
  },
  {
    type: "Agent",
    stage: "Visit done — in Ops review",
    waitingOn: "Onionloop Ops",
  },
  {
    type: "Merchant · OnionSolo",
    stage: "Visit done — in Ops review",
    waitingOn: "Onionloop Ops",
  },
  {
    type: "Merchant · OnionSolo",
    stage: "Visit scheduled 20 Oct",
    waitingOn: "Aggregator",
  },
  {
    type: "Agent",
    stage: "Visit in progress",
    waitingOn: "Aggregator",
  },
];

export default function OnboardingVerificationQueue() {
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
              <TableHead>Visit date</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Waiting on</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {VERIFICATION_QUEUE.map((row, index) => (
              <TableRow key={`${row.type}-${index}`}>
                <TableCell>Constitution Rd Bakery</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>20 Oct</TableCell>
                <TableCell>{row.stage}</TableCell>
                <TableCell>{row.waitingOn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
