export interface IUserFiles {
    record_id: number;
    user_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    username: string; 
    email: string;
    email_verified_at?: string;
    is_active: number;
    user_type: number;
    is_developer: number; 
}

export interface IUserType {
    id: number;
    name: string;
}

export interface IUserStatus {
    id: number;
    name: string;
}

export interface MenuItem {
	code: string;
	name: string;
	icon: string | null;
	parent_code: string | null;
	path: string | null;
	actions: Array<{
		id: number;
		label: string;
		icon: string;
		type: string;
		position: string;
	}>;
	children: MenuItem[];
}
