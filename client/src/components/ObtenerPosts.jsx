"use client";

import axios from "@/libs/hooks/axios";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function ObtenerPosts() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const axiosAuth = useAxiosAuth();

  const obtener = async () => {
    // const res = await fetch("http://localhost:3001/api/v1/posts", {
    //   method: "GET",
    //   headers: {
    //     Authorization: `bearer ${session?.user?.access_token}`,
    //   },
    // });
    try {
      const res = await axiosAuth.get("/posts");
      console.log(res);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="bg-orange-600 text-white py-2 px-4 rounded text-2xl"
        onClick={obtener}
      >
        Obtener Posts
      </button>

      {posts?.length > 0 ? (
        <div className="flex flex-col gap-2">
          {posts?.map((post) => (
            <h1 key={post.id}>{post.title}</h1>
          ))}
        </div>
      ) : (
        <p>No hay posts para mostrar</p>
      )}
    </div>
  );
}
