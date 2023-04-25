import React from 'react';

import { ISnackbar } from '@myworkspace/common';

export interface ISnackbarContext {
    value?: ISnackbar;
    setValue?: (value?: ISnackbar) => void;
}

export const SnackbarContext = React.createContext<ISnackbarContext>({
    value: undefined,
    setValue: undefined,
});

export const SnackbarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [value, setValue] = React.useState<ISnackbar>();

    const ctx: ISnackbarContext = React.useMemo(() => ({ value, setValue }), [value, setValue]);

    return <SnackbarContext.Provider value={ctx}>{children}</SnackbarContext.Provider>;
};

export const useSnackbar = () => {
    return React.useContext(SnackbarContext);
};
