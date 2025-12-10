import { requiredStringValidation, z, zodObject } from "@/lib/validation";

export const LOGIN_SCHEMA = zodObject({
    company_code: requiredStringValidation('Company code'),
    username: requiredStringValidation('Username'),
    password: requiredStringValidation('Password'),
});

export type LoginFormData = z.infer<typeof LOGIN_SCHEMA>;

export const CHANGE_PASSWORD_SCHEMA = zodObject({
    current_password: requiredStringValidation('Old password'),
    new_password: requiredStringValidation('New password'),
    confirm_password: requiredStringValidation('Confirm password'),
}).refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
});

export type ChangePasswordFormData = z.infer<typeof CHANGE_PASSWORD_SCHEMA>;