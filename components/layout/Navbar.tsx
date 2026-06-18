import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-zinc-50/80 backdrop-blur-md">
      <div className="flex h-[72px] w-full items-center justify-between px-12">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="font-heading text-2xl font-black tracking-tight text-black"
          >
            Vite
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-light text-zinc-600 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
      
          <Button asChild size="sm" variant="ghost">
            <Link href="/login">
               Login
            </Link>
          </Button>

          <Button asChild size="sm" variant="default">
            <Link href="/signup">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}