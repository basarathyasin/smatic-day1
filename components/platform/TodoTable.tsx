"use client";

import * as React from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	TodoDeleteConfirmDialog,
	type TodoDeleteConfirmDialogCopy,
} from "@/components/platform/TodoDeleteConfirmDialog";
import {
	TodoTaskDrawer,
	type TodoTaskDrawerCopy,
	type TodoTaskDrawerValues,
} from "@/components/platform/TodoTaskDrawer";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type TodoStatus = "todo" | "in-progress" | "done";
export type TodoPriority = "low" | "medium" | "high";

export type TodoItem = {
	id: string;
	title: string;
	status: TodoStatus;
	priority: TodoPriority;
	dueDate?: string;
};

export type TodoTableCopy = {
	title: string;
	subtitle: string;
	searchPlaceholder: string;
	emptyTitle: string;
	emptyDescription: string;
	addButton: string;
	drawer?: Partial<TodoTaskDrawerCopy>;
	editDrawer?: Partial<TodoTaskDrawerCopy>;
	deleteDialog?: Partial<TodoDeleteConfirmDialogCopy>;
};

export type TodoTableClassNames = {
	root?: string;
	header?: string;
	tableShell?: string;
	row?: string;
};

export type TodoTableProps = {
	initialTodos?: TodoItem[];
	copy?: Partial<TodoTableCopy>;
	priorityOptions?: Array<{ label: string; value: TodoPriority }>;
	visibleColumns?: Array<
		"completed" | "task" | "priority" | "dueDate" | "actions"
	>;
	classNames?: TodoTableClassNames;
	onTodosChange?: (todos: TodoItem[]) => void;
};

const defaultCopy: TodoTableCopy = {
	title: "Tasks",
	subtitle: "Create, update, complete, and remove your to-dos.",
	searchPlaceholder: "Search tasks...",
	emptyTitle: "No tasks yet",
	emptyDescription: "Add your first task to start organizing the day.",
	addButton: "Add task",
};

const defaultPriorityOptions: NonNullable<TodoTableProps["priorityOptions"]> = [
	{ label: "Low", value: "low" },
	{ label: "Medium", value: "medium" },
	{ label: "High", value: "high" },
];

const defaultTodos: TodoItem[] = [
	{
		id: "todo-1",
		title: "Plan dashboard states",
		status: "todo",
		priority: "high",
		dueDate: "2026-06-25",
	},
	{
		id: "todo-2",
		title: "Review task table interactions",
		status: "in-progress",
		priority: "medium",
		dueDate: "2026-06-26",
	},
	{
		id: "todo-3",
		title: "Ship first usable to-do flow",
		status: "done",
		priority: "low",
		dueDate: "2026-06-27",
	},
];

const defaultVisibleColumns: NonNullable<TodoTableProps["visibleColumns"]> = [
	"completed",
	"task",
	"priority",
	"dueDate",
	"actions",
];

function createTodo(values: TodoTaskDrawerValues): TodoItem {
	return {
		id: `todo-${Date.now()}`,
		title: values.title,
		status: "todo",
		priority: values.priority,
		dueDate: values.dueDate,
	};
}

