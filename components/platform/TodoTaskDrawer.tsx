"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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

const todoTaskDrawerSchema = z.object({
	title: z.string().trim().min(1, "Title is required"),
	priority: z.enum(["low", "medium", "high"]),
	dueDate: z
		.string()
		.optional()
		.refine(
			(value) => !value || value >= getTodayDateValue(),
			"Date cannot be in the past",
		),
});

function getTodayDateValue() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function getInitialValues(
	defaultValues?: Partial<TodoTaskDrawerValues>,
): TodoTaskDrawerValues {
	return {
		title: defaultValues?.title ?? "",
		priority: defaultValues?.priority ?? "medium",
		dueDate: defaultValues?.dueDate,
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
	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
		reset,
	} = useForm<TodoTaskDrawerValues>({
		defaultValues: getInitialValues(defaultValues),
		resolver: zodResolver(todoTaskDrawerSchema),
	});

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			reset(getInitialValues(defaultValues));
		}
		onOpenChange(nextOpen);
	};

	const submitTask = (values: TodoTaskDrawerValues) => {
		onSubmit({
			...values,
			title: values.title.trim(),
			dueDate: values.dueDate || undefined,
		});
		reset(getInitialValues(defaultValues));
		onOpenChange(false);
	};

	return (
		<Drawer direction="right" open={open} onOpenChange={handleOpenChange}>
			<DrawerContent className={cn("w-[min(420px,92vw)]", classNames?.content)}>
				<form onSubmit={handleSubmit(submitTask)} className="flex h-full flex-col">
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
								placeholder={text.titlePlaceholder}
								autoFocus
								aria-invalid={Boolean(errors.title)}
								{...register("title")}
							/>
							{errors.title && (
								<p className="text-sm text-red-600">{errors.title.message}</p>
							)}
						</label>

						<Controller
							control={control}
							name="priority"
							render={({ field }) => (
								<TodoPrioritySelect
									value={field.value}
									onChange={field.onChange}
									options={priorityOptions}
									label={text.priorityLabel}
									className={classNames?.field}
								/>
							)}
						/>

						<Controller
							control={control}
							name="dueDate"
							render={({ field }) => (
								<TodoDatePicker
									value={field.value}
									onChange={field.onChange}
									copy={text.datePicker}
									className={classNames?.field}
									error={errors.dueDate?.message}
								/>
							)}
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
