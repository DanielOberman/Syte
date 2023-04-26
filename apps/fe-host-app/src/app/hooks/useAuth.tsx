import 'core-js/modules/es.array.iterator';
import React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { IClient } from '@myworkspace/common';

import { useGetClientQuery } from '../features/client/api';

interface IAuthContext {
    client?: IClient | undefined;
    error: FetchBaseQueryError | SerializedError | undefined;
    setClientData?: React.Dispatch<React.SetStateAction<IClient | undefined>>;
    isLoading: boolean;
    isFetching: boolean;
}

export const AuthContext = React.createContext<IAuthContext>({
    client: undefined,
    error: undefined,
    setClientData: undefined,
    isLoading: false,
    isFetching: false,
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [client, setClientData] = React.useState<IClient | undefined>(undefined);

    const { data, error, isLoading, isFetching } = useGetClientQuery({});

    React.useEffect(() => {
        if (data) setClientData(data);
    }, [data]);

    const ctx: IAuthContext = React.useMemo(
        () => ({ client, error, setClientData, isLoading, isFetching }),
        [client, error, setClientData, isLoading, isFetching],
    );

    return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};
