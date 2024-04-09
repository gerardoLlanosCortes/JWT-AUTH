"use client";

import { useSession } from "next-auth/react";
import axios from "./axios";

export default function useRefreshToken() {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/refresh", {
      refresh_token: session?.user?.refresh_token,
    });

    if (session) session.user.access_token = res.data.access_token;
  };

  return refreshToken;
}
