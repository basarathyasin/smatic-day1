"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type TodoDatePickerCopy = {
	label: string;
	placeholder: string;
	dialogTitle: string;
	clearButton: string;
	doneButton: string;
};

export type TodoDatePickerProps = {
	value?: string;
	onChange: (value: string | undefined) => void;
	copy?: Partial<TodoDatePickerCopy>;
	className?: string;
	buttonClassName?: string;
};

const defaultCopy: TodoDatePickerCopy = {
	label: "Due date",
	placeholder: "Pick a due date",
	dialogTitle: "Select due date",
	clearButton: "Clear",
	doneButton: "Done",
};

function parseDateValue(value?: string) {
	if (!value) return undefined;
	const [year, month, day] = value.split("-").map(Number);
	if (!year || !month || !day) return undefined;
	return new Date(year, month - 1, day);
}

function formatDateValue(date?: Date) {
	if (!date) return undefined;
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function TodoDatePicker({
	value,
	onChange,
	copy,
	className,
	buttonClassName,
}: TodoDatePickerProps) {
	const text = { ...defaultCopy, ...copy };
	const [open, setOpen] = React.useState(false);
	const selectedDate = parseDateValue(value);

	return (
		<div className={cn("space-y-2", className)}>
			<span className="block text-sm font-medium text-[#191C1D]">
				{text.label}
			</span>
			<Button
				type="button"
				variant="outline"
				className={cn(
					"h-8 w-full justify-between rounded-lg px-2.5 font-normal",
					!value && "text-muted-foreground",
					buttonClassName,
				)}
				onClick={() => setOpen(true)}
			>
				<span>{value || text.placeholder}</span>
				<CalendarIcon className="size-4" />
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="w-fit p-4" showCloseButton={false}>
					<DialogHeader>
						<DialogTitle>{text.dialogTitle}</DialogTitle>
					</DialogHeader>
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={(date) => onChange(formatDateValue(date))}
					/>
					<DialogFooter className="-mx-4 -mb-4">
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => onChange(undefined)}
						>
							{text.clearButton}
						</Button>
						<Button type="button" size="sm" onClick={() => setOpen(false)}>
							{text.doneButton}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
