import React, { Suspense } from "react";
import TransactionDetails from "./transaction-details";

export default function page() {
  return (
    <Suspense fallback="Loading Transaction details">
      <TransactionDetails />
    </Suspense>
  );
}
