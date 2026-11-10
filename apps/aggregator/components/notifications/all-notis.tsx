const notifications = [
  {
    title: "6 accounts awaiting KYC review",
    category: "KYC",
    age: "Just now",
    color: "#E49B08",
  },
  {
    title: "Delta Quickcash- cash discrepancy flagged",
    category: "Agent",
    age: "1 h ago",
    color: "#D31812",
  },
  {
    title: "2 new merchant applications pending approval",
    category: "merchant",
    age: "3 h ago",
    color: "#E49B08",
  },
  {
    title: "DSP-321 escalated-needs response within 24hours",
    category: "Dispute",
    age: "3 h ago",
    color: "#D31812",
  },
  {
    title: "OnionMega branch inventory sync completed",
    category: "System",
    age: "Today",
    color: "#078132",
  },
];

export default function AllNotis() {
  return (
    <section
      aria-label="All notifications"
      className="w-full overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white px-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-sm:px-[16px]"
    >
      {notifications.map((notification) => (
        <article
          className="flex min-h-[78px] items-center gap-[16px] border-b border-[#E0E0E0] last:border-b-0 max-sm:gap-[12px] max-sm:py-[14px]"
          key={notification.title}
        >
          <span
            aria-hidden="true"
            className="h-[10px] w-[10px] shrink-0 rounded-full"
            style={{ backgroundColor: notification.color }}
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-[500] leading-[20px] text-[#131313] max-sm:whitespace-normal">
              {notification.title}
            </p>
            <p className="mt-[4px] flex items-center gap-[8px] text-[12px] font-[400] leading-[16px] text-[#6C6C6C]">
              <span>{notification.category}</span>
              <span
                aria-hidden="true"
                className="h-[4px] w-[4px] rounded-full bg-[#D9D9D9]"
              />
              <span>{notification.age}</span>
            </p>
          </div>

          <time className="shrink-0 text-[12px] font-[400] text-[#6C6C6C] max-sm:hidden">
            Just now
          </time>
        </article>
      ))}
    </section>
  );
}
