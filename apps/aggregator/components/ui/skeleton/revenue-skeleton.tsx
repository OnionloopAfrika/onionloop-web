"use client";

import { Period } from "@/types/transactions/types";


// ─── Loading skeleton ─────────────────────────────────────────────────────────

export function ChartSkeleton() {
    return (
        <div className="flex h-full w-full flex-col justify-end gap-0 px-2 pb-6">
            <div className="relative flex-1">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="absolute w-full border-t border-gray-100"
                        style={{ bottom: `${(i / 3) * 100}%` }}
                    />
                ))}
                <div className="absolute inset-x-0 bottom-0 animate-pulse overflow-hidden rounded-t-xl">
                    <svg
                        viewBox="0 0 400 140"
                        preserveAspectRatio="none"
                        className="h-full w-full"
                    >
                        <path
                            d="M0,130 C40,110 70,80 110,88 C150,96 180,65 220,74
                 C260,83 290,36 330,26 C360,18 385,16 400,14
                 L400,140 L0,140 Z"
                            fill="#e5e7eb"
                        />
                    </svg>
                </div>
            </div>
            <div className="flex justify-between px-2 pt-3">
                {["", "", "", "", "", "", ""].map((_, i) => (
                    <span
                        key={i}
                        className="h-3 w-7 animate-pulse rounded bg-gray-200"
                    />
                ))}
            </div>
        </div>
    );
}

// ─── Container ────────────────────────────────────────────────────────────────
