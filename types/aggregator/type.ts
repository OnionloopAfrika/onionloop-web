// ---------------------------------------------------------------------------
// Domain types for the Target dashboard.
// These are written to mirror the shape a backend would realistically return,
// so the UI stays API-ready: swap the mock resolver in `api.ts` for real fetch
// calls and nothing in the components needs to change.
// ---------------------------------------------------------------------------

export type TrackStatus = "on-track" | "behind";
export type BusinessType = "Agent" | "Merchant";
export type ActivityState = "active" | "inactive";
export type KycLevel = "TIER 1" | "TIER 2" | "TIER 3";
export type ChartRange = "7days" | "30days" | "90days";
export type BusinessPeriod = "this-month" | "last-month" | "this-year";

/** A single point on the daily-volume chart. */
export interface VolumePoint {
    /** Short axis label, e.g. "Mon". */
    label: string;
    /** Raw naira value for the day. */
    value: number;
}

export interface DailyVolume {
    earnedToday: number;
    range: ChartRange;
    /** Y-axis tick values, bottom to top. Rendered evenly spaced. */
    yTicks: number[];
    points: VolumePoint[];
}

/** Generic progress metric used by every "target volume" card. */
export interface MetricProgress {
    /** Current attained value (raw number for math, formatting is a view concern). */
    value: number;
    /** Target the user is working toward. */
    target: number;
    /** 0–100. Provided by the API so client + server agree on the bar width. */
    progress: number;
    status: TrackStatus;
}

export interface QuickBonus {
    amount: number;
    /** How many more merchants/users to onboard to unlock it. */
    remaining: number;
}

export interface TargetOverview {
    availableBalance: number;
    balanceStatus: TrackStatus;
    nextPayoutAt: string; // ISO date

    totalExpectedBalance: number;
    /** 0–100 ring value on the expected-balance card. */
    expectedProgress: number;
    targetBalance: number;
    baseCommission: number;

    quickBonus: QuickBonus;

    transactionVolume: MetricProgress & { needPerDay: number; currentPerDay: number };
    onboardingVolume: MetricProgress & { needPerDay: number; currentPerDay: number };
    newBusinesses: MetricProgress & { remaining: number; bonus: number };
    activeAgents: MetricProgress & { bonus: number };
    activeMerchants: MetricProgress & { remaining: number; bonus: number };

    dailyVolume: DailyVolume;
}

export interface BusinessOwner {
    name: string;
    avatarUrl?: string;
}

export interface Business {
    id: string;
    owner: BusinessOwner;
    name: string;
    type: BusinessType;
    volume: number;
    commission: number;
    kycLevel: KycLevel;
    state: ActivityState;
    /** ISO timestamp of last activity; the UI derives the relative label. */
    lastActiveAt: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

export interface BusinessQuery {
    state: ActivityState;
    page?: number;
    pageSize?: number;
    search?: string;
    period?: BusinessPeriod;
}