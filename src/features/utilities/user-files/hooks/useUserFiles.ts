import { useState } from "react";
import toast from "@/lib/toast";
import useConfirmStore from "@/stores/useConfirmStore";
import { IUserFiles } from "@features/utilities/user-files/types";
import { UserFormData } from "@features/utilities/user-files/schema";
import { useCreateUserMutation } from "@features/utilities/user-files/hooks/mutations/useCreateUserMutation";
import { useUpdateUserMutation } from "@features/utilities/user-files/hooks/mutations/useUpdateUserMutation";
import { useDeleteUserMutation } from "@features/utilities/user-files/hooks/mutations/useDeleteUserMutation";
import { usePrintMutation, useExportMutation } from "@features/shared/hooks/mutations";

export const useUserFiles = () => {
	const [editModal, setEditModal] = useState<boolean>(false);
	const [createModal, setCreateModal] = useState<boolean>(false);
	const [selectedUser, setSelectedUser] = useState<IUserFiles | null>(null);

	const { mutateAsync: createUser, isPending: isCreating } = useCreateUserMutation();
	const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUserMutation();
	const { mutateAsync: deleteUser } = useDeleteUserMutation();
	const { confirm, setLoading: setConfirmLoading, close } = useConfirmStore();

	const { mutateAsync: printUserFiles, isPending: isPrinting } = usePrintMutation({
		endpoint: "/utilities/user-files",
		title: "User Files",
	});

	const { mutateAsync: exportUserFiles, isPending: isExporting } = useExportMutation({
		endpoint: "/utilities/user-files",
		title: "User Files",
	});

	const handleEdit = (user: IUserFiles) => {
		setSelectedUser(user);
		setEditModal(true);
	};

	const handleCreate = () => {
		setSelectedUser(null);
		setCreateModal(true);
	};

	const handleCloseEdit = (open?: boolean) => {
		if (open === false || open === undefined) {
			setEditModal(false);
			setSelectedUser(null);
		}
	};

	const handleCloseCreate = (open?: boolean) => {
		if (open === false || open === undefined) {
			setCreateModal(false);
			setSelectedUser(null);
		}
	};

	const handleSubmitCreate = async (data: UserFormData) => {
		const toastId = toast.loading("Creating user...");
		try {
		await createUser({
			username: data.username,
			user_type: data.user_type,
			first_name: data.first_name,
			middle_name: data.middle_name ?? '',
			last_name: data.last_name,
			email: data.email || '',
			permission: {
				menu: data.permission?.menu || [],
				menu_action: data.permission?.menu_action || [],
			},
		});
			toast.success("User created successfully!", { id: toastId });
			handleCloseCreate();
		} catch (error) {
			console.error("Create user error:", error);
			throw error;
		}
	};

	const handleSubmitEdit = async (data: UserFormData) => {
		if (!selectedUser) return;

		const toastId = toast.loading("Updating user...");
		try {
			await updateUser({
				id: selectedUser.record_id,
				payload: {
					username: data.username,
					user_type: data.user_type,
					first_name: data.first_name,
					middle_name: data.middle_name ?? '',
					last_name: data.last_name,
					email: data.email || '',
					permission: {
						menu: data.permission?.menu || [],
						menu_action: data.permission?.menu_action || [],
					},
				},
			});
			toast.success("User updated successfully!", { id: toastId });
			handleCloseEdit();
		} catch (error) {
			console.error("Update user error:", error);
			toast.error("Failed to update user. Please try again.", { id: toastId });
		}
	};

	const handleDelete = async (id: number, userName: string) => {
		const confirmed = await confirm({
			title: "Delete User",
			description: `Delete ${userName}? This action cannot be undone.`,
			variant: "destructive",
		});

		if (!confirmed) return;

		setConfirmLoading(true);
		const toastId = toast.loading("Deleting user...");

		try {
			await deleteUser(id);
			toast.success("User successfully deleted!", { id: toastId });
		} catch (error) {
			console.error("Delete user error:", error);
			toast.error("Failed to delete user. Please try again.", { id: toastId });
		} finally {
			close();
			setConfirmLoading(false);
		}
	};

	const handlePrint = async () => {
		if (isPrinting) return;
		await printUserFiles();
	};

	const handleExport = async () => {
		if (isExporting) return;
		await exportUserFiles();
	};

	return {
		editModal,
		createModal,
		selectedUser,
		isCreating,
		isUpdating,
		handleEdit,
		handleCreate,
		handleCloseEdit,
		handleCloseCreate,
		handleSubmitCreate,
		handleSubmitEdit,
		handleDelete,
		handlePrint,
		handleExport,
	};
};

