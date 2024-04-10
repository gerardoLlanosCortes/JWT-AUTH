import ObtenerPosts from "@/components/ObtenerPosts";

export default async function Home() {
  return (
    <div className="flex flex-col gap-2">
      <h1>Home page, everyone can see it</h1>
      <ObtenerPosts />
    </div>
  );
}
