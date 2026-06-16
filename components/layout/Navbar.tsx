import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-8 p-4 border-b">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/products">Products</Link>
    </nav>
  );
}