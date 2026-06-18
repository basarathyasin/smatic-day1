"use client"
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
}

interface ProductCardProps {
  product: Product;
}


export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="mb-4 flex h-40 items-center justify-center rounded-md bg-muted">
        <span className="text-muted-foreground">Image</span>
      </div>

      <h2 className="mb-2 font-semibold">{product.name}</h2>

      <p className="mb-4 text-muted-foreground">{product.price}</p>

      <Link
        href={`/products/${product.id}`}
        className="block w-full rounded-md bg-primary px-4 py-2 text-center text-primary-foreground"
      >
        View Details
      </Link>
    </div>
  );
}