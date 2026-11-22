interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            aria-hidden="true"
            className={`animate-pulse rounded-md bg-gray-200/80 ${className}`}
        />
    );
}

interface PageHeaderSkeletonProps {
    hasSubtitle?: boolean;
    actionCount?: number;
}

export function PageHeaderSkeleton({
    hasSubtitle = true,
    actionCount = 2,
}: PageHeaderSkeletonProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <Skeleton className="h-6 w-48" />
                {hasSubtitle && <Skeleton className="mt-2 h-3.5 w-72 max-w-full" />}
            </div>
            {actionCount > 0 && (
                <div className="flex items-center gap-2.5">
                    {Array.from({ length: actionCount }).map((_, index) => (
                        <Skeleton key={index} className="h-9 w-28 rounded-lg" />
                    ))}
                </div>
            )}
        </div>
    );
}

interface StatCardSkeletonProps {
    showFooter?: boolean;
}

export function StatCardSkeleton({ showFooter = true }: StatCardSkeletonProps) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
            <div className="flex items-start justify-between gap-3">
                <Skeleton className="h-7 w-20 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
            </div>
            <Skeleton className="mt-3 h-3.5 w-28" />
            {showFooter && <Skeleton className="mt-3 h-4 w-24 rounded-full" />}
        </div>
    );
}

interface FilterBarSkeletonProps {
    dropdownCount?: number;
    hasRightLabel?: boolean;
}

export function FilterBarSkeleton({
    dropdownCount = 1,
    hasRightLabel = false,
}: FilterBarSkeletonProps) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 flex-1">
                <Skeleton className="h-9 w-full sm:w-64 rounded-lg" />
                {Array.from({ length: dropdownCount }).map((_, index) => (
                    <Skeleton key={index} className="h-9 w-32 rounded-lg" />
                ))}
            </div>
            {hasRightLabel && <Skeleton className="h-4 w-28 shrink-0" />}
        </div>
    );
}

interface DataTableSkeletonProps {
    columns?: number;
    rows?: number;
    hasAvatar?: boolean;
    hasActions?: boolean;
}

