"use client";
import Image from "next/image";
import EssentialShortcuts from "./components/Shortcuts/Essentials";
import CardsSection from "./components/CardsSection";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-2 pb-20 sm:p-2 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <EssentialShortcuts />
        <CardsSection />
      </main>
    </div>
  );
}
