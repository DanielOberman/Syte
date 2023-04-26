import React from 'react';
import type { PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/consts';

import { useAuth } from '../../hooks/useAuth';
import { IClientError } from '@myworkspace/common';

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const client = useAuth() as IClientError;
    console.log(client);
    try {
        if (
            (client?.error?.status && client?.error.status === 403) ||
            (client?.error?.originalStatus && client.error.originalStatus > 300)
        ) {
            return <Navigate to={APP_ROUTES.CLIENT.REGISTER.PATH} />;
        } else if (client?.error?.status && client.error.status === 401) {
            return <Navigate to={APP_ROUTES.CLIENT.LOGIN.PATH} />;
        }
    } catch (err) {
        console.log(err);
    }

    return <div>{children}</div>;
};