export function DataTableSkeleton({
    columns = 4,
    rows = 5,
    hasAvatar = false,
    hasActions = false,
}: DataTableSkeletonProps) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white shadow-xs overflow-hidden">
            <div
                className="border-b border-gray-100 bg-gray-50/60 px-6 py-3.5 grid gap-4"
                style={{
                    gridTemplateColumns: `repeat(${columns + (hasActions ? 1 : 0)}, minmax(0, 1fr))`,
                }}
            >
                {Array.from({ length: columns }).map((_, index) => (
                    <Skeleton key={index} className="h-3.5 w-20" />
                ))}
                {hasActions && <div />}
            </div>

            <div className="divide-y divide-gray-100">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="px-6 py-4 grid items-center gap-4"
                        style={{
                            gridTemplateColumns: `repeat(${columns + (hasActions ? 1 : 0)}, minmax(0, 1fr))`,
                        }}
                    >
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <div key={colIndex} className="flex items-center gap-3">
                                {colIndex === 0 && hasAvatar && (
                                    <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                                )}
                                <Skeleton
                                    className={`h-3.5 ${colIndex === 0 ? "w-28" : "w-16"}`}
                                />
                            </div>
                        ))}
                        {hasActions && (
                            <div className="flex items-center justify-end gap-2">
                                <Skeleton className="h-5 w-5 rounded" />
                                <Skeleton className="h-5 w-5 rounded" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function StaffCardSkeleton() {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs space-y-5">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-11 w-11 rounded-full shrink-0" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
                <Skeleton className="h-5 w-3 rounded" />
            </div>

            <div className="flex items-center justify-between gap-3">
                <div className="space-y-1.5">
                    <Skeleton className="h-5 w-10" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <Skeleton className="h-10 w-full rounded-lg" />
        </div>
    );
}

interface ChartCardSkeletonProps {
    hasSubtitle?: boolean;
    controlType?: "tabs" | "dropdown";
}

export function ChartCardSkeleton({
    hasSubtitle = false,
    controlType = "tabs",
}: ChartCardSkeletonProps) {
    const barHeights = ["h-36", "h-20", "h-48", "h-24", "h-32", "h-24", "h-44"];

    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs flex flex-col justify-between h-full">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <Skeleton className="h-5 w-36" />
                    {hasSubtitle && <Skeleton className="mt-2 h-3.5 w-28" />}
                </div>
                {controlType === "tabs" ? (
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-7 w-14 rounded-md" />
                        <Skeleton className="h-7 w-16 rounded-md" />
                        <Skeleton className="h-7 w-16 rounded-md" />
                    </div>
                ) : (
                    <Skeleton className="h-9 w-28 rounded-lg" />
                )}
            </div>

            <div className="mt-8 flex items-end gap-4 pt-4">
                <div className="hidden sm:flex flex-col justify-between h-52 pb-6">
                    <Skeleton className="h-3 w-6" />
                    <Skeleton className="h-3 w-6" />
                    <Skeleton className="h-3 w-4" />
                </div>
                <div className="flex-1 grid grid-cols-7 items-end gap-3 sm:gap-5 h-52">
                    {barHeights.map((heightClass, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 h-full justify-end">
                            <Skeleton className={`w-full max-w-8 rounded-t-md ${heightClass}`} />
                            <Skeleton className="h-3 w-7" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface RecentTransactionsSkeletonProps {
    rows?: number;
}

export function RecentTransactionsSkeleton({ rows = 6 }: RecentTransactionsSkeletonProps) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs h-full">
            <div className="flex items-center justify-between gap-2 mb-5">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3.5 w-14" />
            </div>

            <div className="space-y-4">
                {Array.from({ length: rows }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between gap-3 py-1">
                        <div className="flex items-center gap-3 min-w-0">
                            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-3.5 w-28" />
                                <Skeleton className="h-2.5 w-20" />
                            </div>
                        </div>
                        <Skeleton className="h-3.5 w-16 shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
            <PageHeaderSkeleton />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <StatCardSkeleton key={index} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                <div className="lg:col-span-7">
                    <ChartCardSkeleton hasSubtitle controlType="tabs" />
                </div>
                <div className="lg:col-span-5">
                    <RecentTransactionsSkeleton rows={6} />
                </div>
            </div>
        </div>
    );
}

export function TransactionsPageSkeleton() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
            <PageHeaderSkeleton />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <StatCardSkeleton key={index} />
                ))}
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-xs flex items-center gap-2">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-8 w-28 rounded-lg" />
            </div>

            <Skeleton className="h-5 w-48" />

            <FilterBarSkeleton dropdownCount={1} />

            <DataTableSkeleton columns={3} rows={4} hasAvatar hasActions />
        </div>
    );
}

export function InventoryPageSkeleton() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
            <PageHeaderSkeleton />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <StatCardSkeleton key={index} />
                ))}
            </div>

            <Skeleton className="h-12 w-full rounded-xl" />

            <div className="space-y-4">
                <FilterBarSkeleton dropdownCount={2} hasRightLabel />
                <DataTableSkeleton columns={6} rows={5} hasAvatar hasActions />
            </div>
        </div>
    );
}

export function StaffManagementPageSkeleton() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
            <PageHeaderSkeleton hasSubtitle={false} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <StatCardSkeleton key={index} />
                ))}
            </div>

            <FilterBarSkeleton dropdownCount={1} hasRightLabel />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <StaffCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}

export function ReportsPageSkeleton() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
            <PageHeaderSkeleton />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <StatCardSkeleton key={index} showFooter={false} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                <ChartCardSkeleton hasSubtitle controlType="tabs" />
                <ChartCardSkeleton controlType="dropdown" />
            </div>
        </div>
    );
}