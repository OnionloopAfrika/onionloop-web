import { CopyDetailsIcon, OnionIcon } from "../icons/svgs";

export function AccountNumber() {
  return (
    <div className="w-full space-y-[16px] bg-white rounded-[8px] shadow-[0_0_15px_rgba(0,0,0,0.15)] p-[24px]">
      <div className="flex flex-col gap-[4px] items-center">
        <p className="font-[400] text-[14px] text-[#6C6C6C]">Amount to Pay</p>
        <p className="font-[500] text-[24px] text-[#363636]">₦12,362.50</p>
      </div>

      <div className="space-y-[24px]">
        <div className="flex items-center gap-[8px]">
          <OnionIcon className="w-[40px] h-[40px]" />{" "}
          <p className="font-[500] text-[12px] text-[#131313]">
            Onionloopafrika
          </p>
        </div>

        <div className="space-y-[12px]">
          <AccountDetails title="Account Name:" value="KFC Holdings" />
          <AccountDetails title="Business Name:" value="KFC" />
          <AccountDetails
            title="Account Number:"
            value={
              <div className="flex items-center gap-[8px]">
                <p>0199972635</p> <CopyDetailsIcon />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

type AccountDetails = {
  title: string;
  value: React.ReactNode;
  className?: string;
};

const AccountDetails = ({ title, value, className = "" }: AccountDetails) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-[400] text-[16px] text-[#6C6C6C]">{title}</p>
      <p className={`font-[500] text-[16px] text-[#363636]`}>{value}</p>
    </div>
  );
};
