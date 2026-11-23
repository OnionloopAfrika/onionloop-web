import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WithdrawalDestinationTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        WITHDRAWAL DESTINATION
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bank</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Withdrawals</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Constitution Rd Bakery</TableCell>
              <TableCell>**4821</TableCell>
              <TableCell>2</TableCell>
              <TableCell>₦284,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
