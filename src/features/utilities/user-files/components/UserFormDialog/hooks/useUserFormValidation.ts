// React
import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";

// Features
import { UserFormData } from "@features/utilities/user-files/schema";
import { handleFormError } from "@features/shared/utils/handleFormError";

interface UseUserFormValidationProps {
	form: UseFormReturn<UserFormData>;
	userTypeOptions: Array<{ value: string; label: string }>;
	onSubmit: (data: UserFormData) => Promise<void>;
}

export const useUserFormValidation = ({
	form,
	userTypeOptions,
	onSubmit,
}: UseUserFormValidationProps) => {
	const handleSubmit = useCallback(
		async (data: UserFormData) => {
			// Validate permission for non-Administrator/Supervisor users before submitting
			const userType = data.user_type;
			if (userType) {
				const selectedType = userTypeOptions.find(
					(type) => type.value === String(userType)
				);
				const label = selectedType?.label.toLowerCase() || '';
				const isAdministrator = label.includes('administrator') || label.includes('supervisor');

				if (!isAdministrator && (!data.permission?.menu?.length && !data.permission?.menu_action?.length)) {
					form.setError("permission", {
						type: "manual",
						message: "User Access is required"
					});
					return;
				}
			}

			try {
				await onSubmit(data);
			} catch (error) {
				handleFormError(error, form.setError, undefined, "Failed to save user");
				throw error;
			}
		},
		[onSubmit, form, userTypeOptions]
	);

	return { handleSubmit };
};

