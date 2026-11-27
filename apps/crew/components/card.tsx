type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Card({ className = "", children }: CardProps) {
  return (
    <div className={`bg-white rounded-[12px] shadow-sm p-[24px] ${className}`}>
      {children}
    </div>
  );
}
