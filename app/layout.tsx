import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./global.css";

import { Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  weight: ["600","700"],
  style:"normal",
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

        <main className="flex-1 mx-auto w-full max-w-[1280px] pt-24 pb-40">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}