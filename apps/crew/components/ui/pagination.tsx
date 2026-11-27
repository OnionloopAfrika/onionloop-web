"use client";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
}

type PageItem = number | "ellipsis";

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  itemLabel = "items",
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);
  const pageItems = getPageItems(page, totalPages);

  const renderArrow = (direction: "previous" | "next") => (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline
        points={direction === "previous" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
      />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <span className="text-[12px] font-medium text-[#6C6C6C]">
        Showing {startItem} to {endItem} of {totalItems} {itemLabel}
      </span>

      <nav aria-label="Pagination" className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Go to previous page"
          disabled={page <= 1 || totalPages === 0}
          onClick={() => onPageChange(page - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6C6C6C] transition-colors hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          {renderArrow("previous")}
        </button>

        {pageItems.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="flex h-9 min-w-7 items-center justify-center text-[14px] font-medium text-[#6C6C6C]"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Go to page ${item}`}
              aria-current={page === item ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-[12px] font-medium transition-colors ${
                page === item
                  ? "bg-[#04907E] text-white"
                  : "text-[#6C6C6C] hover:bg-[#F3F4F6]"
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="Go to next page"
          disabled={page >= totalPages || totalPages === 0}
          onClick={() => onPageChange(page + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#6C6C6C] transition-colors hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          {renderArrow("next")}
        </button>
      </nav>
    </div>
  );
}
