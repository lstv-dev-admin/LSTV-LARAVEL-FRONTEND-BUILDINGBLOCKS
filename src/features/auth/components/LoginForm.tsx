import { useForm } from "react-hook-form";

// Features
import { LoginFormData, LOGIN_SCHEMA } from "@features/auth/schema";
import useLoginMutation from "@features/auth/hooks/mutations/useLoginMutation";
import { handleFormError } from "@features/shared/utils/handleFormError";

// Components
import InputField from "@/components/Fields/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Utils
import toast from "@/lib/toast";
import useOverlayStore from "@/stores/useOverlayStore";
import { useAuthStore } from "@/stores/useAuthStore";

// Libs
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
	const { mutateAsync: login, isPending } = useLoginMutation();
	const { show: showOverlay, hide: hideOverlay } = useOverlayStore();
    const { user } = useAuthStore();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(LOGIN_SCHEMA),
		defaultValues: {
			company_code: "",
			username: "",
			password: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = form;

	const onSubmit = async (data: LoginFormData) => {
        if (user) return;
		showOverlay("Authenticating...");
		try {
			await login(data);
			toast.success("Authenticated successfully");
		} catch (error) {
			handleFormError(
                error, 
                form.setError, 
                "login-form-error", 
                "Authentication failed"
            );
			console.error(error);
		} finally {
			hideOverlay();
		}
	};

    const LOGIN_FIELDS = [
        {
            name: "company_code",
            label: "Company ID",
            placeholder: "HR_CONNECT_TEST",
            type: "text",
            required: true,
        },
        {
            name: "username",
            label: "Username",
            placeholder: "JohnDoe",
            type: "text",
            required: true,
        },
        {
            name: "password",
            label: "Password",
            placeholder: "password",
            type: "password",
            required: true,
        },
    ];

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {LOGIN_FIELDS.map((field) => (
                    <InputField
                        key={field.name}
                        required={field.required}
                        control={control}
                        name={field.name as keyof typeof control._defaultValues}
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.type}
                        error={errors[field.name as keyof typeof errors]?.message}
                        className="text-slate-800"
                        disabled={isPending || !!user}
                    />
                ))}
				<Button 
                    type="submit" 
                    className="mt-4 w-full" 
                    disabled={isPending || !!user}
                >
					{isPending ? "Authenticating..." : "Sign in"}
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;