"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import type { TodoPriority } from "@/components/platform/TodoTable";

export type TodoPriorityOption = {
	label: string;
	value: TodoPriority;
};

export type TodoPrioritySelectProps = {
	value: TodoPriority;
	onChange: (value: TodoPriority) => void;
	options: TodoPriorityOption[];
	label?: string;
	className?: string;
	selectClassName?: string;
};

export function TodoPrioritySelect({
	value,
	onChange,
	options,
	label = "Priority",
	className,
	selectClassName,
}: TodoPrioritySelectProps) {
	return (
		<label className={cn("block space-y-2", className)}>
			<span className="text-sm font-medium text-[#191C1D]">{label}</span>
			<select
				value={value}
				onChange={(event) => onChange(event.target.value as TodoPriority)}
				className={cn(
					"h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
					selectClassName,
				)}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	);
}
