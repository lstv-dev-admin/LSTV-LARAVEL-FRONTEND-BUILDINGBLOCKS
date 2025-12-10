// React

// Libs
import toast from "@/lib/toast";

// Features
import { IUserFiles } from "@features/utilities/user-files/types";
import { useUpdateUserMutation } from "@features/utilities/user-files/hooks/mutations/useUpdateUserMutation";

// Store
import useConfirmStore from "@/stores/useConfirmStore";

// Components
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

const USER_TYPE_OPTIONS = [
	{ value: "User", label: "User" },
	{ value: "Supervisor", label: "Supervisor" },
];

const getUserTypeValue = (userType: number | string | null | undefined): string => {
	if (userType === "User" || userType === 1) return "User";
	if (userType === "Supervisor" || userType === 2) return "Supervisor";
	return "User";
};

const RoleMenu = (row: IUserFiles) => {
    const { confirm, setLoading, close } = useConfirmStore();
    const { mutateAsync } = useUpdateUserMutation();

    if (!row) return;

    const currentUserType = getUserTypeValue(row.user_type);

    const handleRoleChange = async (newRole: string) => {
        if (newRole === currentUserType) return;

        const modalOptions = {
            title: "Confirm Role Change",
            description: `Are you sure you want to change the role for "${row.username}" to "${newRole}"?`,  
        }
        const confirmed = await confirm(modalOptions);
        if (!confirmed) return;
        setLoading(true);

        const { record_id, ...rest } = row;
        const toastId = toast.loading("Updating role...");

        try {
            await mutateAsync({
                id: record_id,
                payload: {
                    ...rest,
                    user_type: newRole,
                },
            });
            toast.success(`Updated role for ${row.first_name} ${row.last_name}.`, { id: toastId });
        } catch (error) {
            console.error("Failed to update user role:", error);
            toast.error("Failed to update role. Please try again.", { id: toastId });
        } finally {
            close();
            setLoading(false);
        }
    }

    return (
        <Select
            value={currentUserType}
            onValueChange={handleRoleChange}
        >
            <SelectTrigger className="min-w-[120px] max-w-[150px]">
                <SelectValue>
                    {currentUserType || "Select role"}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {USER_TYPE_OPTIONS.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                        {role.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default RoleMenu;