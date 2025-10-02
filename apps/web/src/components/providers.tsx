"use client";

import Navbar from "./layout/Navbar";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<Navbar />
			{children}
		</ThemeProvider>
	);
}
