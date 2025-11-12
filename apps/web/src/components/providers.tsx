"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/store/useUserStore";
import Navbar from "./layout/Navbar";
import { ThemeProvider } from "./theme-provider";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 60 * 1000 },
	},
});

export default function Providers({ children }: { children: React.ReactNode }) {
	const { setUser, user, setAuthLoading } = useUserStore();

	// biome-ignore lint: unnecessary add dependencies
	useEffect(() => {
		if (user) {
			setAuthLoading(false);
			return;
		}

		(async () => {
			try {
				const cookie = await fetch("/api/cookie");

				if (!cookie.ok) return;

				const { data } = await authClient.getSession();

				if (!data) return;

				setUser(data.user);
			} finally {
				setAuthLoading(false);
			}
		})();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<Navbar />

				{children}
				<Toaster richColors position="bottom-right" />
			</ThemeProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
