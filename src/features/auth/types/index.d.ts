export interface IAuthUser {
	user_id: string;
	username: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	email: string | null;
	user_type: string;
	is_active: number;
	is_locked: number;
	is_developer: number;
	last_login: string | null;
	created_at: string;
}

export interface IAuthMeResponse {
	user: IAuthUser;
	accessible_routes: string[];
}

