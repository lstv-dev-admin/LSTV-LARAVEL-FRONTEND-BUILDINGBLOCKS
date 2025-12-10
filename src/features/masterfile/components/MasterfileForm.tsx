// Features
import { IMasterFileField } from "@features/masterfile/types";
import MasterfileField from "./MasterfileField";

// Components
import DialogContentWrapper from "@/components/DialogWrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

// Libs
import { Path, UseFormReturn } from "react-hook-form";

interface MasterfileDialogProps<TFormData extends object> {
    title: string;
    form: UseFormReturn<TFormData>;
    fields: IMasterFileField[];
    onSubmit: (values: TFormData) => void;
    onCancel: () => void;
    open: boolean;
    mode?: "create" | "edit";
    isLoading?: boolean;
}

const MasterfileForm = <TFormData extends object>({
    title,
    form,
    fields,
    onSubmit,
    onCancel,
    mode = "create",
    open,
    isLoading,
}: MasterfileDialogProps<TFormData>) => {

    const handleOpenChange = (nextOpen: boolean) => {
        if (isLoading) return;
        if (!nextOpen) onCancel();
    };

    const disableSubmit = isLoading || mode === "edit" && !form.formState.isDirty;

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}
        >
            <DialogContentWrapper className="w-[calc(100%-16px)] rounded-md">
                <DialogHeader>
                    <DialogTitle>
                        {`${mode === "create" ? "Add new" : "Edit"} ${title.toLowerCase()}`}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {fields.map((field, index) => {
                            const error = form.formState.errors[field.name as keyof TFormData]?.message as string;

                            return (
                                <MasterfileField
                                    key={index}
                                    field={{
										...field,
										disabled: field.disabled || isLoading,
									}}
                                    name={field.name as Path<TFormData>}
                                    control={form.control}
                                    error={error}
                                />
                            );
                        })}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={disableSubmit}
                        >
                            {mode === "create" ? "Create" : "Save Changes"}
                        </Button>
                    </form>
                </Form>
            </DialogContentWrapper>
        </Dialog>
    );
};

export default MasterfileForm;
