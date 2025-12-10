import { z } from 'zod';

export const BASELINE_SECURITY_SCHEMA = z.object({
    // Password settings
    is_minimum_password_length_enabled: z.union([z.literal(0), z.literal(1)]),
    minimum_password_length: z.number(),

    is_maximum_password_length_enabled: z.union([z.literal(0), z.literal(1)]),
    maximum_password_length: z.number(),

    is_minimum_lowercase_required_enabled: z.union([z.literal(0), z.literal(1)]),
    minimum_lowercase_required: z.number(),

    is_minimum_uppercase_required_enabled: z.union([z.literal(0), z.literal(1)]),
    minimum_uppercase_required: z.number(),

    is_minimum_numeric_required_enabled: z.union([z.literal(0), z.literal(1)]),
    minimum_numeric_required: z.number(),

    is_minimum_special_char_required_enabled: z.union([z.literal(0), z.literal(1)]),
    minimum_special_char_required: z.number(),

    // Login configuration
    is_maximum_login_attempts_enabled: z.union([z.literal(0), z.literal(1)]),
    maximum_login_attempts: z.number(),

    is_idle_logout_time_enabled: z.union([z.literal(0), z.literal(1)]),
    idle_logout_time: z.number(),

    is_admin_password_expire_after_enabled: z.union([z.literal(0), z.literal(1)]),
    admin_password_expire_after: z.number(),

    is_user_password_expire_after_enabled: z.union([z.literal(0), z.literal(1)]),
    user_password_expire_after: z.number(),

    is_remind_password_expiration_enabled: z.union([z.literal(0), z.literal(1)]),
    remind_password_expiration_after: z.number(),

    is_disable_unused_accounts_after_enabled: z.union([z.literal(0), z.literal(1)]),
    disable_unused_accounts_after: z.number(),

    is_restrict_username_as_password: z.union([z.literal(0), z.literal(1)]),
    is_restrict_sequential_char_as_password: z.union([z.literal(0), z.literal(1)]),
    is_restrict_repetitive_char_as_password: z.union([z.literal(0), z.literal(1)]),
    is_force_login_allowed: z.union([z.literal(0), z.literal(1)]),
    do_lock_account_on_dual_login: z.union([z.literal(0), z.literal(1)]),
});

export type BaselineSecurityFormData = z.infer<typeof BASELINE_SECURITY_SCHEMA>;