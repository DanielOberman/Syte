import React from 'react';
import type { PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/consts';

import { useAuth } from '../../hooks/useAuth';
import { IClient, IClientError } from '@myworkspace/common';

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const client = useAuth() as IClient | IClientError;

    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if ('error' in client && 'data' in client.error && client?.error.data?.status > 210) {
            return <Navigate to={APP_ROUTES.CLIENT.REGISTER.PATH} />;
        }
    } catch (err) {
        console.log(err);
    }

    return <div>{children}</div>;
};
