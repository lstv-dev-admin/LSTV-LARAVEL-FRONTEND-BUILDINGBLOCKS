import { IColumn } from "@/components/DataTable";
import { IFilters, IUserActivityLog } from "../types";
import { IApiAction } from "@/features/shared";

export const USER_ACTIVITY_LOGS_COLUMNS: IColumn<IUserActivityLog>[] = [
    {
        key: 'record_count',
        header: 'Record Count',
        slotProps: { 
            header: { className: 'whitespace-nowrap' }, 
            cell: { className: 'whitespace-nowrap' } 
        }
    },
    {
        key: 'log_date',
        header: 'Log Date',
        slotProps: { 
            header: { className: 'whitespace-nowrap' }, 
            cell: { className: 'whitespace-nowrap' } 
        }
    },
    {
        key: 'log_time',
        header: 'Log Time',
        slotProps: { 
            header: { className: 'whitespace-nowrap' }, 
            cell: { className: 'whitespace-nowrap' } 
        }
    },
    {
        key: 'user',
        header: 'User',
        slotProps: { 
            header: { className: 'whitespace-nowrap' }, 
            cell: { className: 'whitespace-nowrap' } 
        }
    },
    {
        key: 'activity',
        header: 'Activity',
        slotProps: { 
            header: { className: 'whitespace-nowrap' }, 
            cell: { className: 'whitespace-nowrap' } 
        }
    },
    {
        key: 'module',
        header: 'Module / Entry',
        slotProps: { 
            header: { className: 'whitespace-nowrap' }, 
            cell: { className: 'whitespace-nowrap' } 
        }
    },
    {
        key: 'remarks',
        header: 'Remarks',
        slotProps: { 
            header: { className: 'whitespace-nowrap' }, 
            cell: { className: 'whitespace-nowrap' } 
        }
    }
];

export const USER_ACTIVITY_LOGS_DEFAULT_FILTERS: IFilters = {
    date_from: "",
    date_to: "",
    remarks: "",
    activity: "",
    user: "",
};

export const USER_ACTIVITY_LOGS_ACTIONS: IApiAction[] = [
    {
        type: "print",
        label: "Print",
        icon: "Printer",
        position: "header",
    },
    {
        type: "filter",
        label: "Filter",
        icon: "Filter",
        position: "header",
    },
];
