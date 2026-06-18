import { Card } from "@/components/ui/card/Card";
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  avatar,
}: TestimonialCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between p-10">
      <p className="font-heading text-2xl leading-8 font-semibold tracking-tight">
        &quot;{quote}&quot;
      </p>

      <div className="flex items-center gap-4">
        <div className="size-12 rounded-full bg-zinc-200 overflow-hidden">
          {avatar && (
            <Image
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div>
          <div className="font-heading text-base">
            {name}
          </div>

          <div className="text-sm text-zinc-600">
            {role}
          </div>
        </div>
      </div>
    </Card>
  );
}