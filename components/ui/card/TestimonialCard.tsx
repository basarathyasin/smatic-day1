import { Card } from "@/components/ui/card/Card";
import Image, { type StaticImageData } from "next/image";

interface TestimonialCardProps {
	quote: string;
	name: string;
	role: string;
	avatar?: StaticImageData | string;
}

export function TestimonialCard({
	quote,
	name,
	role,
	avatar,
}: TestimonialCardProps) {
	return (
		<Card className="flex min-h-[252px] flex-col justify-between p-10">
			<p className="max-w-[460px] text-[22px] font-semibold leading-8 tracking-[-0.48px] text-[#191C1D]">
				&quot;{quote}&quot;
			</p>

			<div className="flex items-center gap-4">
				<div className="size-12 overflow-hidden rounded-full bg-zinc-200 font-heading">
					{avatar && (
						<Image
							src={avatar}
							alt={`${name} profile photo`}
							width={100}
							height={100}
							sizes="48px"
							className="h-full w-full object-cover"
						/>
					)}
				</div>

				<div>
					<div className="font-heading text-base">{name}</div>

					<div className="text-sm text-[#585F6C]">{role}</div>
				</div>
			</div>
		</Card>
	);
}
