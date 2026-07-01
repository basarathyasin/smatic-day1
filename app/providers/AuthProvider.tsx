"use client";

import { useState, type ReactNode } from "react";

import { AuthContext, type AuthUser } from "@/app/context/AuthContext";

const CURRENT_USER_STORAGE_KEY = "currentUser";

type AuthProviderProps = {
	children: ReactNode;
};

export default function AuthProvider({
	children,
}: AuthProviderProps) {
	const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
		if (typeof window === "undefined") {
			return null;
		}

		return getStoredUser();
	});

	function login(user: AuthUser) {
		setCurrentUser(user);
		localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
	}

	function logout() {
		setCurrentUser(null);
		localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
	}

	const isAuthenticated = currentUser !== null;

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				isAuthenticated,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function getStoredUser(): AuthUser | null {
	const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);

	if (!storedUser) {
		return null;
	}

	try {
		const parsed = JSON.parse(storedUser) as Partial<AuthUser>;

		if (typeof parsed.name === "string" && typeof parsed.email === "string") {
			return {
				name: parsed.name,
				email: parsed.email,
			};
		}
	} catch {
		return null;
	}

	return null;
}
