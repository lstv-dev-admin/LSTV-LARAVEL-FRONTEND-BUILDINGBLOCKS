import { useMemo } from "react";

// Features
import { useGetUsersQuery } from '@features/utilities/user-files/hooks/queries/useGetUsersQuery';
import { UserFormDialog } from '@features/utilities/user-files/components/UserFormDialog';
import { useUserHandlers } from '@features/utilities/user-files/hooks/useUserHandlers';
import { createUserColumns } from '@features/utilities/user-files/utils/constants';
import { IUserFiles } from '@features/utilities/user-files/types';

// Components
import { Separator } from "@/components/ui/separator";
import ActionTable from "@/components/DataTable/ActionTable";
import PageHeader from "@/components/PageHeader.tsx";
import PageHeaderWrapper from "@/components/PageHeader.tsx/PageHeaderWrapper";

// Utils
import usePagination from "@/features/shared/hooks/usePagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageTitle from "@/components/PageTitle";

// Libs

const USER_TYPE_OPTIONS = [
	{ value: "User", label: "User" },
	{ value: "Supervisor", label: "Supervisor" },
];

export default function Users() {
	const { params, setSearch, setPage, setItemsPerPage } = usePagination();
	const { data, isLoading, isFetching, isError } = useGetUsersQuery(params);

	const {
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
	} = useUserHandlers();

	const USER_COLUMNS = useMemo(() => createUserColumns(),[]);

	return (
		<>
            <PageTitle title='User Files' />
            <PageHeader
                title="User files"
                subTitle="Manage system users and access."
            />
			<Separator className="my-4" />
			<ActionTable
				columns={USER_COLUMNS}
				data={data?.data?.items}
				itemSize={data?.data?.items_per_page}
				totalPages={data?.data?.total_pages}
				currentPage={data?.data?.current_page}
				isLoading={isFetching || isLoading}
				isError={isError}
				onSearch={(q) => setSearch(q)}
				onPageChange={(p) => setPage(p)}
				onItemsPerPageChange={(c) => setItemsPerPage(c)}
				actions={data?.data?.actions}
				onAction={(type, row) => {
                    const actionHandlers: Record<string, (row: IUserFiles) => void> = {
                        add: () => handleCreate(),
                        edit: (row) => row && handleEdit(row),
                        delete: (row) => {
                            if (!row) return;
                            const userName = `${row.first_name} ${row.last_name}`.trim() || row.email;
                            handleDelete(row.record_id, userName);
                        },
                    };

                    const handler = actionHandlers[type];
                    if (handler) handler(row);
				}}
			/>
			<UserFormDialog
				open={editModal}
				onOpenChange={handleCloseEdit}
				onSubmit={handleSubmitEdit}
				selectedUser={selectedUser}
				userTypeOptions={USER_TYPE_OPTIONS}
				isLoading={isUpdating}
			/>
			<UserFormDialog
				open={createModal}
				onOpenChange={handleCloseCreate}
				onSubmit={handleSubmitCreate}
				selectedUser={null}
				userTypeOptions={USER_TYPE_OPTIONS}
				isLoading={isCreating}
			/>
		</>
	);
}

