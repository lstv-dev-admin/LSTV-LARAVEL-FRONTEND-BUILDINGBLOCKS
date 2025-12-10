import { ComponentProps, ReactNode } from "react";

export interface IColumn<T> {
	key: keyof T | string;
	header: ReactNode;
	renderHeader?: (data: T[]) => ReactNode;
	slotProps?: {
		header?: ComponentProps<'th'>;
		cell?: ComponentProps<'td'>;
	};
	render?: (row: T) => ReactNode;
}

