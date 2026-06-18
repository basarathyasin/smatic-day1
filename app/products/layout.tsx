import BackButton from "@/components/ui/BackBtn";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<nav className="border-b p-4">
				
				<BackButton />
				 </nav>
			<main className="p-6">{children}</main>
		</div>
	);
}
