// React
import { useMemo, useCallback } from "react";

// Components
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DialogContentWrapper from "@/components/DialogWrapper";
import MenuActionSelector from "../MenuActionSelector";

// Features
import { IUserFiles } from "@features/utilities/user-files/types";
import { useMenuWithActions } from "@features/utilities/user-files/hooks/useMenuWithActions";
import { UserFormData } from "@features/utilities/user-files/schema";

// Local
import { useUserForm } from "./hooks/useUserForm";
import { useUserTypeHandler } from "./hooks/useUserTypeHandler";
import { useUserFormValidation } from "./hooks/useUserFormValidation";
import { UserFormFields } from "./UserFormFields";
import { USER_TYPE_OPTIONS } from "../../utils/constants";

interface UserFormDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: UserFormData) => Promise<void>;
	selectedUser: IUserFiles | null;
	isLoading?: boolean;
}

export const UserFormDialog = ({
	open,
	onOpenChange,
	onSubmit,
	selectedUser,
	isLoading = false,
}: UserFormDialogProps) => {
    const isEditMode = !!selectedUser;
	const userTypeOptions = USER_TYPE_OPTIONS;
	const { menuTree, actionsByMenu, isLoading: isLoadingMenu } = useMenuWithActions({
		enabled: open,
	});

	const { form, defaultValues } = useUserForm({ selectedUser, userTypeOptions, open });
	
	useUserTypeHandler({
		form,
		userTypeOptions,
		defaultUserType: defaultValues?.user_type,
	});

	const { handleSubmit } = useUserFormValidation({
		form,
		userTypeOptions,
		onSubmit,
	});

	const handleCancel = useCallback(() => {
		if (isLoading) return;
		form.reset();
		onOpenChange(false);
	}, [isLoading, form, onOpenChange]);

	const handleOpenChange = useCallback((newOpen: boolean) => {
		if (newOpen) {
			onOpenChange(true);
		} else if (!isLoading) {
			form.reset();
			onOpenChange(false);
		}
	}, [isLoading, form, onOpenChange]);

	const submitButtonText = useMemo(() => {
		if (isLoading) {
			return isEditMode ? 'Updating...' : 'Creating...';
		}
		return isEditMode ? 'Save Changes' : 'Create User';
	}, [isLoading, isEditMode]);

	const isSubmitDisabled = isLoading || !form.formState.isDirty;

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContentWrapper 
				className="w-[calc(100%-16px)] max-w-4xl max-h-[calc(100%-16px)] flex flex-col rounded-md overflow-y-auto"
				disableOverlayClose
			>
				<DialogHeader className="flex-shrink-0">
					<DialogTitle>{isEditMode ? 'Edit User' : 'Create User'}</DialogTitle>
					<DialogDescription>
						{isEditMode ? 'Update user information' : 'Create a new user account'}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col h-full">
						<div className="flex flex-col md:flex-row gap-4">
							<div className="flex-1 space-y-4">
								<UserFormFields form={form} userTypeOptions={userTypeOptions} disabled={isLoading} />
							</div>
							<Separator orientation="vertical" className="hidden md:block h-auto w-px" />
							<Separator className="md:hidden" />
							<div className="flex-1">
								{isLoadingMenu ? (
									<div className="flex items-center justify-center h-[400px]">
										<p className="text-sm text-muted-foreground">Loading menu data...</p>
									</div>
								) : (
									<MenuActionSelector
										menuData={menuTree}
										actionsByMenu={actionsByMenu}
										userTypeOptions={userTypeOptions}
										disabled={isLoading}
									/>
								)}
							</div>
						</div>
						<DialogFooter className="flex-shrink-0 gap-y-2 mt-4">
							<Button
								type="button"
								variant="outline"
								onClick={handleCancel}
								disabled={isLoading}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isSubmitDisabled}
							>
								{submitButtonText}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContentWrapper>
		</Dialog>
	);
};