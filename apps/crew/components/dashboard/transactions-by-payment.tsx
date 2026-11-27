import PaymentMethodChart, {
  type PaymentMethodData,
} from "@/components/ui/charts/payment-method-chart";

const PERIOD_OPTIONS = [{ value: "week", label: "This week" }];

const PAYMENT_DATA: PaymentMethodData[] = [
  {
    name: "QR Payment",
    value: 1200,
    color: "#078D7A",
    backgroundColor: "#DCEFEB",
  },
  {
    name: "Bank Transfer",
    value: 770,
    color: "#1262BD",
    backgroundColor: "#E2ECF8",
  },
  {
    name: "Cash",
    value: 30,
    color: "#E28B00",
    backgroundColor: "#FBF2E2",
  },
];

export default function TransactionsByPayment() {
  return (
    <PaymentMethodChart
      title="Transactions By Payment Method"
      data={PAYMENT_DATA}
      periodOptions={PERIOD_OPTIONS}
      defaultPeriod="week"
    />
  );
}
