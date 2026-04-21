// app/layout.tsx or any layout wrapper
import DashboardNav from "@/components/layouts/nav-bar";

export default function DashboardLayout({ children }: {children: React.ReactNode}) {
    return (
        <>
            <DashboardNav
                activeKey="overview"
                businessName="Yetty Mama Lounge"
                userName="Margaret Adekola"
                avatarUrl="/path/to/avatar.jpg" // optional — falls back to initial
                messageCount={1}
                notificationCount={4}
            />
            <main>{children}</main>
        </>
    );
}