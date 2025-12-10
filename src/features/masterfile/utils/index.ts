export const getMasterfileUrl = (endpoint: string, id?: string | number) => {
    const clean = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
    return id ? `${clean}/${id}` : `${clean}`;
};