export function TodoTable({
	initialTodos = defaultTodos,
	copy,
	priorityOptions = defaultPriorityOptions,
	visibleColumns = defaultVisibleColumns,
	classNames,
	onTodosChange,
}: TodoTableProps) {
	const text = { ...defaultCopy, ...copy };
	const [todos, setTodos] = React.useState<TodoItem[]>(initialTodos);
	const [query, setQuery] = React.useState("");
	const [isCreateOpen, setIsCreateOpen] = React.useState(false);
	const [editingId, setEditingId] = React.useState<string | null>(null);
	const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
		null,
	);

	const columns = React.useMemo(
		() => new Set(visibleColumns),
		[visibleColumns],
	);

	const updateTodos = React.useCallback(
		(nextTodos: TodoItem[]) => {
			setTodos(nextTodos);
			onTodosChange?.(nextTodos);
		},
		[onTodosChange],
	);

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(query.trim().toLowerCase()),
	);

	const editingTodo = todos.find((todo) => todo.id === editingId);
	const deleteTarget = todos.find((todo) => todo.id === deleteTargetId);

	const editDrawerValues = React.useMemo(
		() =>
			editingTodo
				? {
						title: editingTodo.title,
						priority: editingTodo.priority,
						dueDate: editingTodo.dueDate,
					}
				: undefined,
		[editingTodo],
	);

	const addTodo = (values: TodoTaskDrawerValues) => {
		updateTodos([createTodo(values), ...todos]);
	};

	const updateTodo = (id: string, patch: Partial<TodoItem>) => {
		updateTodos(
			todos.map((todo) => (todo.id === id ? { ...todo, ...patch } : todo)),
		);
	};

	const deleteTodo = (id: string) => {
		updateTodos(todos.filter((todo) => todo.id !== id));
	};

	const editTodo = (values: TodoTaskDrawerValues) => {
		if (!editingTodo) return;
		updateTodo(editingTodo.id, {
			title: values.title,
			priority: values.priority,
			dueDate: values.dueDate,
		});
		setEditingId(null);
	};

	const confirmDelete = () => {
		if (!deleteTarget) return;
		deleteTodo(deleteTarget.id);
		setDeleteTargetId(null);
	};

	const handleEditDrawerOpenChange = (open: boolean) => {
		if (!open) {
			setEditingId(null);
		}
	};

	const getPriorityLabel = (priority: TodoPriority) =>
		priorityOptions.find((option) => option.value === priority)?.label ?? priority;

	return (
		<section className={cn("space-y-5", classNames?.root)}>
			<TodoTaskDrawer
				open={isCreateOpen}
				onOpenChange={setIsCreateOpen}
				onSubmit={addTodo}
				copy={text.drawer}
				priorityOptions={priorityOptions}
			/>
			<TodoTaskDrawer
				key={editingTodo?.id ?? "edit-task-drawer"}
				open={Boolean(editingTodo)}
				onOpenChange={handleEditDrawerOpenChange}
				onSubmit={editTodo}
				copy={{
					title: "Edit task",
					submitButton: "Save task",
					...text.editDrawer,
				}}
				priorityOptions={priorityOptions}
				defaultValues={editDrawerValues}
			/>
			<TodoDeleteConfirmDialog
				open={Boolean(deleteTarget)}
				onOpenChange={(open) => {
					if (!open) {
						setDeleteTargetId(null);
					}
				}}
				onConfirm={confirmDelete}
				taskTitle={deleteTarget?.title}
				copy={text.deleteDialog}
			/>

			<div
				className={cn(
					"flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
					classNames?.header,
				)}
			>
				<div>
					<h2 className="font-heading text-2xl font-semibold text-[#191C1D]">
						{text.title}
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">{text.subtitle}</p>
				</div>

				<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
					<div className="relative sm:w-64">
						<Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder={text.searchPlaceholder}
							className="pl-8"
						/>
					</div>

					<Button
						type="button"
						size="sm"
						onClick={() => setIsCreateOpen(true)}
						className="gap-2"
					>
						<Plus className="size-4" />
						{text.addButton}
					</Button>
				</div>
			</div>

			<div
				className={cn(
					"overflow-hidden rounded-xl border bg-white",
					classNames?.tableShell,
				)}
			>
				<Table>
					<TableHeader>
						<TableRow>
							{columns.has("completed") && (
								<TableHead className="w-12 px-4">Done</TableHead>
							)}
							{columns.has("task") && (
								<TableHead className="min-w-[260px] px-4">Task</TableHead>
							)}
							{columns.has("priority") && <TableHead>Priority</TableHead>}
							{columns.has("dueDate") && <TableHead>Due date</TableHead>}
							{columns.has("actions") && (
								<TableHead className="w-[152px] text-right">Actions</TableHead>
							)}
						</TableRow>
					</TableHeader>

					<TableBody>
						{filteredTodos.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={visibleColumns.length}
									className="h-40 text-center"
								>
									<div>
										<p className="font-medium text-[#191C1D]">
											{text.emptyTitle}
										</p>
										<p className="mt-1 text-sm text-muted-foreground">
											{text.emptyDescription}
										</p>
									</div>
								</TableCell>
							</TableRow>
						) : (
							filteredTodos.map((todo) => {
								return (
									<TableRow key={todo.id} className={classNames?.row}>
										{columns.has("completed") && (
											<TableCell className="px-4">
												<input
													type="checkbox"
													checked={todo.status === "done"}
													onChange={(event) =>
														updateTodo(todo.id, {
															status: event.target.checked ? "done" : "todo",
														})
													}
													aria-label={
														todo.status === "done"
															? "Mark task todo"
															: "Mark task done"
													}
													className="size-4 rounded border-input accent-[#191C1D]"
												/>
											</TableCell>
										)}

										{columns.has("task") && (
											<TableCell className="px-4">
												<span
													className={cn(
														"font-medium text-[#191C1D]",
														todo.status === "done" &&
															"text-muted-foreground line-through",
													)}
												>
													{todo.title}
												</span>
											</TableCell>
										)}

										{columns.has("priority") && (
											<TableCell>
												<span className="text-sm text-[#191C1D]">
													{getPriorityLabel(todo.priority)}
												</span>
											</TableCell>
										)}

										{columns.has("dueDate") && (
											<TableCell>
												<span className="text-sm text-[#191C1D]">
													{todo.dueDate || "No date"}
												</span>
											</TableCell>
										)}

										{columns.has("actions") && (
											<TableCell className="text-right">
												<div className="ml-auto flex w-fit items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-1">
													<Button
														type="button"
														size="icon-xs"
														variant="secondary"
														className="size-9 rounded-lg border border-[#93C5FD] bg-[#DBEAFE] p-2 text-[#075985] shadow-none hover:bg-[#BFDBFE]"
														onClick={() => setEditingId(todo.id)}
														aria-label="Edit task"
													>
														<Pencil className="size-4" />
													</Button>
													<Button
														type="button"
														size="icon-xs"
														variant="destructive"
														className="size-9 rounded-lg border border-[#FCA5A5] bg-[#FEE2E2] p-2 text-[#B91C1C] shadow-none hover:bg-[#FECACA]"
														onClick={() => setDeleteTargetId(todo.id)}
														aria-label="Delete task"
													>
														<Trash2 className="size-4" />
													</Button>
												</div>
											</TableCell>
										)}
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</div>
		</section>
	);
}
