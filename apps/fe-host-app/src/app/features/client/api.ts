import { ICatalogCreate, ICatalogDelete, ICatalogUpdate, IClient } from '@myworkspace/common';

import { baseApi } from '../../services/ApiService/baseApi';

const clientApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        clientLogin: builder.mutation<IClient, IClient>({
            query: (client) => ({
                url: `client/login`,
                method: 'POST',
                body: client,
            }),
        }),
        clientLogout: builder.mutation({
            query: () => ({
                url: `client/logout`,
                method: 'POST',
            }),
        }),
        clientRegister: builder.mutation<IClient, IClient>({
            query: (client) => ({
                url: `client/register`,
                method: 'POST',
                body: client,
            }),
        }),
        getClient: builder.query({
            query: () => ({
                url: 'client',
                method: 'GET',
            }),
            transformResponse: (response: IClient) => response,
        }),
        deleteCatalog: builder.mutation<IClient, ICatalogDelete>({
            query: (catalog) => ({
                url: `catalog/delete`,
                method: 'DELETE',
                body: catalog,
            }),
        }),
        createCatalog: builder.mutation<IClient, ICatalogCreate>({
            query: (catalog) => ({
                url: `catalog/create`,
                method: 'POST',
                body: catalog,
            }),
        }),
        updateCatalog: builder.mutation<IClient, ICatalogUpdate>({
            query: (catalog) => ({
                url: `catalog/udpate`,
                method: 'PATCH',
                body: catalog,
            }),
        }),
    }),
});

export const {
    useClientLoginMutation,
    useClientLogoutMutation,
    useClientRegisterMutation,
    useGetClientQuery,
    useDeleteCatalogMutation,
    useCreateCatalogMutation,
    useUpdateCatalogMutation,
} = clientApi;
