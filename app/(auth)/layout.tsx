import Footer from "@/components/layout/Footer";
import "../global.css";

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
      <body className="flex min-h-screen flex-col bg-[#F8FAFC]">
        <main className="flex w-full flex-1 items-center justify-center px-4 py-6">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
