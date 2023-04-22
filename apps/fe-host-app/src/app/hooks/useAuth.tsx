import 'core-js/modules/es.array.iterator';
import React from 'react';
import { IUser } from '@myworkspace/common';
import { useGetUserQuery } from '../features/user/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';

interface IAuthContext {
    user: IUser;
    error: FetchBaseQueryError | SerializedError | undefined;
}

export const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

const { Provider } = AuthContext;

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { data, error } = useGetUserQuery({});

    const ctx: IAuthContext | undefined = React.useMemo(() => ({ user: data, error }), [data, error]);

    return <Provider value={ctx}>{children}</Provider>;
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};
