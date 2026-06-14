type OrderTypes = {
  item: string;
  value: string;
};

type TotalType = {
  total: string;
  amount: string;
  className?: string;
};

export function OrderSummary({ item, value }: OrderTypes) {
  return (
    <div className="w-full flex justify-between items-center">
      <p className="font-[400] text-[16px] text-[#686764]">{item}</p>
      <p className="font-[400] text-[16px] text-[#6C6C6C]">{value}</p>
    </div>
  );
}

export function TotalAmount({ total, amount, className = "" }: TotalType) {
  return (
    <div className="w-full flex justify-between items-center">
      <p className={`font-[500] text-[16px] text-[#131313] ${className}  `}>
        {total}
      </p>
      <p className="font-[600] text-[18px] text-[#131313]">{amount}</p>
    </div>
  );
}
