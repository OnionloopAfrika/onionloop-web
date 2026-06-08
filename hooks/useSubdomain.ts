import { useState, useEffect } from "react";

export function useSubdomain() {
    const [subdomain, setSubdomain] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hostname = window.location.hostname;

            const cleanHost = hostname
                .replace(".localhost", "")
                .replace(".lvh.me", "")
                .replace(".onionloop.com", "");

            if (cleanHost === hostname || cleanHost === "www" || cleanHost === "") {
                setSubdomain("crew");
            } else {
                setSubdomain(cleanHost);
            }
        }
    }, []);

    return subdomain;
}