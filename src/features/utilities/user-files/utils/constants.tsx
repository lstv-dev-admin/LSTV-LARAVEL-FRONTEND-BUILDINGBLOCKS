import { IColumn } from "@/components/DataTable/types";
import { IUserFiles } from "@features/utilities/user-files/types";
import { Badge } from "@/components/ui/badge";

const getUserTypeLabel = (userType: number | string | null | undefined): string => {
	if (userType === "User" || userType === 1) return "User";
	if (userType === "Supervisor" || userType === 2) return "Supervisor";
	return String(userType || "");
};

export const USER_TYPE_OPTIONS = [
	{ value: "User", label: "User" },
	{ value: "Supervisor", label: "Supervisor" },
];

export const createUserColumns = (): IColumn<IUserFiles>[] => [
	{
		key: "name",
		header: "Name",
		slotProps: { cell: { className: 'font-semibold whitespace-nowrap' } },
		render: (r) => (
			<> {`${r.first_name} ${r.middle_name ?? ""} ${r.last_name}`} </>
		)
	},
	{ key: "email", header: "Email" },
	{
		key: "role",
		header: "Role",
		render: (row) => (
			<>
				{getUserTypeLabel(row.user_type)}
			</>
		)
	},
	{
		key: "status_id",
		header: "Status",
		render: (r) => (
			<Badge variant={r.is_active === 1 ? "default" : "secondary"}>
				{r.is_active === 1 ? 'Active' : "Inactive"}
			</Badge>
		)
	},
];

