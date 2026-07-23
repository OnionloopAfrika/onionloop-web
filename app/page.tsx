"use client";

import { OnionloopIcon } from "@/components/icons/svgs";
import React from "react";
import { useRouter } from "next/navigation";

interface AppCardProps {
  title: string;
  description: string;
  pathSegment: string;
  badge?: string;
  icon: React.ReactNode;
}

function AppCard({ title, description, pathSegment, badge, icon }: AppCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/${pathSegment}/auth/login`)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-[#04907e] transition-colors group-hover:bg-[#04907e] group-hover:text-white">
            {icon}
          </div>
          {badge && (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
              {badge}
            </span>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-[#024e44]">{title}</h3>
          <p className="mt-2 text-sm text-[#6c6c6c] leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center font-semibold text-sm text-[#04907e]">
        Launch Platform
        <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex mt-20 min-h-screen flex-col bg-slate-50 text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      <header className="fixed top-0 left-0 w-full bg-white h-[80px] px-8 flex items-center z-50 shadow-[0px_4px_10px_rgba(0,0,0,0.03)]">
        <OnionloopIcon />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#024e44] sm:text-5xl">
            Welcome to the Inventory Portal
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#6c6c6c] sm:text-base">
            Select the appropriate operational dashboard to manage financial assets, scale tracking, and consolidated parameters.
          </p>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AppCard
            title="OnionCrew"
            description="Tailored asset inventory tracking system configured for growing setups and small business operations."
            pathSegment="crew"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />

          <AppCard
            title="OnionMega"
            description="Enterprise-grade asset ledger infrastructure featuring robust multi-warehouse tracking environments."
            pathSegment="mega"
            badge="Enterprise"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />

          <AppCard
            title="Aggregator"
            description="Centralized administrative console designed for master visibility across all active organizational metrics."
            pathSegment="aggregator"
            badge="Console"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            }
          />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Onionloop Technologies. All rights reserved.
      </footer>
    </div>
  );
}