// React
import { useEffect, useMemo, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Features
import { USER_SCHEMA, UserFormData } from "@features/utilities/user-files/schema";
import { IUserFiles } from "@features/utilities/user-files/types";

interface UseUserFormProps {
	selectedUser: IUserFiles | null;
	userTypeOptions: Array<{ value: string; label: string }>;
	open: boolean;
}

const getDefaultFormValues = (selectedUser: IUserFiles | null) => {
	if (!selectedUser) {
		return {
			username: '',
			first_name: '',
			middle_name: '',
			last_name: '',
			email: '',
			user_type: '',
			permission: {
				menu: [],
				menu_action: [],
			},
		};
	}

	const userType = typeof selectedUser.user_type === 'string' 
		? selectedUser.user_type
		: typeof selectedUser.user_type === 'number'
			? selectedUser.user_type === 1
				? 'User'
				: selectedUser.user_type === 2
					? 'Supervisor'
					: ''
			: '';

	const permission = (selectedUser as IUserFiles & { permission?: { menu: string[]; menu_action: number[] }; user_access?: { menu: string[]; actions: number[] } }).permission || 
		((selectedUser as IUserFiles & { user_access?: { menu: string[]; actions: number[] } }).user_access ? {
			menu: (selectedUser as IUserFiles & { user_access?: { menu: string[]; actions: number[] } }).user_access?.menu || [],
			menu_action: (selectedUser as IUserFiles & { user_access?: { menu: string[]; actions: number[] } }).user_access?.actions || [],
		} : {
			menu: [],
			menu_action: [],
		});

	return {
		username: selectedUser.username || '',
		first_name: selectedUser.first_name || '',
		middle_name: selectedUser.middle_name || '',
		last_name: selectedUser.last_name || '',
		email: selectedUser.email || '',
		user_type: userType,
		permission: permission,
	};
};

export const useUserForm = ({ selectedUser, userTypeOptions, open }: UseUserFormProps) => {
	const defaultValues = useMemo(
		() => getDefaultFormValues(selectedUser),
		[selectedUser]
	);

	const form = useForm<UserFormData>({
		resolver: zodResolver(USER_SCHEMA),
		defaultValues: defaultValues,
	});

	useEffect(() => {
		if (open) {
			form.reset(defaultValues, { keepDefaultValues: false, keepDirty: false });
		}
	}, [open, selectedUser, defaultValues, form]);

	return { form, defaultValues };
};

