import { FeatureCard } from "@/components/ui/card/FeatureCard";
import { PricingCard } from "@/components/ui/card/PricingCard";
import { TestimonialCard } from "@/components/ui/card/TestimonialCard";
import { Brain } from "lucide-react";
import React from "react";

export default function Features() {
	return (
		<>
			<FeatureCard
				icon={Brain}
				title="AI Orchestration"
				description="Automated resource allocation and predictive scaling."
			/>
			<TestimonialCard
				quote="Premium changed how we think about scale."
				name="Sarah Chen"
				role="CTO, Acme"
			/>
			<PricingCard
				title="Starter"
				price="$19"
				description="Perfect for side projects."
				features={["Unlimited projects", "Analytics", "Email support"]}
				buttonText="Get Started"
			/>
		</>
	);
}
