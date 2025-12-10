// React
import { useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

// Features
import { UserFormData } from "@features/utilities/user-files/schema";

interface UseUserTypeHandlerProps {
	form: UseFormReturn<UserFormData>;
	userTypeOptions: Array<{ value: string; label: string }>;
	defaultUserType?: string;
}

export const useUserTypeHandler = ({
	form,
	userTypeOptions,
	defaultUserType,
}: UseUserTypeHandlerProps) => {
	const userType = form.watch("user_type");
	const prevUserType = useRef<string | undefined>(defaultUserType);

	useEffect(() => {
		if (userType) {
			const selectedType = userTypeOptions.find(
				(type) => type.value === String(userType)
			);
			const label = selectedType?.label.toLowerCase() || '';
			const isAdministrator = label.includes('administrator') || label.includes('supervisor');
			const prevSelectedType = prevUserType.current 
				? userTypeOptions.find((type) => type.value === String(prevUserType.current))
				: null;
			const prevLabel = prevSelectedType?.label.toLowerCase() || '';
			const wasAdministrator = prevLabel.includes('administrator') || prevLabel.includes('supervisor');

			if (wasAdministrator && !isAdministrator) {
				form.setValue("permission", { menu: [], menu_action: [] }, { shouldValidate: false });
				form.clearErrors("permission");
			}

			if (isAdministrator) {
				form.clearErrors("permission");
			}

			prevUserType.current = userType;
		}
	}, [userType, form, userTypeOptions]);

	useEffect(() => {
		prevUserType.current = defaultUserType;
	}, [defaultUserType]);
};

