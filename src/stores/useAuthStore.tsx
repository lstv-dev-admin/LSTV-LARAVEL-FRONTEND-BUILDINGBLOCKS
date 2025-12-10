// src/stores/useAuthStore.ts
import { create } from "zustand";
import { IAuthUser } from "@/features/auth/types";

interface IAuthState {
	user: IAuthUser | null;
	accessibleRoutes: string[];
	isSupervisor: boolean;
	navigate: ((path: string) => void) | null;

	setUser: (user: IAuthUser | null) => void;
	setAccessibleRoutes: (routes: string[]) => void;
	setNavigate: (navigateFn: (path: string) => void) => void;
	logout: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
	user: null,
	accessibleRoutes: [],
	isSupervisor: false,
	navigate: null,
	setUser: (user) => {
		set({
			user,
			isSupervisor: user?.user_type === "Supervisor",
		})
    },
	setAccessibleRoutes: (routes) => set({ accessibleRoutes: routes }),
	setNavigate: (navigateFn) => set({ navigate: navigateFn }),
	logout: () => {
		set({
			user: null,
			accessibleRoutes: [],
			isSupervisor: false,
		})
    },
}));