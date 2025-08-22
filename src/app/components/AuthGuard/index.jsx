// components/AuthGuard.tsx
"use client";

import useUserStore from "@/lib/userStore";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();

  useEffect(() => {
    if (status === "loading") return; // wait until session loads
    console.log("user", status, user, status);
    const hasToken = !!session;
    const hasPreference = user?.preferences;

    if (!hasToken && pathname !== "/auth") {
      router.replace("/auth");
    } else if (hasToken && !hasPreference && pathname !== "/preferences") {
      router.replace("/preferences");
    } else if (hasToken && pathname === "/auth") {
      router.replace("/");
    }
  }, [status, session, pathname, router, user]);

  return <>{children}</>;
}
