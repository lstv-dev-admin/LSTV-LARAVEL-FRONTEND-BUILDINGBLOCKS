import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface PaginationParams {
    page: number;
    per_page: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    search?: string;
}

const usePagination = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const params: PaginationParams = {
        page: Number(searchParams.get("page")) || 1,
        per_page: Number(searchParams.get("items_per_page")) || 5,
        sort_by: searchParams.get("sort_by") || "",
        sort_order: (searchParams.get("sort_order") as "asc" | "desc") || "desc",
        search: searchParams.get("search") || "",
    };

    const setParam = (key: string, value: string | number | undefined) => {
        const updated = new URLSearchParams(searchParams);
        if (value === undefined || value === "") {
            updated.delete(key);
        } else {
            updated.set(key, String(value));
        }
        setSearchParams(updated);
    };

    const setPage = (page: number) => setParam("page", page);

    const setSearch = (term: string) => {
        const updated = new URLSearchParams(searchParams);
        if (!term) {
            updated.delete("search");
        } else {
            updated.set("search", term);
        }
        updated.set("page", "1");
        setSearchParams(updated);
    };

    const setSort = (sort_by: string, sort_order: "asc" | "desc") => {
        setParam("sort_by", sort_by);
        setParam("sort_order", sort_order);
    };

    const setItemsPerPage = (items: number) => setParam("items_per_page", items);

    return { params, setPage, setSearch, setSort, setItemsPerPage };
};

export default usePagination;