"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-[50vh] items-center justify-center px-6">
      <section className="max-w-2xl text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
          Welcome To Our Store
        </h1>

        <p className="mb-8 text-lg text-muted-foreground">
          Discover amazing products at great prices. Browse our collection and
          find exactly what you need.
        </p>

        <button
          onClick={() => router.push("/products")}
          className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          View Products
        </button>
      </section>
    </main>
  );
}