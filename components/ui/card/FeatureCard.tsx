import { Card } from "@/components/ui/card/Card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card>
      <Icon className="size-6" />

      <h3 className="font-heading pt-3 text-2xl font-semibold tracking-tight">
        {title}
      </h3>

      <p className="text-sm leading-5 text-zinc-600">
        {description}
      </p>
    </Card>
  );
}