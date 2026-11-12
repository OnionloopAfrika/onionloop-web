import { redirect } from "next/navigation";

// The product picker now lives in apps/entry.
// On its own subdomain this app goes straight to its login screen.
export default function Home() {
  redirect("/mega/auth/login/");
}
