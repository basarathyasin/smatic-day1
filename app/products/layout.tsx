export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<nav className="border-b p-4">Products Navigation</nav>
			<main className="p-6">{children}</main>
		</div>
	);
}
