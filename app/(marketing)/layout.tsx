import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../global.css";

import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geist.variable, geist.className)}>
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="w-full flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
