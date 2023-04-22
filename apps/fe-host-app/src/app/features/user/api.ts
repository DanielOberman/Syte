import { IUser } from '@myworkspace/common';

import { baseApi } from '../../services/ApiService/baseApi';

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userLogin: builder.mutation<IUser, IUser>({
            query: (name) => ({
                url: `user/login`,
                method: 'POST',
                body: name,
            }),
        }),
        userRegister: builder.mutation<IUser, IUser>({
            query: (name) => ({
                url: `user/register`,
                method: 'POST',
                body: name,
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: `user`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useUserLoginMutation, useUserRegisterMutation, useGetUserQuery } = userApi;
