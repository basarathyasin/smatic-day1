import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface HeroProps {
	badge?: string;
	title: string;
	description: string;
	image: string;

	primaryAction?: {
		label: string;
		href: string;
	};

	secondaryAction?: {
		label: string;
		href: string;
	};
}

export default function Hero({
	badge = "NOW AVAILABLE",
	title,
	description,
	image,
	primaryAction,
	secondaryAction,
}: HeroProps) {
	return (
		<section className="flex flex-col items-center py-8 md:px-8 md:py-10">
			<div className="mb-6">
				<div className="inline-flex items-center gap-2 rounded-full bg-[#E7E8E9] px-3 py-1">
					<div className="size-2 rounded-full bg-black" />

					<span className="font-heading text-xs font-semibold tracking-[0.05em] text-[#4C4546]">
						{badge}
					</span>
				</div>
			</div>

			<div className="max-w-[896px]">
				<h1 className="text-center font-heading text-[36px] font-bold leading-[44px] text-black md:text-[48px] md:leading-[56px]">
					{title}
				</h1>
			</div>

			<div className="mt-4 max-w-[672px]">
				<p className="text-center font-light text-[16px] leading-7 text-[#585F6C]">
					{description}
				</p>
			</div>

			{(primaryAction || secondaryAction) && (
				<div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row md:mt-12">
					{primaryAction && (
						<Button asChild size="default">
							<Link href={primaryAction.href}>{primaryAction.label}</Link>
						</Button>
					)}

					{secondaryAction && (
						<Button asChild variant="outline">
							<Link href={secondaryAction.href}>{secondaryAction.label}</Link>
						</Button>
					)}
				</div>
			)}

			<div className="relative mt-12 w-full md:mt-20">
				<div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/5 to-transparent blur-xl" />

				<div className="relative overflow-hidden rounded-2xl border border-[#CFC4C580] bg-white p-2 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)] sm:p-4">
					<Image
						src={image}
						alt={title}
						width={1080}
						height={642}
						priority
						className="h-auto w-full rounded-xl object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
