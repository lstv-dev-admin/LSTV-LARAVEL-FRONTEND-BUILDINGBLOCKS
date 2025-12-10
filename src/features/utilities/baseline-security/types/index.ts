import { BaselineSecurityFormData } from "../schemas";

export interface IBaselineSecurity {
    is_minimum_password_length_enabled: number;
    minimum_password_length: number;
    is_maximum_password_length_enabled: number;
    maximum_password_length: number;
    is_minimum_lowercase_required_enabled: number;
    minimum_lowercase_required: number;
    is_minimum_uppercase_required_enabled: number;
    minimum_uppercase_required: number;
    is_minimum_numeric_required_enabled: number;
    minimum_numeric_required: number;
    is_minimum_special_char_required_enabled: number;
    minimum_special_char_required: number;
    is_maximum_login_attempts_enabled: number;
    maximum_login_attempts: number;
    is_idle_logout_time_enabled: number;
    idle_logout_time: number;
    is_admin_password_expire_after_enabled: number;
    admin_password_expire_after: number;
    is_user_password_expire_after_enabled: number;
    user_password_expire_after: number;
    is_remind_password_expiration_enabled: number;
    remind_password_expiration_after: number;
    is_disable_unused_accounts_after_enabled: number;
    disable_unused_accounts_after: number;
    is_restrict_username_as_password: number;
    is_restrict_sequential_char_as_password: number;
    is_restrict_repetitive_char_as_password: number;
    is_force_login_allowed: number;
    do_lock_account_on_dual_login: number;
}

export interface IFormattedSecurityParameter {
	key: string;
	description: string;
	toggle_field?: keyof BaselineSecurityFormData;
	value_field?: keyof BaselineSecurityFormData;
	icon?: boolean;
	tab?: 'password-settings' | 'login-configuration';
};