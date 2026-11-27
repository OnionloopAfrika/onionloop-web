import React from "react";
import Header from "../layouts/header";
import Card from "../card";
import { NavTabsList, NavTabsTrigger, Tabs, TabsContent } from "../ui/tabs";
import { OrdersTable } from "./orders-table";
import OrderDetails from "../cashier/order-details";

export const OrdersPage = () => {
  return (
    <div className="space-y-[24px]">
      <Header
        heading="Orders"
        subHeading="Every order taken by your staff. Click any row for full details."
      />

      <div className="space-y-[16px]">
        <Tabs defaultValue="All">
          <Card className="p-[16px] rounded-[16px] flex items-center justify-start">
            <NavTabsList>
              <NavTabsTrigger value="All">All</NavTabsTrigger>
              <NavTabsTrigger value="Successful">Successful</NavTabsTrigger>
              <NavTabsTrigger value="Pending">Pending</NavTabsTrigger>
              <NavTabsTrigger value="Failed">Failed</NavTabsTrigger>
            </NavTabsList>
          </Card>

          <TabsContent value="All">
            <OrdersTable />
          </TabsContent>

          <TabsContent value="Successful">
            <OrdersTable />
          </TabsContent>

          <TabsContent value="Pending">
            <OrdersTable />
          </TabsContent>

          <TabsContent value="Failed">
            <OrdersTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
