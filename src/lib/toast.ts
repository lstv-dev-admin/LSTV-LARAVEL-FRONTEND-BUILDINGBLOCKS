import { toast as baseToast } from "sonner";

const defaultOpts = { 
    closeButton: true, 
    duration: 2000, 
    onClick: (t) => baseToast.dismiss(t.id),
};

const toast = {
    ...baseToast,
    success: (message: string, options = {}) => baseToast.success(message, { ...defaultOpts, ...options }),
    error: (message: string, options = {}) => baseToast.error(message, { ...defaultOpts, ...options }),
    info: (message: string, options = {}) => baseToast.info(message, { ...defaultOpts, ...options }),
    warning: (message: string, options = {}) => baseToast.warning
        ? baseToast.warning(message, { ...defaultOpts, ...options })
        : baseToast(message, { ...defaultOpts, ...options }),
};

export default toast;