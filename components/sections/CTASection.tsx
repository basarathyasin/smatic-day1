import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
	return (
		<section className="px-12 py-20">
			<div className="mx-auto max-w-[1280px]">
				<div className="rounded-[32px] border border-[#CFC4C580] bg-[#F3F4F5] px-6 py-24 md:px-12 md:py-32">
					<div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
						<h4 className="font-heading text-[48px] font-[700] leading-[44px] tracking-[-1px] text-[#191C1D] md:leading-[56px] md:tracking-[-1.92px]">
							Start building today.
						</h4>

						<p className="mt-6 max-w-[760px] text-lg leading-8 text-[#585F6C]">
							Join over 10,000 developers building the future on Premium
							infrastructure.
						</p>

						<div className="mt-12 flex flex-col gap-4 sm:flex-row">
							<Button
								asChild
								size="lg"
								className="h-14 min-w-[240px] rounded-2xl px-8 font-heading text-base font-medium"
							>
								<Link href="/signup">Create Free Account</Link>
							</Button>

							<Button
								asChild
								size="lg"
								variant="outline"
								className="h-14 min-w-[240px] rounded-2xl border-[#CFC4C5] bg-white px-8 font-heading text-base font-medium"
							>
								<Link href="/sales">Talk to Sales</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}