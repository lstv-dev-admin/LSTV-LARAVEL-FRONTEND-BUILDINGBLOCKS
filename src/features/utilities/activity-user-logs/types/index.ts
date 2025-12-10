import { IListQueryParams } from "@/features/shared";

export interface IUserActivityLog {
	record_count: number;
	log_date: string;
	log_time: string;
	user: string;
	activity: string;
	module: string;
	remarks: string;
}

export interface IUserActivityLogParams extends IListQueryParams {
    date_from?: string;
    date_to?: string;
    remarks?: string;
    activity?: string;
    user?: string;
}

export interface IFilters {
    date_from?: string;
    date_to?: string;
    remarks?: string;
    activity?: string;
    user?: string;
};

export interface IActivityUserLogsStore {
    // Filters
    filters: IFilters;
    setFilters: (filters: IFilters) => void;
    clearFilters: () => void;
    resetFilters: () => void;

    // Dialog
    isDialogOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}