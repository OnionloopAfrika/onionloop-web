"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "save"
    | "msg"
    | "signout"
    | "scan"
    | "cashierOutline"
    | "cashierSolid";
  size?:
    | "sm"
    | "md"
    | "lg"
    | "save"
    | "msg"
    | "newOrder"
    | "scan"
    | "cashierOutline";
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  icon,
  size = "sm",
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "cursor-pointer inline-flex items-center justify-center   transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-primary-color rounded-[8px] text-white font-semibold text-[16px] gap-[10px] ",
    save: "bg-primary-color rounded-[8px] text-white font-semibold text-[16px] gap-[10px] ",
    secondary:
      "bg-[#F7F7F7] rounded-[8px] text-[#6C6C6C] font-semibold text-[14px] gap-[10px] ",
    outline:
      "bg-transparent rounded-[8px] border border-[#C7C7C7] gap-[10px]  font-[500] text-[16px] text-[#131313]",
    ghost: "text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500",
    danger:
      "bg-danger rounded-[8px] text-[#FFFFFF] font-semibold text-[14px] gap-[10px] ",
    msg: "bg-light rounded-[8px] text-[#FFFFFF] font-semibold text-[14px] gap-[10px] ",
    signout:
      "bg-transparent rounded-[8px] text-danger font-[500] text-[16px] gap-[10px] border border-[#C7C7C7]",
    scan: "bg-[#04802E] rounded-[8px] font-[500] text-[18px] text-white flex items-center gap-[10px]",
    cashierOutline:
      "bg-white border border-primary-color rounded-[6px] font-[600] text-[14px] text-primary-color",
    cashierSolid:
      "bg-primary-color rounded-[6px] font-[600] text-[14px] text-white",
  };

  const sizes = {
    msg: "py-[16px] px-[24px] w-fit min-w-[151px]",
    save: "py-[16px] px-[24px] w-fit min-w-[240px]",
    sm: "p-[16px]  w-full ",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3.5 text-lg",
    newOrder: "px-6 py-3.5 text-[14px] md:min-w-[428px]",
    scan: "px-[10px] h-[52px] w-fit",
    cashierOutline: " py-[16px] px-[24px] h-[48px]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}

      {children}
    </button>
  );
};

export default Button;
