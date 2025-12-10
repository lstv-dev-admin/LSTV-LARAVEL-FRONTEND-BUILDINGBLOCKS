import { create } from "zustand";
import { USER_ACTIVITY_LOGS_DEFAULT_FILTERS } from "../utils/constants";
import { IActivityUserLogsStore, IFilters } from "../types";

const defaultFilters = USER_ACTIVITY_LOGS_DEFAULT_FILTERS;

const useActivityUserLogsStore = create<IActivityUserLogsStore>((set) => ({
    // Filters
    filters: defaultFilters,
    setFilters: (filters: IFilters) => set({ filters }),

    clearFilters: () => set({ filters: defaultFilters }),
    resetFilters: () => set({ filters: defaultFilters }),

    // Dialog
    isDialogOpen: false,
    openDialog: () => set({ isDialogOpen: true }),
    closeDialog: () => set({ isDialogOpen: false }),
}));

export default useActivityUserLogsStore;