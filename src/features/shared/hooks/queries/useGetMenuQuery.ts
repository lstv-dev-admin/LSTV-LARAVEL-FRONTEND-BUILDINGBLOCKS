import { useEffect } from 'react';

// Features
import { IMenuItem } from '@features/shared/types';
import { sharedApi } from '../../api';

// Libs
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

// Utils
import { useMenuStore } from '@/stores/useMenuStore';

const useGetMenuQuery = ({ enabled }: { enabled?: boolean } = {}) => {
    const { setMenuTree, setLoadingState } = useMenuStore();
    const query = useQuery<IMenuItem[], AxiosError>({
        queryKey: ['menu-list-query'],
        queryFn: async () => {
            const { data } = await sharedApi.getMenu();
            return data;
        },
        enabled,
    });

    useEffect(() => {
        setLoadingState(query.isLoading, query.isFetching, query.isError || false);
    }, [query.isLoading, query.isFetching, query.isError, setLoadingState]);

    useEffect(() => {
        if (!query.isLoading && !query.isFetching && query.data) {
            setMenuTree(query.data);
        }
    }, [query.data, query.isLoading, query.isFetching, setMenuTree]);

    return query;
};

export default useGetMenuQuery;

