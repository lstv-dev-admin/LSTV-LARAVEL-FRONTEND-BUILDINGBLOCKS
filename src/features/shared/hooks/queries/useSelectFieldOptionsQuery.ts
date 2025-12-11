// Features
import { selectFieldOptionsApi } from "../../api/selectFieldOptions";
import { IBaseResponse, IListApiResponse, JsonValue, SelectFieldOption, UseSelectFieldOptionsParams } from "../../types";

// Libs
import { useQuery } from "@tanstack/react-query";

type ApiResponseData = Record<string, JsonValue>;
type SelectFieldOptionsResponse =
	| IListApiResponse<ApiResponseData>
	| IBaseResponse<ApiResponseData[]>
	| SelectFieldOption[]
	| ApiResponseData[];

const isSelectFieldOption = (item: ApiResponseData | SelectFieldOption): item is SelectFieldOption => {
	return (
		typeof item === "object" &&
		item !== null &&
		"label" in item &&
		"value" in item &&
		typeof item.label === "string" &&
		typeof item.value === "string"
	);
};

const isSelectFieldOptionArray = (data: SelectFieldOptionsResponse): data is SelectFieldOption[] => {
	return Array.isArray(data) && data.length > 0 && isSelectFieldOption(data[0]);
};

const extractItemsFromResponse = (data: SelectFieldOptionsResponse): ApiResponseData[] => {
	if (isSelectFieldOptionArray(data)) {
		return [];
	}

	if (Array.isArray(data)) {
		return data as ApiResponseData[];
	}

	if (typeof data === "object" && data !== null && "data" in data) {
		const responseData = data.data;

		if (Array.isArray(responseData)) {
			return responseData as ApiResponseData[];
		}

		if (typeof responseData === "object" && responseData !== null && "items" in responseData) {
			const listData = responseData as { items: ApiResponseData[] };
			return Array.isArray(listData.items) ? listData.items : [];
		}
	}

	return [];
};

const transformItemToOption = (
	item: ApiResponseData,
	valueField: string,
	labelField: string
): SelectFieldOption | null => {
	if (!item || typeof item !== "object") {
		return null;
	}

	const value = item[valueField];
	const label = item[labelField];

	if (value == null || label == null) {
		return null;
	}

	return {
		value: String(value),
		label: String(label),
	};
};

const transformItemsToOptions = (
	items: ApiResponseData[],
	valueField: string,
	labelField: string
): SelectFieldOption[] => {
	return items
		.map((item) => transformItemToOption(item, valueField, labelField))
		.filter((item): item is SelectFieldOption => item !== null && Boolean(item.value) && Boolean(item.label));
};

const useSelectFieldOptionsQuery = ({
	endpoint,
	queryKey,
	valueField = "id",
	labelField = "name",
	queryParams,
	transformResponse,
}: UseSelectFieldOptionsParams) => {
	return useQuery<SelectFieldOptionsResponse, Error, SelectFieldOption[]>({
		queryKey: [queryKey, queryParams],
		queryFn: async () => {
			const response = await selectFieldOptionsApi.getOptions(endpoint, queryParams);
			return response.data;
		},
		select: (data): SelectFieldOption[] => {
			if (isSelectFieldOptionArray(data)) {
				return data;
			}

			const items = extractItemsFromResponse(data);

			if (items.length === 0) {
				return [];
			}

			if (transformResponse) {
				return transformResponse(items);
			}

			const firstItem = items[0];
			const hasLabelAndValue = isSelectFieldOption(firstItem);
			const usingDefaultFields = valueField === "id" && labelField === "name";

			if (hasLabelAndValue && usingDefaultFields) {
				return transformItemsToOptions(items, "value", "label");
			}

			return transformItemsToOptions(items, valueField, labelField);
		},
	});
};

export default useSelectFieldOptionsQuery;

