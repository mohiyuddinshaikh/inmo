"use client";
import Image from "next/image";
import EssentialShortcuts from "./components/Shortcuts/Essentials";
import CardsSection from "./components/CardsSection";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-2 pb-20 sm:p-2 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {!session || session.expires < new Date().getTime() ? (
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        ) : (
          <button onClick={() => signOut()}>Sign out</button>
        )}
        <EssentialShortcuts />
        <CardsSection />
      </main>
    </div>
  );
}
