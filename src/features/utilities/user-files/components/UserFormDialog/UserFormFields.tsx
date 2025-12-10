// Components
import InputField from "@/components/Fields/InputField";
import SelectField from "@/components/Fields/SelectField";
import { UseFormReturn } from "react-hook-form";
import { UserFormData } from "@features/utilities/user-files/schema";

interface UserFormFieldsProps {
	form: UseFormReturn<UserFormData>;
	userTypeOptions: Array<{ value: string; label: string }>;
	disabled?: boolean;
}

export const UserFormFields = ({ form, userTypeOptions, disabled = false }: UserFormFieldsProps) => {
	return (
		<div className="space-y-4">
			<InputField
				required
				control={form.control}
				name="username"
				label="Username"
				placeholder="Enter username"
				disabled={disabled}
			/>
			<SelectField
				required
				control={form.control}
				name="user_type"
				label="User Type"
				placeholder="Select user type"
				values={userTypeOptions}
				disabled={disabled}
			/>
			<InputField
				required
				control={form.control}
				name="first_name"
				label="First Name"
				placeholder="Enter first name"
				disabled={disabled}
			/>
			<InputField
				control={form.control}
				name="middle_name"
				label="Middle Name"
				placeholder="Enter middle name (optional)"
				disabled={disabled}
			/>
			<InputField
				required
				control={form.control}
				name="last_name"
				label="Last Name"
				placeholder="Enter last name"
				disabled={disabled}
			/>
			<InputField
				control={form.control}
				name="email"
				label="Email"
				placeholder="Enter email (optional)"
				disabled={disabled}
			/>
		</div>
	);
};

