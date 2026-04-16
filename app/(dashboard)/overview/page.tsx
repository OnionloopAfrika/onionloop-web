import RevenueOverview from "@/components/layouts/revenue-overview";
import { fetchRevenue } from "@/utils/helpers/revenue-chart";


export default async function Page() {
    const initialData = await fetchRevenue("7days");

    return (
        <main className="flex min-h-screen items-center justify-center bg-black p-6">
            <RevenueOverview initialData={initialData} />
        </main>
    );
}