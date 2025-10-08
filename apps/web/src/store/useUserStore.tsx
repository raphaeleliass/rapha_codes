import { create } from "zustand";
import type { authClient } from "@/lib/auth-client";

type User = typeof authClient.$Infer.Session.user | null;

interface UserStore {
	user: User;
	setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
