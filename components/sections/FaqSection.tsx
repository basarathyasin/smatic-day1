import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		question: "How does migration work?",
		answer:
			"Our migration team handles the entire process, ensuring a smooth transition with minimal downtime.",
	},
	{
		question: "Is there a limit on bandwidth?",
		answer:
			"Bandwidth depends on your plan. Enterprise customers can request custom limits.",
	},
	{
		question: "Can we self-host PREMIUM?",
		answer:
			"Yes. Enterprise plans support self-hosted deployments with dedicated infrastructure.",
	},
];

export default function FaqSection() {
	return (
		<section className="px-12 py-[160px]">
			<div className="mx-auto max-w-[1184px]">
				<h2 className="mb-20 text-center font-heading text-[34px] font-semibold tracking-[-1.28px] text-[#191C1D]">
					Frequently Asked Questions
				</h2>

				<Accordion
					type="single"
					collapsible
					className="flex pl-40 pr-20"
				>
					{faqs.map((faq) => (
						<AccordionItem
							key={faq.question}
							value={faq.question}
							className="border-b border-[#CFC4C5]"
						>
							<AccordionTrigger className="py-10 text-left font-heading text-[24px] font-normal leading-8 text-[#191C1D] hover:no-underline">
								{faq.question}
							</AccordionTrigger>

							<AccordionContent className="pb-8 pr-12 text-base leading-7 text-[#585F6C]">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}