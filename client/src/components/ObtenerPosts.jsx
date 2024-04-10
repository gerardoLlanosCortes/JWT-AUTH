"use client";

import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useState } from "react";

export default function ObtenerPosts() {
  const [posts, setPosts] = useState([]);
  const axiosAuth = useAxiosAuth();

  const obtener = async () => {
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
