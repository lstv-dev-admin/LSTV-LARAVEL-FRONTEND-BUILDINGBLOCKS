import { ReactNode } from "react"
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from "../ui/alert-dialog";
import { AlertDescription } from "../ui/alert";
import { cn } from "@/lib/utils";
import { Circle, CheckCircle2, Info, TriangleAlert, AlertCircle } from "lucide-react";

interface Props {
    open?: boolean;
    title?: string;
    description?: string;
    onConfirm?: () => void;
    onCancel?: () => void
    children?: ReactNode;
    isLoading?: boolean;
    variant?: "default" | "success" | "info" | "warning" | "destructive";
}

const ConfirmModal = ({
    open = false,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone.",
    children,
    onConfirm,
    onCancel,
    isLoading= false,
    variant = 'default',
}: Props) => {

    const actionClass = cn(
        "inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "destructive" && "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
        variant === "success" && "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600",
        variant === "warning" && "bg-yellow-500 text-stone-800 hover:bg-yellow-600 focus:ring-yellow-500",
        variant === "info" && "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
        variant === "default" && "bg-stone-800 text-white hover:bg-stone-800/90 focus:ring-primary",
    );

    return (
        <AlertDialog 
            open={open}
            onOpenChange={(val) => {
                if (isLoading) return;
                if (!val) onCancel?.();
            }}
        >
            {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
            <AlertDialogContent className="w-[calc(100%-16px)] rounded-md">
                <AlertDialogTitle>
                    {isLoading ? "Processing your request..." : title}
                </AlertDialogTitle>
                <AlertDescription>
                    {isLoading ? "Please wait while we complete the action." : description}
                </AlertDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel 
                        disabled={isLoading} 
                        onClick={onCancel}
                        className="hover:border hover:border-stone-800 hover:bg-transparent hover:text-stone-800"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        autoFocus
                        disabled={isLoading} 
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm?.();
                        }}
                        className={actionClass}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmModal;