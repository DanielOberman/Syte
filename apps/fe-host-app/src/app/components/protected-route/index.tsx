import React from 'react';
import type { PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/consts';

import { useAuth } from '../../hooks/useAuth';
import { IUser, IUserError } from '@myworkspace/common';

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const user = useAuth() as IUser | IUserError;

    if ('error' in user) {
        if (user.error?.status === 401 || !user) {
            return <Navigate to={APP_ROUTES.USER.LOGIN.PATH} />;
        } else if (user.error?.status === 400) {
            return <Navigate to={APP_ROUTES.USER.REGISTER.PATH} />;
        }
    }

    return <div>{children}</div>;
};
