import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInWithGoogle() {
  const { data: session } = useSession();
  console.log("session", session);

  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <>
      {!session || session.expires < new Date().getTime() ? (
        <button onClick={handleSignIn}>Sign in with Google</button>
      ) : (
        <button onClick={() => signOut()}>Sign out</button>
      )}
    </>
  );
}
