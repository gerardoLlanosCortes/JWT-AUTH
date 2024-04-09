import ObtenerPosts from "@/components/ObtenerPosts";
import { axiosAuth } from "@/libs/hooks/axios";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col gap-2">
      <h1>Home page, everyone can see it</h1>
      <ObtenerPosts />
    </div>
  );
}
