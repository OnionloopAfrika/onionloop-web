// app/layout.tsx or any layout wrapper
import DashboardNav from "@/components/layouts/nav-bar";

export default function DashboardLayout({ children }: {children: React.ReactNode}) {
    return (
        <>
            <DashboardNav
                activeKey="overview"
                businessName="Yetty Mama Lounge"
                userName="Margaret Adekola"
                avatarUrl="https://i.pravatar.cc/150?u=12" // optional — falls back to initial
                messageCount={1}
                notificationCount={4}
            />
            <main className="w-full p-6 bg-[#F7F7F7]">{children}</main>
        </>
    );
}