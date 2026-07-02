"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { ThemeContext, type Theme } from "@/app/context/ThemeContext";

const THEME_STORAGE_KEY = "theme";

type ThemeProviderProps = {
	children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>("light");
	const hasLoadedStoredTheme = useRef(false);

	useEffect(() => {
		const frame = window.requestAnimationFrame(() => {
			hasLoadedStoredTheme.current = true;
			setTheme(getStoredTheme());
		});

		return () => window.cancelAnimationFrame(frame);
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");

		if (hasLoadedStoredTheme.current) {
			localStorage.setItem(THEME_STORAGE_KEY, theme);
		}
	}, [theme]);

	function toggleTheme() {
		hasLoadedStoredTheme.current = true;
		setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
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

function getStoredTheme(): Theme {
	const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

	return storedTheme === "dark" || storedTheme === "light"
		? storedTheme
		: "light";
}
