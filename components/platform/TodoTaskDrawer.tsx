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
import {
	TodoDatePicker,
	type TodoDatePickerCopy,
} from "@/components/platform/TodoDatePicker";
import {
	TodoPrioritySelect,
	type TodoPriorityOption,
} from "@/components/platform/TodoPrioritySelect";
import { cn } from "@/lib/utils";
import type { TodoPriority } from "@/components/platform/TodoTable";

export type TodoTaskDrawerValues = {
	title: string;
	priority: TodoPriority;
	dueDate?: string;
};

export type TodoTaskDrawerCopy = {
	title: string;
	titleLabel: string;
	titlePlaceholder: string;
	priorityLabel: string;
	cancelButton: string;
	submitButton: string;
	datePicker?: Partial<TodoDatePickerCopy>;
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
	priorityOptions: TodoPriorityOption[];
	defaultValues?: Partial<TodoTaskDrawerValues>;
	classNames?: TodoTaskDrawerClassNames;
};

const defaultCopy: TodoTaskDrawerCopy = {
	title: "Add task",
	titleLabel: "Task title",
	titlePlaceholder: "Write the task title",
	priorityLabel: "Priority",
	cancelButton: "Cancel",
	submitButton: "Create task",
};

function getInitialValues(
	defaultValues?: Partial<TodoTaskDrawerValues>,
): TodoTaskDrawerValues {
	return {
		title: defaultValues?.title ?? "",
		priority: defaultValues?.priority ?? "medium",
		dueDate: defaultValues?.dueDate ?? "",
	};
}

export function TodoTaskDrawer({
	open,
	onOpenChange,
	onSubmit,
	copy,
	priorityOptions,
	defaultValues,
	classNames,
}: TodoTaskDrawerProps) {
	const text = { ...defaultCopy, ...copy };
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

						<TodoPrioritySelect
							value={values.priority}
							onChange={(priority) => updateValue("priority", priority)}
							options={priorityOptions}
							label={text.priorityLabel}
							className={classNames?.field}
						/>

						<TodoDatePicker
							value={values.dueDate}
							onChange={(dueDate) => updateValue("dueDate", dueDate)}
							copy={text.datePicker}
							className={classNames?.field}
						/>
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
