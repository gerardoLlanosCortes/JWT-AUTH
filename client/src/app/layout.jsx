import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
// import Provider from "@/components/Provider";
import SignIn from "@/components/SignIn";
import SessionAuthProvider from "@/context/SessionAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionAuthProvider>
          <div className="flex gap-3 p-2">
            <Link
              href={"/"}
              className="bg-orange-600 text-white py-2 px-4 rounded"
            >
              Home
            </Link>
            <Link
              href={"/admin"}
              className="bg-orange-600 text-white py-2 px-4 rounded"
            >
              Admin
            </Link>
            <SignIn />
          </div>
          <div className="flex justify-center items-center my-5 text-6xl">
            {children}
          </div>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
