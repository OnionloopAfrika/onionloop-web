import AccountLedgerTable from "./account-ledger-table";
import AccountSettlementSummary from "./account-settlement-summary";
import WalletBalancesTable from "./wallet-balances-table";
import WithdrawalDestinationTable from "./withdrawal-destination-table";

export default function AccountSettlementPreview() {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
      <AccountSettlementSummary />
      <WalletBalancesTable />
      <AccountLedgerTable />
      <WithdrawalDestinationTable />
      <p className="border-t border-[#E5E7EB] p-[16px] text-[12px] leading-[1.6] text-[#6C6C6C]">
        <span className="font-[600] text-[14px] text-[#04907E]">
          Notes &amp; Insights:
        </span>

        <span className="ml-[4px] ">
          Credits are shown net of withholding tax. Disputed or reversed entries
          would appear as a separate line with a reference.
        </span>
      </p>
    </article>
  );
}
