import { CalendarIcon, DownloadIconSolid } from "../icons/svgs";
import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";
import {
  NavTabsList,
  NavTabsTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { BranchTransactionGrid } from "./branch-transaction-grid";
import Sales from "./sales";
import { StaffSalesPerformance } from "./staff-sales-performance";
import { TransactionTable } from "./transaction-table";

export function BranchTransactionsPage() {
  return (
    <div className="space-y-[24px]">
      <ProfileHeader
        className="flex-col md:flex-row gap-4 justify-between items-start mb-6 border-b-0 pb-[0px]"
        title="Transactions"
        subtitle="View and manage all sales and payment records"
        btn={
          <div className="flex items-center gap-[10px]">
            <Button variant="outline" size="cashierOutline">
              <CalendarIcon /> Mar 2026
            </Button>
            <Button variant="primary" size="cashierOutline">
              <DownloadIconSolid />
              Download Report
            </Button>
          </div>
        }
      />

      <BranchTransactionGrid />

      <Tabs defaultValue="sales">
        <div className="rounded-[16px] p-[16px] flex justify-start items-center bg-white mb-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          <NavTabsList>
            <NavTabsTrigger value="sales">Sales</NavTabsTrigger>
            <NavTabsTrigger value="transactions">Transactions</NavTabsTrigger>
          </NavTabsList>
        </div>

        <TabsContent value="sales">
          <div className="space-y-[24px]">
            <StaffSalesPerformance />
            <Sales />
          </div>
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
