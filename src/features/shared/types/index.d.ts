export interface IApiAction {
    label?: string;
	type?: string;
    icon?: string;
	position?: 'header' | 'side';
}

export interface IListApiResponse<T> {
	status: boolean;
	message: string;
	data: {
		items: T[];
		items_per_page: number;
		total_pages: number;
		current_page: number;
		next_page?: number;
		previous_page?: number;
		has_next_page: boolean;
		has_previous_page: boolean;
		actions?: IApiAction[];
	};
}

export interface IBaseResponse<T> {
    status: boolean;
    message: string;
    data: T;
}

export interface IMutationResponse<T> {
    status: boolean;
    message: 'Users received.',
    data: T,
}

export interface IListQueryParams {
    page?: number;
    per_page?: number;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    search?: string;
}

export interface IMenuItem {
	code: string;
	name: string;
	icon: string;
	parent_code: string | null;
	path: string | null;
	children: IMenuItem[];
}

export interface ApiMenuItem {
	code: string;
	name: string;
	icon: string | null;
	parent_code: string | null;
	path: string | null;
	actions: Array<{
		id: number;
		menu_item_id: number | string;
		action_name: string;
		action_label?: string;
		label?: string;
		icon?: string;
		display_order: number | null;
	}>;
	children: ApiMenuItem[];
}

export interface SelectFieldOption {
	value: string;
	label: string;
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface UseSelectFieldOptionsParams {
	endpoint: string;
	queryKey: string;
	valueField?: string;
	labelField?: string;
	queryParams?: IListQueryParams;
	transformResponse?: (data: Record<string, JsonValue>[]) => SelectFieldOption[];
}
