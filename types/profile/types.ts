import React from "react";

export interface ProfileHeaderProps {
  title: string;
  subtitle: string;
  btn?: React.ReactNode;
}

export interface ToggleProps {
  title: string;
  subtitle: string;
  toggle: React.ReactNode;
  className?: string;
}

export interface MobileProps {
  avatar: string;
  fullName: string;
  role: string;
  btn: React.ReactNode;
  className?: string;
}

export interface ContactGridItem {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SupportHistoryItem {
  id: string;
  title: string;
  message: string;
  status: "pending" | "resolved";
  date: string;
}
