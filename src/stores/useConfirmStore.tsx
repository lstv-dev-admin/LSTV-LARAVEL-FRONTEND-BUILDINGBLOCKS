import { create } from "zustand";

type Variant = "default" | "success" | "info" | "warning" | "destructive";

interface ConfirmOptions {
    title?: string;
    description?: string;
    variant?: Variant;
}

interface ConfirmState {
    open: boolean;
    title: string;
    description: string;
    variant: Variant;
    isLoading: boolean;
    resolve?: (value: boolean) => void;
    confirm: (options?: ConfirmOptions) => Promise<boolean>;
    setLoading: (loading: boolean) => void;
    close: () => void;
}

const useConfirmStore = create<ConfirmState>((set, get) => ({
    open: false,
    title: '',
    description: '',
    variant: 'default',
    isLoading: false,

    confirm: (options) => {
        return new Promise<boolean>((resolve) => {
            set({
                open: true,
                title: options?.title || "Are you sure?",
                description: options?.description || "This action cannot be undone.",
                variant: options?.variant || "default",
                resolve,
            });
        });
    },

    setLoading: (loading) => set({ isLoading: loading }),

    close: () => {
        set({ open: false, isLoading: false });
    },
}));

export default useConfirmStore;