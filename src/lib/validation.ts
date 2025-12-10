import * as z from "zod";

export { z };

export const zodObject = <T extends z.ZodRawShape>(
    shape: T,
    options?: Parameters<typeof z.object>[1]
) => z.object(shape, options).strict();

export const ALLOWED_DOCUMENT_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const;

export const fileAttachmentValidation = (fieldName = "File") =>
	z
		.union([
			z.instanceof(File, { message: `${fieldName} is required` }),
			requiredStringValidation(fieldName),
		])
		.refine(
			(file): boolean =>
				file instanceof File
					? (ALLOWED_DOCUMENT_FILE_TYPES as readonly string[]).includes(file.type)
					: true,
			{
				message: "Only PDF, Word, or Excel files are allowed",
			}
		);

export const passwordValidation = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one number or special character");

export const emailValidation = z
    .string()
    .nonempty("Email is required")
    .email("Invalid email");

export const requiredStringValidation = (fieldName: string) => z.string().trim().nonempty(`${fieldName} is required`);

export const dateValidation = ({
    fieldName,
    required = false,
}: {
    fieldName: string;
    required?: boolean;
}) =>
    z.union([
        z.date({ required_error: `${fieldName} is required` }), 
        z.string().min(1, `${fieldName} is required`), z.null()
    ])
    .refine((value) => {
        if (!required && (value === null || value === "")) return true;
        if (required && (value === null || value === "")) return false;

        const date = value instanceof Date ? value : new Date(value);
        return !isNaN(date.getTime());
    }, 
    { 
        message: `${fieldName} is required` 
    });
