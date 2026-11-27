type HeaderProps = {
  title: string;
  subtitle?: string;
};

export const CardHeader = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="space-y-[4px] ">
      <p className="font-[600] text-[16px] text-[#131313]">{title}</p>
      <p className="font-[500] text-[12px] text-[#6C6C6C]">{subtitle}</p>
    </div>
  );
};
