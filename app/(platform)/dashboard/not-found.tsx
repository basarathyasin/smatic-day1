"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function toViewName(pathname: string) {
	const missingSegment = pathname
		.replace(/^\/dashboard\/?/, "")
		.split("/")
		.filter(Boolean)
		.at(-1);

	if (!missingSegment) return "Dashboard";

	const normalizedSegment = decodeURIComponent(missingSegment)
		.replace(/[-_]+/g, " ")
		.trim()
		.toLowerCase();

	const singularSegment =
		normalizedSegment.length > 3 && normalizedSegment.endsWith("s")
			? normalizedSegment.slice(0, -1)
			: normalizedSegment;

	return singularSegment.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function DashboardNotFound() {
	const pathname = usePathname();
	const viewName = toViewName(pathname);
	const viewLabel = viewName.toLowerCase();

	return (
		<section className="flex min-h-[calc(100svh-96px)] flex-col items-center justify-center text-center">
			<h1 className="font-heading text-6xl font-bold text-[#191C1D]">404</h1>

			<h2 className="mt-4 text-2xl font-semibold text-[#191C1D]">
				{viewName} page not found
			</h2>

			<p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
				The {viewLabel} view you&apos;re looking for doesn&apos;t exist.
			</p>

			<Link
				href="/dashboard"
				className="mt-6 rounded-lg border border-[#CFC4C5] px-4 py-2 text-sm font-medium text-[#191C1D] transition-colors hover:bg-[#F8F9FA]"
			>
				Back to dashboard
			</Link>
		</section>
	);
}
