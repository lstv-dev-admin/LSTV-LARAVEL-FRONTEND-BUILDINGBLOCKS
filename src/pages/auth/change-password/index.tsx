// React
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Libs
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "@/lib/toast";

// Components
import InputField from "@/components/Fields/InputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

// Features
import { handleFormError } from "@features/shared/utils/handleFormError";
import { CHANGE_PASSWORD_SCHEMA, ChangePasswordFormData } from "@/features/auth/schema";
import { useChangePasswordMutation } from "@/features/auth/hooks/mutations/useChangePasswordMutation";
import { useMemo } from "react";
import useConfirmStore from "@/stores/useConfirmStore";

const ChangePasswordPage = () => {
	const navigate = useNavigate();
    const { mutateAsync, isPending } = useChangePasswordMutation();
    const { confirm, setLoading, close } = useConfirmStore();
	const form = useForm<ChangePasswordFormData>({
		resolver: zodResolver(CHANGE_PASSWORD_SCHEMA),
		defaultValues: {
			current_password: "",
			new_password: "",
			confirm_password: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = form;

	const onSubmit = async (data: ChangePasswordFormData) => {
        const confirmed = await confirm({
            title: "Change Password",
            description: "Are you sure you want to change your password?",
        });
        if (!confirmed) return;

        setLoading(true);
		const toastId = toast.loading("Changing password...");
		try {
            await mutateAsync(data);
            toast.success("Password changed successfully", { id: toastId });
            navigate("/dashboard");
        } catch (error) {
            handleFormError(error, form.setError, toastId, "Failed to change password");
        } finally {
            close();
            setLoading(false);
        } 
	};
    
	const isDisabled = useMemo(() => isSubmitting || isPending, [isSubmitting, isPending]);
    
	return (
		<div className="flex justify-center p-4">
			<Card className="w-full max-w-md h-fit">
				<CardHeader>
					<CardTitle>Change Password</CardTitle>
					<CardDescription>
						Enter your current password and choose a new one.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<InputField
								required
								control={control}
								name="current_password"
								type="password"
								label="Current Password"
								placeholder="Enter your current password"
								disabled={isDisabled}
							/>
							<InputField
								required
								control={control}
								name="new_password"
								type="password"
								label="New Password"
								placeholder="Enter your new password"
								disabled={isDisabled}
							/>
							<InputField
								required
								control={control}
								name="confirm_password"
								type="password"
								label="Confirm Password"
								placeholder="Confirm your new password"
								disabled={isDisabled}
							/>
							<Button type="submit" className="w-full" disabled={isDisabled}>
								{isDisabled ? "Changing Password..." : "Change Password"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ChangePasswordPage;