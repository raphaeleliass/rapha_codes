import { create } from "zustand";
import type { authClient } from "@/lib/auth-client";

type User = typeof authClient.$Infer.Session.user | null;

interface UserStore {
	user: User;
	isAuthLoading: boolean;
	setUser: (user: User) => void;
	setAuthLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	isAuthLoading: true,
	setUser: (user) => set({ user }),
	setAuthLoading: (isLoading) => set({ isAuthLoading: isLoading }),
}));
