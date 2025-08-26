// components/AuthGuard.jsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "@/lib/userSlice";

function getRedirectPath({ hasToken, hasPreference, pathname }) {
  if (!hasToken) return "/auth";
  if (hasToken && !hasPreference && pathname !== "/preferences")
    return "/preferences";
  if (
    hasToken &&
    hasPreference &&
    (pathname === "/auth" || pathname === "/preferences")
  )
    return "/"; // default home/dashboard
  return null; // stay where you are
}

export default function AuthGuard({ children }) {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector(selectUser);
  const userStatus = useSelector((state) => state.user.status);

  // fetch user when session is available and user data isn't already loaded
  useEffect(() => {
    if (session?.user?.email && userStatus !== 'succeeded' && userStatus !== 'loading') {
      dispatch(fetchUser(session.user.email));
    }
  }, [session, dispatch, userStatus]);

  // handle redirects
  useEffect(() => {
    if (status === "loading" || userStatus === "loading") return;

    const hasToken = !!session;
    const hasPreference = !!user?.preferences;

    const redirectTo = getRedirectPath({
      hasToken,
      hasPreference,
      pathname,
    });

    if (redirectTo && redirectTo !== pathname) {
      router.replace(redirectTo);
    }
  }, [status, userStatus, session, pathname, router, user]);

  if (status === "loading" || userStatus === "loading") {
    return null; // or a spinner
  }

  return <>{children}</>;
}
