"use client";
import Image from "next/image";
import EssentialShortcuts from "./components/Shortcuts/Essentials";
import CardsSection from "./components/CardsSection";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      console.log("data", data);
    };
    fetchUsers();
  }, []);

  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-2 pb-20 sm:p-2 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {!session || session.expires < new Date().getTime() ? (
          <button onClick={handleSignIn}>Sign in with Google</button>
        ) : (
          <button onClick={() => signOut()}>Sign out</button>
        )}
        <EssentialShortcuts />
        <CardsSection />
      </main>
    </div>
  );
}
