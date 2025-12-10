import { 
    z, 
    requiredStringValidation, 
    zodObject 
} from '@/lib/validation';

export const USER_SCHEMA = zodObject({
    username: requiredStringValidation('Username'),
    first_name: requiredStringValidation('First name').refine(
        (val) => !/\d/.test(val),
        { message: 'First name must contain only letters' }
    ),
    middle_name: z.string().trim().nullable().optional().refine(
        (val) => !val || val.trim() === '' || !/\d/.test(val),
        { message: 'Middle name must contain only letters' }
    ),
    last_name: requiredStringValidation('Last name').refine(
        (val) => !/\d/.test(val),
        { message: 'Last name must contain only letters' }
    ),
    email: z.union([
        z.string().email("Invalid email"),
        z.literal(""),
    ]).optional(),
    user_type: z.string().refine((val) => {
        if (val === '' || val === null || val === undefined) return false;
        return true;
    }, { message: 'User Type is required' }),
    permission: z.object({
        menu: z.array(z.string()).default([]),
        menu_action: z.array(z.number()).default([]),
    }).optional().default({ menu: [], menu_action: [] }),
});

export type UserFormData = z.infer<typeof USER_SCHEMA>;