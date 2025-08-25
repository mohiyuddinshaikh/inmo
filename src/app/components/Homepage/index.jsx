"use client";
import React from "react";
import Header from "../Header";
import EssentialShortcuts from "../Shortcuts/Essentials";
import CardsSection from "../CardsSection";

export default function Homepage() {
  return (
    <div className=" min-h-screen  pb-20 mt-16  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Header />
        <EssentialShortcuts />
        <CardsSection />
      </main>
    </div>
  );
}
