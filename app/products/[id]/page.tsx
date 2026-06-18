import { products } from "@/app/products/page";

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export default async function ProductPage({ params }: Props) {
	await new Promise((resolve) => setTimeout(resolve, 5000));

	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	const { id } = await params;
	const productId = Number(id);

	if (Number.isNaN(productId)) {
		throw new Error("Invalid product ID");
	}

	const product = products.find((p) => p.id === Number(id));

	if (!product) {
		throw new Error("Product not found");
	}
	return (
		<div>
			Product Name : {product.name}
			<br/>
			Product ID: {id} 
			<br />
			Product Price : {product.price}
			<br />
			API URL: {apiUrl}
		</div>
	);
}
