import 'core-js/modules/es.array.iterator';
import React from 'react';
import { IClient } from '@myworkspace/common';
import { useGetClientQuery } from '../features/client/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';

interface IAuthContext {
    client: IClient;
    error: FetchBaseQueryError | SerializedError | undefined;
}

export const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

const { Provider } = AuthContext;

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { data, error } = useGetClientQuery({});

    const ctx: IAuthContext | undefined = React.useMemo(() => ({ client: data, error }), [data, error]);

    return <Provider value={ctx}>{children}</Provider>;
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};
