"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export function AuthRedirect() {
	const { currentUser } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (currentUser) {
			router.replace("/dashboard");
		}
	}, [currentUser, router]);

	return null;
}
