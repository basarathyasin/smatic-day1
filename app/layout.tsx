import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./global.css";

import { Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geist.variable, inter.variable)}>
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 pb-24 pt-16 sm:px-6 md:px-8 md:pb-40 md:pt-24">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
