import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export function useTypedSearchParams<T extends { [K in keyof T]?: string }>(
	defaults: Partial<T> = {} as Partial<T>
): T {
	const [searchParams] = useSearchParams();

	// Serialize defaults to create stable dependency
	const defaultsSerialized = useMemo(() => JSON.stringify(defaults), [defaults]);

	return useMemo(() => {
		const result = {} as T;
		const defaultsObj = JSON.parse(defaultsSerialized) as Partial<T>;
		
		for (const key in defaultsObj) {
			const value = searchParams.get(key);
			result[key] = (value || defaultsObj[key] || undefined) as T[Extract<keyof T, string>];
		}
		
		return result;
	}, [searchParams, defaultsSerialized]);
}

