// Features
import { IMenuItem } from '@/features/shared/types';

// Libs
import { create } from 'zustand';

interface IMenuState {
	menuTree: IMenuItem[];
	isLoading: boolean;
	isFetching: boolean;
	isError: boolean;
	setMenuTree: (menuTree: IMenuItem[]) => void;
	setLoadingState: (isLoading: boolean, isFetching: boolean, isError: boolean) => void;
}

export const useMenuStore = create<IMenuState>((set) => ({
	menuTree: [],
	isLoading: false,
	isFetching: false,
	isError: false,
	setMenuTree: (menuTree) => set({ menuTree }),
	setLoadingState: (isLoading, isFetching, isError) => set({ isLoading, isFetching, isError }),
}));
