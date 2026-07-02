import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="w-full flex-1">{children}</main>

        <Footer />
    </div>
  );
}
