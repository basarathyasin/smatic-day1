"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";

import { ThemeContext, type Theme } from "@/app/context/ThemeContext";

const THEME_STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";

type ThemeProviderProps = {
	children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
	const theme = useSyncExternalStore(
		subscribeToTheme,
		getThemeSnapshot,
		getServerThemeSnapshot,
	);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}

	return (
		<ThemeContext.Provider
			value={{
				theme,
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

function getServerThemeSnapshot(): Theme {
	return "light";
}

function getThemeSnapshot(): Theme {
	const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

	return storedTheme === "dark" || storedTheme === "light"
		? storedTheme
		: "light";
}

function subscribeToTheme(onStoreChange: () => void) {
	window.addEventListener("storage", onStoreChange);
	window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

	return () => {
		window.removeEventListener("storage", onStoreChange);
		window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
	};
}

function setTheme(theme: Theme) {
	localStorage.setItem(THEME_STORAGE_KEY, theme);
	window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}
