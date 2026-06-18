import { Check } from "lucide-react";
import { Card } from "@/components/ui/card/Card";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

export function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  popular,
}: PricingCardProps) {
  return (
    <Card
      className={popular ? "bg-black text-white border-black" : ""}
    >
      {popular && (
        <div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          Most Popular
        </div>
      )}

      <h3 className="font-heading text-2xl font-semibold">
        {title}
      </h3>

      <div className="mt-2 flex items-end gap-1">
        <span className="font-heading text-4xl">
          {price}
        </span>

        <span
          className={
            popular ? "text-zinc-400" : "text-zinc-500"
          }
        >
          /month
        </span>
      </div>

      <p
        className={`mt-4 ${
          popular ? "text-zinc-400" : "text-zinc-600"
        }`}
      >
        {description}
      </p>

      <ul className="my-8 space-y-4">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2"
          >
            <Check className="size-4" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={popular ? "secondary" : "outline"}
        width="full"
      >
        {buttonText}
      </Button>
    </Card>
  );
}