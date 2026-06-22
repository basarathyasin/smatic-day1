import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function SignupPage() {
	return (
		<section className="mx-auto flex min-h-[60vh] max-w-[520px] flex-col justify-center">
			<div className="rounded-2xl border border-[#CFC4C580] bg-white p-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)] sm:p-8">
				<p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#585F6C]">
					Get started
				</p>

				<h1 className="mt-3 font-heading text-[32px] font-bold leading-10 text-[#191C1D]">
					Create your account
				</h1>

				<p className="mt-4 text-base leading-7 text-[#585F6C]">
					This signup page is a placeholder for now.
				</p>

				<div className="mt-8 grid gap-4">
					<div className="rounded-xl border border-[#CFC4C5] bg-[#F8F9FA] px-4 py-3 text-sm text-[#585F6C]">
						Work email
					</div>

					<div className="rounded-xl border border-[#CFC4C5] bg-[#F8F9FA] px-4 py-3 text-sm text-[#585F6C]">
						Company name
					</div>
				</div>

				<Button asChild className="mt-8" width="full">
					<Link href="/">Back to home</Link>
				</Button>
			</div>
		</section>
	);
}
