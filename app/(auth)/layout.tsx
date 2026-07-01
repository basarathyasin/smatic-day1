import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <main className="flex w-full flex-1 items-center justify-center px-4 py-6">
        {children}
      </main>

      <Footer />
    </div>
  );
}
