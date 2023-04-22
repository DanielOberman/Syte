import 'core-js/modules/es.array.iterator';
import * as React from 'react';
import { IUser } from '@myworkspace/common';

export const AuthContext = React.createContext<IUser | null>(null);

const { Provider } = AuthContext;

export const AuthProvider = React.memo<React.PropsWithChildren>(({ children }) => {
    const [user, setUser] = React.useState<IUser | null>(null);

    const ctx: IUser | null = React.useMemo(() => user, [user]);

    return <Provider value={ctx}>{children}</Provider>;
});

export const useAuth = () => {
    return React.useContext(AuthContext);
};
