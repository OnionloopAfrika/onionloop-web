import { ConfirmOrder } from "@/components/cashier/confirm-order";
import ProductDetailsPage from "@/components/cashier/product-details-page";

export default function page() {
  return (
    <div className="w-full grid grid-cols-[2fr_1fr] gap-[40px]">
      <ProductDetailsPage params={{ id: "1" }} />

      <ConfirmOrder />
    </div>
  );
}
