"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Header() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/auth" });
  };

  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex justify-between items-center px-4 shadow-md bg-white">
      <h1 className="text-xl font-semibold">Inmo</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full overflow-hidden w-10 h-10 border border-gray-300">
            <Image
              src={session?.user?.image || "/profile.jpg"}
              alt="Profile"
              width={40}
              height={40}
              className="object-cover cursor-pointer"
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
