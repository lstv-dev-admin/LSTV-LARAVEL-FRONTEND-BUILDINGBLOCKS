import useConfirmStore from "@/stores/useConfirmStore"
import ConfirmModal from "../Modal/ConfirmModal";

const ConfirmDialog = () => {
    const { open, title, description, variant, isLoading, resolve, close } = useConfirmStore();

    return (
        <ConfirmModal 
            open={open}
            title={title}
            description={description}
            variant={variant}
            isLoading={isLoading}
            onConfirm={() => {
                resolve?.(true);
            }}
            onCancel={() => {
                resolve?.(false);
                close();
            }}
        />
    );
};

export default ConfirmDialog;