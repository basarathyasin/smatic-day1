import Link from "next/link";

export default function AuthNotFound() {
	return (
		<section className="mx-auto flex min-h-[60vh] max-w-[520px] flex-col justify-center text-center">
			<p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#585F6C]">
				NextApp
			</p>

			<h1 className="mt-4 font-heading text-6xl font-bold text-[#191C1D]">
				404
			</h1>

			<h2 className="mt-4 text-2xl font-semibold text-[#191C1D]">
				Auth page not found
			</h2>

			<p className="mt-2 text-base leading-7 text-[#585F6C]">
				The sign-in page you&apos;re looking for doesn&apos;t exist.
			</p>

			<Link
				href="/login"
				className="mx-auto mt-6 rounded-lg border border-[#CFC4C5] px-4 py-2 text-sm font-medium text-[#191C1D] transition-colors hover:bg-[#F8F9FA]"
			>
				Back to login
			</Link>
		</section>
	);
}
