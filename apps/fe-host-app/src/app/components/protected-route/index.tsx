import React from 'react';
import type { PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/consts';

import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const user = useAuth();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (user.error?.status === 401 || !user) {
        return <Navigate to={APP_ROUTES.USER.LOGIN.PATH} />;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    } else if (user.error?.status === 400) {
        return <Navigate to={APP_ROUTES.USER.REGISTER.PATH} />;
    }

    return <div>{children}</div>;
};
