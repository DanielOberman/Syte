import type { FC, PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/consts';

import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
    const user = useAuth();

    if (!user) {
        return <Navigate to={APP_ROUTES.LOGIN.PATH} />;
    }

    return <div>{children}</div>;
};
