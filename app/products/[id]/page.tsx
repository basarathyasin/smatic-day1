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
	const limit = 200;

	if (Number.isNaN(productId)) {
		throw new Error("Invalid product ID");
	}

	if (productId > limit) {
		throw new Error("Product not found");
	}
	return (
		<div>
			Product ID: {id} <br />
			API URL: {apiUrl}
		</div>
	);
}
