type QueryKeyParams = Record<string, unknown>;

export const createQueryKey = (path: string[]) => ({
    list: (): [...string[], "list"] => [...path, "list"],
    detail: (id: string | number): [...string[], "detail", string | number] => [...path, "detail", id],
    search: (params: QueryKeyParams): [...string[], "search", QueryKeyParams] => [...path, "search", params],
    paginated: (page: number, params: QueryKeyParams = {}): [...string[], "page", number, QueryKeyParams] => [...path, "page", page, params],
    infinite: (params: QueryKeyParams): [...string[], "infinite", QueryKeyParams] => [...path, "infinite", params],
});