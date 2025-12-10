export interface ISystemParameter {
    max_activity_log_record_counts: number;
    is_date_lock_global: boolean;
}

export interface ISystemParameterRow  {
	id: string;
	parameter: string;
	description: string;
	value: number | boolean;
	type: 'number' | 'boolean';
}