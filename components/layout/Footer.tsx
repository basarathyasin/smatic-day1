import Link from "next/link";

export default function Footer() {
  return (
   <footer className="border-t border-[#E7E8E9] bg-[#F8F9FA] px-6 py-12 md:px-12">
  <div className="mx-auto flex max-w-[1184px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <h2 className="font-heading text-xl font-bold">
        VITE
      </h2>

      <p className="mt-6 text-sm font-semibold text-[#6B7280]">
        © 2024 Premium SaaS. All rights reserved.
      </p>
    </div>

    <div className="flex flex-wrap gap-x-8 gap-y-6 items-center text-sm font-semibold text-[#6B7280]">
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
