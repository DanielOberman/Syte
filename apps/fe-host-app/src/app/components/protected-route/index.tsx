import React from 'react';
import type { PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/consts';

import { useAuth } from '../../hooks/useAuth';
import { IClient, IClientError } from '@myworkspace/common';

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const client = useAuth() as IClient | IClientError;

    if ('error' in client && client.error?.originalStatus > 210) {
        return <Navigate to={APP_ROUTES.CLIENT.REGISTER.PATH} />;
    }

    return <div>{children}</div>;
};
