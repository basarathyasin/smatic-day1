"use client";

import * as React from "react";
import { Check, Pencil, Plus, Save, Search, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
	statusOptions?: Array<{ label: string; value: TodoStatus }>;
	priorityOptions?: Array<{ label: string; value: TodoPriority }>;
	visibleColumns?: Array<
		"task" | "status" | "priority" | "dueDate" | "actions"
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

const defaultStatusOptions: NonNullable<TodoTableProps["statusOptions"]> = [
	{ label: "Todo", value: "todo" },
	{ label: "In progress", value: "in-progress" },
	{ label: "Done", value: "done" },
];

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
	"task",
	"status",
	"priority",
	"dueDate",
	"actions",
];

function createTodo(values: TodoTaskDrawerValues): TodoItem {
	return {
		id: `todo-${Date.now()}`,
		title: values.title,
		status: values.status,
		priority: values.priority,
		dueDate: values.dueDate,
	};
}

export function TodoTable({
	initialTodos = defaultTodos,
	copy,
	statusOptions = defaultStatusOptions,
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
	const [editingTitle, setEditingTitle] = React.useState("");

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

	const startEditing = (todo: TodoItem) => {
		setEditingId(todo.id);
		setEditingTitle(todo.title);
	};

	const saveEditing = () => {
		if (!editingId) return;
		const title = editingTitle.trim();
		if (!title) return;
		updateTodo(editingId, { title });
		setEditingId(null);
		setEditingTitle("");
	};

	const cancelEditing = () => {
		setEditingId(null);
		setEditingTitle("");
	};

	return (
		<section className={cn("space-y-5", classNames?.root)}>
			<TodoTaskDrawer
				open={isCreateOpen}
				onOpenChange={setIsCreateOpen}
				onSubmit={addTodo}
				copy={text.drawer}
				statusOptions={statusOptions}
				priorityOptions={priorityOptions}
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
							{columns.has("task") && (
								<TableHead className="min-w-[260px] px-4">Task</TableHead>
							)}
							{columns.has("status") && <TableHead>Status</TableHead>}
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
								const isEditing = editingId === todo.id;

								return (
									<TableRow key={todo.id} className={classNames?.row}>
										{columns.has("task") && (
											<TableCell className="px-4">
												{isEditing ? (
													<Input
														value={editingTitle}
														onChange={(event) =>
															setEditingTitle(event.target.value)
														}
														onKeyDown={(event) => {
															if (event.key === "Enter") saveEditing();
															if (event.key === "Escape") cancelEditing();
														}}
														autoFocus
													/>
												) : (
													<span
														className={cn(
															"font-medium text-[#191C1D]",
															todo.status === "done" &&
																"text-muted-foreground line-through",
														)}
													>
														{todo.title}
													</span>
												)}
											</TableCell>
										)}

										{columns.has("status") && (
											<TableCell>
												<select
													value={todo.status}
													onChange={(event) =>
														updateTodo(todo.id, {
															status: event.target.value as TodoStatus,
														})
													}
													className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
												>
													{statusOptions.map((option) => (
														<option key={option.value} value={option.value}>
															{option.label}
														</option>
													))}
												</select>
											</TableCell>
										)}

										{columns.has("priority") && (
											<TableCell>
												<select
													value={todo.priority}
													onChange={(event) =>
														updateTodo(todo.id, {
															priority: event.target.value as TodoPriority,
														})
													}
													className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm capitalize"
												>
													{priorityOptions.map((option) => (
														<option key={option.value} value={option.value}>
															{option.label}
														</option>
													))}
												</select>
											</TableCell>
										)}

										{columns.has("dueDate") && (
											<TableCell>
												<Input
													type="date"
													value={todo.dueDate ?? ""}
													onChange={(event) =>
														updateTodo(todo.id, { dueDate: event.target.value })
													}
													className="w-40"
												/>
											</TableCell>
										)}

										{columns.has("actions") && (
											<TableCell className="text-right">
												<div className="flex justify-end gap-1">
													{isEditing ? (
														<>
															<Button
																type="button"
																size="icon-xs"
																onClick={saveEditing}
																aria-label="Save task"
															>
																<Save className="size-4" />
															</Button>
															<Button
																type="button"
																size="icon-xs"
																variant="ghost"
																onClick={cancelEditing}
																aria-label="Cancel editing"
															>
																<X className="size-4" />
															</Button>
														</>
													) : (
														<>
															<Button
																type="button"
																size="icon-xs"
																variant="ghost"
																onClick={() =>
																	updateTodo(todo.id, {
																		status:
																			todo.status === "done" ? "todo" : "done",
																	})
																}
																aria-label={
																	todo.status === "done"
																		? "Mark task todo"
																		: "Mark task done"
																}
															>
																<Check className="size-4" />
															</Button>
															<Button
																type="button"
																size="icon-xs"
																variant="ghost"
																onClick={() => startEditing(todo)}
																aria-label="Edit task"
															>
																<Pencil className="size-4" />
															</Button>
															<Button
																type="button"
																size="icon-xs"
																variant="ghost"
																onClick={() => deleteTodo(todo.id)}
																aria-label="Delete task"
															>
																<Trash2 className="size-4" />
															</Button>
														</>
													)}
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
