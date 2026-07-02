import Image from "next/image";
import Link from "next/link";

import footerBackground from "@/public/bg.png";

export default function Footer() {
  return (
   <footer className="relative overflow-hidden border-t border-[#E7E8E9] bg-[#F8F9FA] px-6 py-12 dark:border-white/10 dark:bg-[#08090A] md:px-12">
  <Image
    src={footerBackground}
    alt=""
    fill
    sizes="100vw"
    className="pointer-events-none object-cover object-top opacity-[2.9] dark:opacity-20"
  />
  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,249,250,0.98),rgba(248,249,250,0.9)_45%,rgba(248,249,250,0.98))] dark:bg-[linear-gradient(90deg,rgba(8,9,10,0.98),rgba(8,9,10,0.9)_45%,rgba(8,9,10,0.98))]" />
  <div className="relative mx-auto flex max-w-[1184px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <h2 className="font-heading text-xl font-bold">
        VITE
      </h2>

      <p className="mt-6 text-sm font-semibold text-[#6B7280] dark:text-zinc-400">
        © 2024 Premium SaaS. All rights reserved.
      </p>
    </div>

    <div className="flex flex-wrap gap-x-8 gap-y-6 items-center text-sm font-semibold text-[#6B7280] dark:text-zinc-400">
      <Link href="/privacy-policy">Privacy Policy</Link>
      <Link href="/terms">Terms of Service</Link>
      <Link href="/security">Security</Link>
      <Link href="/status">Status</Link>
      <Link href="/twitter">Twitter</Link>
      <Link href="/linkedin">LinkedIn</Link>
    </div>
  </div>
</footer>
  );
}
