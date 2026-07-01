"use client";

import { useAuth } from "@/hooks/useAuth";

export function UserInitial() {
	const { currentUser } = useAuth();

	if (!currentUser) {
		return null;
	}

	const initial = currentUser.name.trim().charAt(0).toUpperCase();

	return (
		<div
			aria-label={`${currentUser.name} profile`}
			className="flex size-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black font-heading text-sm font-semibold text-white shadow-sm dark:border-white/15 dark:bg-white dark:text-black"
			title={currentUser.name}
		>
			{initial}
		</div>
	);
}
