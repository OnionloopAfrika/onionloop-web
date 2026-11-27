import type { HTMLAttributes } from "react";

export type BadgeVariant =
  | "active"
  | "pending"
  | "suspended"
  | "failed"
  | "dormant"
  | "tier"
  | "open"
  | "in_review"
  | "escalated"
  | "resolved"
  | "flagged"
  | "discrepancy"
  | "float_request"
  | "under_review"
  | "ready"
  | "system"
  | "selected"
  | "days"
  | "percentage"
  | "on_track"
  | "behind_track"
  | "transaction"
  | "successful"
  | "refunded"
  | "balance"
  | "imbalance"
  | "onboarding"
  | "completed"
  | "merchant"
  | "agent"
  | "target_active"
  | "target_inactive"
  | "ticket_resolved"
  | "ticket_pending"
  | "unverified"
  | "in_progress"
  | "approved"
  | "transfer_in_review"
  | "transfer_rejected"
  | "transfer_approved"
  | "transfer_pending";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: "bg-[#E7F6EC] px-[12px] font-[500] text-[14px] text-[#04802E]",
  system: "bg-[#E3EFFC] px-[12px] font-[500] text-[14px] text-[#0D5EBA]",
  selected: "bg-[#E3EFFC] px-[12px] font-[500] text-[14px] text-[#0D5EBA]",
  dormant: "bg-[#EBEBEB] px-[12px] font-[500] text-[14px] text-[#04802E]",
  suspended: "bg-[#FBEAE9] px-[12px] font-[500] text-[14px] text-[#CB1A14]",
  tier: "bg-[#B5E3C4] px-[10px] font-[500] text-[14px] text-[#024E44]",
  pending: "bg-[#FBE2B7] px-[10px] font-[500] text-[14px] text-[#DD900D]",
  open: "bg-[#FEF6E7] px-[12px] font-[500] text-[14px] text-[#DD900D]",
  in_review: "bg-[#FEF6E7] px-[12px] font-[500] text-[14px] text-[#DD900D]",
  escalated: "bg-[#FBEAE9] px-[12px] font-[500] text-[14px] text-[#CB1A14]",
  resolved: "bg-[#E7F6EC] px-[12px] font-[500] text-[14px] text-[#04802E]",
  flagged: "bg-[#FBEAE9] px-[12px] font-[500] text-[14px] text-[#CB1A14]",
  discrepancy: "bg-[#FBEAE9] px-[12px] font-[500] text-[14px] text-[#CB1A14]",
  float_request: "bg-[#FEF6E7] px-[12px] font-[500] text-[14px] text-[#DD900D]",
  under_review: "bg-[#FEF6E7] px-[12px] font-[500] text-[14px] text-[#DD900D]",
  ready: "bg-[#E7F6EC] px-[12px] font-[500] text-[14px] text-[#04802E]",
  failed: "bg-[#FBEAE9] px-[12px] font-[500] text-[14px] text-[#CB1A14]",
  days: "bg-[#B5E3C4] px-[8px] font-[500] text-[11.24px] text-[#04907E]",
  percentage:
    "bg-[#B5E3C4] px-[10px] font-[500] text-[12px] text-[#04802E] flex justify-center items-center gap-[2px]",
  on_track: "bg-[#E7F6EC] px-[10px] font-[500] text-[14px] text-[#04802E]",
  behind_track:
    "bg-[#FBEAE9] px-[8px] font-[500] text-[14px] text-[#CB1A14] whitespace no-wrap",
  transaction:
    "bg-[#B5E3C4] px-[8px] font-[500] text-[14px] text-[#024E44] whitespace no-wrap",
  successful:
    "bg-[#E7F6EC] px-[10px] font-[500] text-[14px] text-[#04802E] whitespace no-wrap",
  refunded:
    "bg-[#E3EFFC] px-[10px] font-[500] text-[14px] text-[#0D5EBA] whitespace no-wrap",
  balance: "bg-[#E7F6EC] px-[10px] font-[500] text-[14px] text-[#04802E]",
  imbalance: "bg-[#FBEAE9] px-[10px] font-[500] text-[14px] text-[#CB1A14]",
  onboarding:
    "bg-[#C6DDF7] px-[8px] font-[500] text-[14px] text-[#0D5EBA] whitespace no-wrap",
  completed:
    "bg-[#E7F6EC] px-[10px] font-[500] text-[14px] text-[#04802E] whitespace no-wrap",

  merchant:
    "bg-[#F5FFFD] !rounded-[2px] px-[12px] font-[500] text-[14px] text-[#04907E] whitespace no-wrap",

  agent:
    "bg-[#F5FFFD] !rounded-[2px] px-[12px] font-[500] text-[14px] text-[#04907E] whitespace no-wrap",

  target_active: "bg-[#E7F6EC] px-[10px] font-[500] text-[14px] text-[#04802E]",

  target_inactive:
    "bg-[#FFF2CC] px-[10px] font-[500] text-[14px] text-[#DD900D] border border-amber-100",

  ticket_resolved:
    "bg-[#0F973D] px-[10px] font-[500] text-[14px] text-[#FFFFFF] ",

  ticket_pending:
    "bg-[#DD900D] px-[10px] font-[500] text-[14px] text-[#FFFFFF] ",

  unverified: "bg-[#FBEAE9] px-[12px] font-[500] text-[14px] text-[#CB1A14] ",

  in_progress: "bg-[#FEF6E7] px-[12px] font-[500] text-[14px] text-[#DD900D] ",

  approved: "bg-[#E7F6EC] px-[12px] font-[500] text-[14px] text-[#04802E] ",

  transfer_in_review:
    "bg-[#E3EFFC] px-[12px] font-[500] text-[14px] text-[#0D5EBA] ",

  transfer_rejected:
    "bg-[#FBEAE9] px-[12px] font-[500] text-[14px] text-[#CB1A14] ",

  transfer_approved:
    "bg-[#E7F6EC] px-[12px] font-[500] text-[14px] text-[#04802E] ",

  transfer_pending:
    "bg-[#FBE2B7] px-[12px] font-[500] text-[14px] text-[#DD900D] ",
};

export default function Badge({
  variant = "active",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex min-h-[30px] items-center rounded-full ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
