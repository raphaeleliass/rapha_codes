"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";
import fetchAllPosts from "@/actions/fetchAllPosts";
import { authClient } from "@/lib/auth-client";
import { usePostStore } from "@/store/usePostStore";
import { useUserStore } from "@/store/useUserStore";
import Navbar from "./layout/Navbar";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	const { setUser, user } = useUserStore();
	const { setPosts } = usePostStore();
	// biome-ignore lint: not necessary include user at array of dependencies
	useEffect(() => {
		if (user) return;

		(async () => {
			const cookie = await fetch("/api/get-cookie");

			if (!cookie.ok) return;

			const { data } = await authClient.getSession();

			if (data?.user) setUser(data.user);
		})();
	}, [setUser]);

	useEffect(() => {
		(async () => {
			const postsData = await fetchAllPosts();

			setPosts(postsData);
		})();
	}, []);

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<Navbar />

			{children}
			<Toaster richColors position="top-center" />
		</ThemeProvider>
	);
}
