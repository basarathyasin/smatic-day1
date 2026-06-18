import ProductCard from "@/components/ui/ProductCard";

export const products = [
	{
		id: 1,
		name: "Wireless Headphones",
		price: "$99",

	},
	{
		id: 2,
		name: "Mechanical Keyboard",
		price: "$129",

	},
	{
		id: 3,
		name: "Gaming Mouse",
		price: "$59",

	},
	{
		id: 4,
		name: "4K Monitor",
		price: "$299",

	},
];

export default function ProductsPage() {
	return (
		<>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>
	);
}
