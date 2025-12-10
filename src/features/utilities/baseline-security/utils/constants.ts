import { IFormattedSecurityParameter } from "../types";

export const SYSTEM_SECURITY_PARAMETERS: IFormattedSecurityParameter[] = [
	// PASSWORD SETTINGS (in order you provided)
	{
		key: "minimum_password_length",
		description: "Minimum length of password",
		toggle_field: "is_minimum_password_length_enabled",
		value_field: "minimum_password_length",
		tab: "password-settings",
	},
	{
		key: "maximum_password_length",
		description: "Maximum length of password",
		toggle_field: "is_maximum_password_length_enabled",
		value_field: "maximum_password_length",
		tab: "password-settings",
	},
	{
		key: "minimum_lowercase_required",
		description: "Minimum lowercase characters",
		toggle_field: "is_minimum_lowercase_required_enabled",
		value_field: "minimum_lowercase_required",
		tab: "password-settings",
	},
	{
		key: "minimum_uppercase_required",
		description: "Minimum uppercase characters",
		toggle_field: "is_minimum_uppercase_required_enabled",
		value_field: "minimum_uppercase_required",
		tab: "password-settings",
	},
	{
		key: "minimum_numeric_required",
		description: "Minimum numeric digits",
		toggle_field: "is_minimum_numeric_required_enabled",
		value_field: "minimum_numeric_required",
		tab: "password-settings",
	},
	{
		key: "minimum_special_char_required",
		description: "Minimum special characters",
		toggle_field: "is_minimum_special_char_required_enabled",
		value_field: "minimum_special_char_required",
		tab: "password-settings",
	},
	{
		key: "admin_password_expire_after",
		description: "ADMIN password validation period (days)",
		toggle_field: "is_admin_password_expire_after_enabled",
		value_field: "admin_password_expire_after",
		tab: "password-settings",
	},
	{
		key: "user_password_expire_after",
		description: "USER password validation period (days)",
		toggle_field: "is_user_password_expire_after_enabled",
		value_field: "user_password_expire_after",
		tab: "password-settings",
	},
	{
		key: "remind_password_expiration_after",
		description: "Change password pre-expiration notification (days)",
		toggle_field: "is_remind_password_expiration_enabled",
		value_field: "remind_password_expiration_after",
		icon: true,
		tab: "password-settings",
	},
	{
		key: "is_restrict_username_as_password",
		description: "Password must not match username",
		toggle_field: "is_restrict_username_as_password",
		tab: "password-settings",
	},
	{
		key: "is_restrict_sequential_char_as_password",
		description: "Password must not contain sequential characters",
		toggle_field: "is_restrict_sequential_char_as_password",
		tab: "password-settings",
	},
	{
		key: "is_restrict_repetitive_char_as_password",
		description: "Password must not contain repeated characters",
		toggle_field: "is_restrict_repetitive_char_as_password",
		tab: "password-settings",
	},

	// LOGIN CONFIGURATION (in exact order you provided)
	{
		key: "maximum_login_attempts",
		description: "Failed login attempt/s",
		toggle_field: "is_maximum_login_attempts_enabled",
		value_field: "maximum_login_attempts",
		tab: "login-configuration",
	},
	{
		key: "idle_logout_time",
		description: "Automatically log out after idle time (minutes)",
		toggle_field: "is_idle_logout_time_enabled",
		value_field: "idle_logout_time",
		tab: "login-configuration",
	},
	{
		key: "disable_unused_accounts_after",
		description: "Deactivate unused/inactive accounts (days)",
		toggle_field: "is_disable_unused_accounts_after_enabled",
		value_field: "disable_unused_accounts_after",
		tab: "login-configuration",
	},
	{
		key: "is_force_login_allowed",
		description: "Enable forced login",
		toggle_field: "is_force_login_allowed",
		tab: "login-configuration",
	},
	{
		key: "do_lock_account_on_dual_login",
		description: "USER, lock account on login from different IP or device.",
		toggle_field: "do_lock_account_on_dual_login",
		icon: true,
		tab: "login-configuration",
	},
];