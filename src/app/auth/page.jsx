"use client";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Welcome to Inzo!
        </h1>
        <p className="mb-6 text-center text-gray-500">Sign in to continue</p>

        <button
          onClick={() => signIn("google")}
          className="flex w-full items-center justify-center cursor-pointer gap-3 rounded-lg border border-gray-300 bg-white py-2 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
