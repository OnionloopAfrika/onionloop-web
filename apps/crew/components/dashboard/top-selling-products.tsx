import TopSellingProductsChart, {
  type TopSellingProduct,
} from "@/components/ui/charts/top-selling-products-chart";

const products: TopSellingProduct[] = [
  {
    id: "coca-cola",
    name: "Cocacola",
    image: "/images/coke.svg",
    unitsSold: 400,
    revenue: "₦12.4M",
  },
  {
    id: "chicken-pizza",
    name: "Chicken Pizza",
    image: "/images/pizza.svg",
    unitsSold: 390,
    revenue: "₦12.4M",
  },
  {
    id: "ice-cream",
    name: "Ice cream",
    image: "/images/ice-cream.svg",
    unitsSold: 300,
    revenue: "₦12.4M",
  },
  {
    id: "burger",
    name: "Burger",
    fallback: "🍔",
    unitsSold: 291,
    revenue: "₦12.4M",
  },
  {
    id: "pepsi",
    name: "Pepsi",
    image: "/images/pepsi.svg",
    unitsSold: 289,
    revenue: "₦12.4M",
  },
];

const periodOptions = [{ value: "this-week", label: "This week" }];

export default function TopSellingProducts() {
  return (
    <TopSellingProductsChart
      title="Top Selling Products"
      products={products}
      periodOptions={periodOptions}
      defaultPeriod="this-week"
    />
  );
}
