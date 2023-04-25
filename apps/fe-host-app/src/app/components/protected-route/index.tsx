import React from 'react';
import type { PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/consts';

import { useAuth } from '../../hooks/useAuth';
import { IClient, IClientError } from '@myworkspace/common';

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const client = useAuth() as IClient | IClientError;

    if ('error' in client) {
        if (client.error?.status === 401 || client.error?.status === 403) {
            return <Navigate to={APP_ROUTES.CLIENT.REGISTER.PATH} />;
        } else if (client.error?.status === 400) {
            return <Navigate to={APP_ROUTES.CLIENT.REGISTER.PATH} />;
        }
    }

    return <div>{children}</div>;
};
