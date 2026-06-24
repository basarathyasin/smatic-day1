"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { TodoPriority, TodoStatus } from "@/components/platform/TodoTable";

export type TodoTaskDrawerValues = {
	title: string;
	status: TodoStatus;
	priority: TodoPriority;
	dueDate?: string;
};

export type TodoTaskDrawerCopy = {
	title: string;
	titleLabel: string;
	titlePlaceholder: string;
	statusLabel: string;
	priorityLabel: string;
	dueDateLabel: string;
	cancelButton: string;
	submitButton: string;
};

export type TodoTaskDrawerClassNames = {
	content?: string;
	field?: string;
	footer?: string;
};

export type TodoTaskDrawerProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (values: TodoTaskDrawerValues) => void;
	copy?: Partial<TodoTaskDrawerCopy>;
	statusOptions: Array<{ label: string; value: TodoStatus }>;
	priorityOptions: Array<{ label: string; value: TodoPriority }>;
	defaultValues?: Partial<TodoTaskDrawerValues>;
	classNames?: TodoTaskDrawerClassNames;
};

const defaultCopy: TodoTaskDrawerCopy = {
	title: "Add task",
	titleLabel: "Task title",
	titlePlaceholder: "Write the task title",
	statusLabel: "Status",
	priorityLabel: "Priority",
	dueDateLabel: "Due date",
	cancelButton: "Cancel",
	submitButton: "Create task",
};

function getInitialValues(
	defaultValues?: Partial<TodoTaskDrawerValues>,
): TodoTaskDrawerValues {
	return {
		title: defaultValues?.title ?? "",
		status: defaultValues?.status ?? "todo",
		priority: defaultValues?.priority ?? "medium",
		dueDate: defaultValues?.dueDate ?? "",
	};
}

export function TodoTaskDrawer({
	open,
	onOpenChange,
	onSubmit,
	copy,
	statusOptions,
	priorityOptions,
	defaultValues,
	classNames,
}: TodoTaskDrawerProps) {
	const text = { ...defaultCopy, ...copy };
	const dueDateInputRef = React.useRef<HTMLInputElement>(null);
	const [values, setValues] = React.useState<TodoTaskDrawerValues>(() =>
		getInitialValues(defaultValues),
	);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			setValues(getInitialValues(defaultValues));
		}
		onOpenChange(nextOpen);
	};

	const updateValue = <Key extends keyof TodoTaskDrawerValues>(
		key: Key,
		value: TodoTaskDrawerValues[Key],
	) => {
		setValues((current) => ({ ...current, [key]: value }));
	};

	const submitTask = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const title = values.title.trim();
		if (!title) return;

		onSubmit({
			...values,
			title,
			dueDate: values.dueDate || undefined,
		});
		setValues(getInitialValues(defaultValues));
		onOpenChange(false);
	};

	const openDatePicker = () => {
		const input = dueDateInputRef.current;
		if (!input) return;

		input.focus();
		if (typeof input.showPicker === "function") {
			input.showPicker();
		}
	};

	return (
		<Drawer direction="right" open={open} onOpenChange={handleOpenChange}>
			<DrawerContent className={cn("w-[min(420px,92vw)]", classNames?.content)}>
				<form onSubmit={submitTask} className="flex h-full flex-col">
					<DrawerHeader className="border-b px-5 py-5 text-left">
						<DrawerTitle className="text-lg font-semibold">
							{text.title}
						</DrawerTitle>
					</DrawerHeader>

					<div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
						<label className={cn("block space-y-2", classNames?.field)}>
							<span className="text-sm font-medium text-[#191C1D]">
								{text.titleLabel}
							</span>
							<Input
								value={values.title}
								onChange={(event) => updateValue("title", event.target.value)}
								placeholder={text.titlePlaceholder}
								autoFocus
							/>
						</label>

						<div className="grid gap-4 sm:grid-cols-2">
							<label className={cn("block space-y-2", classNames?.field)}>
								<span className="text-sm font-medium text-[#191C1D]">
									{text.statusLabel}
								</span>
								<select
									value={values.status}
									onChange={(event) =>
										updateValue("status", event.target.value as TodoStatus)
									}
									className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
								>
									{statusOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</label>

							<label className={cn("block space-y-2", classNames?.field)}>
								<span className="text-sm font-medium text-[#191C1D]">
									{text.priorityLabel}
								</span>
								<select
									value={values.priority}
									onChange={(event) =>
										updateValue("priority", event.target.value as TodoPriority)
									}
									className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
								>
									{priorityOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</label>
						</div>

						<label className={cn("block space-y-2", classNames?.field)}>
							<span className="text-sm font-medium text-[#191C1D]">
								{text.dueDateLabel}
							</span>
							<Input
								ref={dueDateInputRef}
								type="date"
								value={values.dueDate ?? ""}
								onChange={(event) => updateValue("dueDate", event.target.value)}
								onClick={openDatePicker}
							/>
						</label>
					</div>

					<DrawerFooter
						className={cn("border-t p-5 sm:flex-row", classNames?.footer)}
					>
						<DrawerClose asChild>
							<Button type="button" variant="outline" className="sm:flex-1">
								{text.cancelButton}
							</Button>
						</DrawerClose>
						<Button type="submit" className="sm:flex-1">
							{text.submitButton}
						</Button>
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	);
}
