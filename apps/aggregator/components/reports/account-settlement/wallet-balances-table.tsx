import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WALLET_BALANCES = [
  { wallet: "Main balance", share: "100%", balance: "₦298,500" },
  { wallet: "Revenue balance", share: "27.6%", balance: "₦114,000" },
  { wallet: "Bonus balance", share: "72.4%", balance: "₦412,500" },
];

export default function WalletBalancesTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        WALLET BALANCES
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Wallet</TableHead>
              <TableHead>Share of Main</TableHead>
              <TableHead>Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {WALLET_BALANCES.map((row) => (
              <TableRow key={row.wallet}>
                <TableCell>{row.wallet}</TableCell>
                <TableCell>{row.share}</TableCell>
                <TableCell>{row.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
