// Features
import useDeleteItemMutation from "@features/masterfile/hooks/mutations/useDeleteItemMutation";

// Components
import { Button } from "@/components/ui/button";

// Utils
import toast from "@/lib/toast";
import useConfirmStore from "@/stores/useConfirmStore";

// Libs
import { Trash2Icon } from "lucide-react";

type QueryKeyType = string | readonly unknown[] | { list: () => readonly unknown[] };

interface DeleteMasterfileItemProps {
	id: number | string;
	endpoint: string;
	title: string;
	queryKey: QueryKeyType;
	primaryKey: string;
	invalidateQueryKeys?: QueryKeyType[];
}

const DeleteMasterfileItem = ({
	id,
	endpoint,
	title,
	queryKey,
	primaryKey,
	invalidateQueryKeys = [],
}: DeleteMasterfileItemProps) => {
	const { mutateAsync } = useDeleteItemMutation({
		endpoint,
		queryKey,
		primaryKey,
		invalidateQueryKeys,
	});
	const { confirm, setLoading, close } = useConfirmStore();

	const handleDeleteItem = async () => {
		const confirmed = await confirm({
			title: `Delete ${title}`,
			description: `Delete this ${title.toLowerCase()}? This action cannot be undone.`,
			variant: "destructive",
		});

		if (!confirmed) return;

		setLoading(true);
		const toastId = toast.loading(`Deleting ${title}...`);

		try {
			await mutateAsync(id);
			toast.success(`${title} successfully deleted!`, { id: toastId });
		} catch (error) {
			console.error(`[${title}] Delete error:`, error);
			toast.error(`Failed to delete ${title}. Please try again.`, { id: toastId });
		} finally {
			close();
			setLoading(false);
		}
	};

	return (
		<Button
			title={`Delete ${title}`}
			aria-label={`Delete ${title}`}
			size="icon"
			variant="destructive"
			onClick={handleDeleteItem}
		>
			<Trash2Icon className="h-4 w-4" />
		</Button>
	);
};

export default DeleteMasterfileItem;