import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-8 p-6 border-b justify-center ">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/products">Products</Link>
      <Link href="/contact">Contact</Link>
     
    </nav>
  );
}