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
  active:
    "bg-[#E7F6EC] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#04802E]",
  system:
    "bg-[#E3EFFC] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#0D5EBA]",
  selected:
    "bg-[#E3EFFC] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#0D5EBA]",
  dormant:
    "bg-[#EBEBEB] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#04802E]",
  suspended:
    "bg-[#FBEAE9] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#CB1A14]",
  tier: "bg-[#B5E3C4] min-h-[24px] px-[10px] py-[6px] font-[500] text-[12px] text-[#024E44]",
  pending:
    "bg-[#FBE2B7] min-h-[30px] px-[8px] py-[4px] font-[500] text-[14px] text-[#DD900D]",
  open: "bg-[#FEF6E7] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#DD900D]",
  in_review:
    "bg-[#FEF6E7] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#DD900D]",
  escalated:
    "bg-[#FBEAE9] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#CB1A14]",
  resolved:
    "bg-[#E7F6EC] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#04802E]",
  flagged:
    "bg-[#FBEAE9] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#CB1A14]",
  discrepancy:
    "bg-[#FBEAE9] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#CB1A14]",
  float_request:
    "bg-[#FEF6E7] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#DD900D]",
  under_review:
    "bg-[#FEF6E7] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#DD900D]",
  ready:
    "bg-[#E7F6EC] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#04802E]",
  failed:
    "bg-[#FBEAE9] min-h-[30px] px-[12px] py-[4px] font-[500] text-[14px] text-[#CB1A14]",
  days: "bg-[#B5E3C4] h-[26.4px] px-[8px] font-[500] text-[11.2px] text-[#04907E]",
  percentage:
    "bg-[#B5E3C4] h-[24px] py-[8px] px-[4px] font-[500] text-[12px] text-[#04802E]",
  on_track:
    "bg-[#E7F6EC] h-[28px] py-[4px] px-[8px] font-[500] text-[12px] text-[#04802E]",
  behind_track:
    "bg-[#FBEAE9] h-[28px] py-[4px] px-[8px] font-[500] text-[12px] text-[#CB1A14] whitespace no-wrap",
  transaction:
    "bg-[#B5E3C4] min-h-[24px] py-[4px] px-[8px] font-[500] text-[12px] text-[#024E44] whitespace no-wrap",
  successful:
    "bg-[#E7F6EC] min-h-[27px] py-[2.5px] px-[10px] font-[500] text-[13.05px] text-[#04802E] whitespace no-wrap",
  onboarding:
    "bg-[#C6DDF7] min-h-[24px] py-[4px] px-[8px] font-[500] text-[12px] text-[#0D5EBA] whitespace no-wrap",
  completed:
    "bg-[#E7F6EC] min-h-[27px] py-[2.5px] px-[10px] font-[500] text-[13.05px] text-[#04802E] whitespace no-wrap",

  merchant:
    "bg-[#F5FFFD] min-h-[28px] py-[4px] !rounded-[2px] px-[12px] font-[500] text-[14px] text-[#04907E] whitespace no-wrap",

  agent:
    "bg-[#F5FFFD] min-h-[28px] py-[4px] !rounded-[2px] px-[12px] font-[500] text-[14px] text-[#04907E] whitespace no-wrap",

  target_active:
    "bg-[#E7F6EC] min-h-[27px] px-[10px] py-[2.5px] font-[500] text-[13.05px] text-[#04802E]",

  target_inactive:
    "bg-[#FFF2CC] min-h-[27px] px-[10px] py-[2.5px] font-[500] text-[13.05px] text-[#DD900D] border border-amber-100",

  ticket_resolved:
    "bg-[#0F973D] min-h-[27px] px-[10px] py-[2.5px] font-[500] text-[13.05px] text-[#FFFFFF] ",

  ticket_pending:
    "bg-[#DD900D] min-h-[27px] px-[10px] py-[2.5px] font-[500] text-[13.05px] text-[#FFFFFF] ",

  unverified:
    "bg-[#FBEAE9] min-h-[26px] px-[12px] py-[2px] font-[500] text-[13.05px] text-[#CB1A14] ",

  in_progress:
    "bg-[#FBEAE9] min-h-[26px] px-[12px] py-[2px] font-[500] text-[13.05px] text-[#DD900D] ",

  approved:
    "bg-[#E7F6EC] min-h-[26px] px-[12px] py-[2px] font-[500] text-[13.05px] text-[#04802E] ",

  transfer_in_review:
    "bg-[#E3EFFC] min-h-[22px] px-[12px] py-[2px] font-[500] text-[14px] text-[#0D5EBA] ",

  transfer_rejected:
    "bg-[#FBEAE9] min-h-[22px] px-[12px] py-[2px] font-[500] text-[14px] text-[#CB1A14] ",

  transfer_approved:
    "bg-[#E7F6EC] min-h-[22px] px-[12px] py-[2px] font-[500] text-[14px] text-[#04802E] ",

  transfer_pending:
    "bg-[#FBE2B7] min-h-[22px] px-[12px] py-[2px] font-[500] text-[14px] text-[#DD900D] ",
};

export default function Badge({
  variant = "active",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full h-6 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
