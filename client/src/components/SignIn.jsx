"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ButtonAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  console.log(session);

  if (!session) {
    // Redirige al usuario a la página de inicio de sesión
    signIn(); // Esto iniciará el proceso de inicio de sesión proporcionado por NextAuth.js
    return null; // Devuelve null mientras se inicia sesión
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.username} <br />
        <button onClick={() => signOut()} className="btn btn-danger">
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()} className="btn btn-primary">
        Sign in
      </button>
    </>
  );
}
