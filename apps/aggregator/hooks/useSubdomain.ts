import { useState, useEffect } from "react";

export function useSubdomain() {
    const [subdomain, setSubdomain] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathname = window.location.pathname;
            const segments = pathname.split("/").filter(Boolean);
            const firstSegment = segments[0];

            if (firstSegment === "mega") {
                setSubdomain("mega");
            } else if (firstSegment === "aggregator") {
                setSubdomain("aggregator");
            } else {
                setSubdomain("crew");
            }
        }
    }, []);

    return subdomain;
}