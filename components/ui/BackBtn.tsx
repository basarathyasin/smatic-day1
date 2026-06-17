"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="rounded-md border px-4 py-2"
    >
      ← Back
    </button>
  );
}