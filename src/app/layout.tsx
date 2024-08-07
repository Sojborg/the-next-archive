import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 py-4">
          <nav className="flex gap-4 items-center max-w-screen-lg mx-auto">
            <Link href="/" className="text-white text-lg font-semibold hover:text-gray-300">
              Home
            </Link>

            <Link href="/books" className="text-white text-lg font-semibold hover:text-gray-300">
              Archive
            </Link>
          </nav>
        </header>
        <main className="max-w-screen-lg mx-auto">
          {children}
        </main>
        <footer>
          <p className="text-center my-4">© {new Date().getFullYear()} The Archive</p>
        </footer>
      </body>
    </html>
  );
}
