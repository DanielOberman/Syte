import { IClient } from '@myworkspace/common';

import { baseApi } from '../../services/ApiService/baseApi';

const clientApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        clientLogin: builder.mutation<IClient, IClient>({
            query: (name) => ({
                url: `client/login`,
                method: 'POST',
                body: name,
            }),
        }),
        clientRegister: builder.mutation<IClient, IClient>({
            query: (name) => ({
                url: `client/register`,
                method: 'POST',
                body: name,
            }),
        }),
        getClient: builder.query({
            query: () => ({
                url: `client`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useClientLoginMutation, useClientRegisterMutation, useGetClientQuery } = clientApi;
