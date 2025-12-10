import { useEffect, useMemo, useState } from "react";
import { DefaultValues, useForm } from "react-hook-form";

// Features
import { EditMasterfileItemProps } from "@features/masterfile/types";
import useUpdateItemMutation from "@features/masterfile/hooks/mutations/useUpdateItemMutation";
import { handleFormError } from "@features/shared/utils/handleFormError";

// Components
import { Button } from "@/components/ui/button";
import MasterfileForm from "./MasterfileForm";

// Utils
import toast from "@/lib/toast";
import { z } from "@/lib/validation";

// Libs
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from "lucide-react";

const EditMasterfileItem = <
	TSchema extends z.ZodTypeAny,
	TRow extends object,
	TFormData extends Record<string, unknown>
>({
	title,
	schema,
	fields,
	endpoint,
	queryKey,
	invalidateQueryKeys = [],
	row,
	primaryKey,
}: EditMasterfileItemProps<TSchema, TRow>) => {
	const [open, setOpen] = useState<boolean>(false);
	const { mutateAsync, isPending } = useUpdateItemMutation<TFormData>({
		endpoint,
		queryKey,
		primaryKey,
		invalidateQueryKeys,
	});

	const defaultValues = useMemo(() => {
		return fields.reduce((acc, field) => {
			const key = field.name as keyof TRow;
			(acc as Record<string, unknown>)[field.name] = row[key] ?? "";
			return acc;
		}, {} as DefaultValues<TFormData>);
	}, [fields, row]);

	const form = useForm<TFormData>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	useEffect(() => {
		form.reset(defaultValues);
	}, [row, defaultValues, form]);

	const onSubmit = async (values: TFormData) => {
		const toastId = toast.loading(`Updating ${title}...`);
		try {
			const id = row[primaryKey] as string | number;
			await mutateAsync({ id, payload: values });
			toast.success(`${title} updated successfully!`, { id: toastId });
			setOpen(false);
		} catch (error) {
			handleFormError(error, form.setError, toastId, `Failed to update ${title}`);
			console.error(`[Edit${title}] Submit error:`, error);
		}
	};

	return (
		<>
			<Button
				title={`Edit ${title}`}
				aria-label={`Edit ${title}`}
				size="icon"
				variant="outline"
				onClick={() => setOpen(true)}
			>
				<EditIcon className="h-4 w-4" />
			</Button>
			<MasterfileForm
				title={title}
				form={form}
				fields={fields}
				open={open}
				mode="edit"
				isLoading={isPending}
				onSubmit={onSubmit}
				onCancel={() => {
					form.reset(defaultValues);
					setOpen(false);
				}}
			/>
		</>
	);
};

export default EditMasterfileItem;
