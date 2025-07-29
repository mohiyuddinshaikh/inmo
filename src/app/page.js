"use client";
import EssentialShortcuts from "./components/Shortcuts/Essentials";
import CardsSection from "./components/CardsSection";
import { useEffect } from "react";
import SignInWithGoogle from "./components/SignInWithGoogle";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    const fetchUsers = async () => {
      if (!session?.user?.email) return;
      try {
        const response = await axios.get("/api/users", {
          params: { email: session.user.email },
        });
        console.log(" user data", response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
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
      console.log("Preference created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating preference:", error);
      throw error;
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-2 pb-20 sm:p-2 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <SignInWithGoogle />
        <button
          onClick={async () => {
            const userId = "6888a7a858d24241553368db";
            const tags = [123];
            try {
              const result = await createPreference(userId, tags);
              console.log("Created preference:", result);
            } catch (e) {
              // Error already logged in createPreference
            }
          }}
          style={{
            padding: "8px 16px",
            background: "#333",
            color: "#fff",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        >
          Create Preference (Hardcoded)
        </button>
        <EssentialShortcuts />
        <CardsSection />
      </main>
    </div>
  );
}
