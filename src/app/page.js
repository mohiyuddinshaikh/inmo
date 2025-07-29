"use client";
import EssentialShortcuts from "./components/Shortcuts/Essentials";
import CardsSection from "./components/CardsSection";
import { useEffect } from "react";
import SignInWithGoogle from "./components/SignInWithGoogle";
import axios from "axios";
import { useSession } from "next-auth/react";
import useUserStore from "../lib/userStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  useEffect(() => {
    const fetchUsers = async () => {
      if (!session?.user?.email) return;
      try {
        const response = await axios.get("/api/users", {
          params: { email: session.user.email },
        });
        setUser(response.data); // Add user to Zustand store
      } catch (error) {
        // Error already logged in createPreference
      }
    };
    fetchUsers();
  }, [session]);

  const createPreference = async (userId, tags) => {
    try {
      const response = await axios.post("/api/preferences", {
        userId,
        tags,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-2 pb-20 sm:p-2 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <SignInWithGoogle />
        <button
          onClick={() => router.push("/preferences")}
          style={{
            padding: "8px 16px",
            background: "#0070f3",
            color: "#fff",
            borderRadius: "4px",
            marginBottom: "8px",
          }}
        >
          Go to Preferences
        </button>
        <EssentialShortcuts />
        <CardsSection />
      </main>
    </div>
  );
}
