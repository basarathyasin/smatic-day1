"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#F8F9FA]/90 backdrop-blur-md">
      <div className="flex h-[72px] w-full items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="font-heading text-xl font-black tracking-tight text-black"
            onClick={closeMenu}
          >
            VITE
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#585F6C] transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
      
          <Button asChild size="sm" variant="ghost" className="h-9 px-4">
            <Link href="/login">
              Login
            </Link>
          </Button>

          <Button asChild size="sm" variant="default" className="h-9 rounded-lg px-5">
            <Link href="/signup">
              Get Started
            </Link>
          </Button>
        </div>

        <Button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-black/10 bg-zinc-50 px-6 py-5 shadow-sm md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-3 text-base font-light text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-black"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-5 grid gap-3">
            <Button asChild size="sm" variant="ghost" width="full">
              <Link href="/login" onClick={closeMenu}>
                Login
              </Link>
            </Button>

            <Button asChild size="sm" variant="default" width="full">
              <Link href="/signup" onClick={closeMenu}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
