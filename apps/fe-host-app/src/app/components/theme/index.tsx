import type { FC, PropsWithChildren } from 'react';

import { css, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';

export const Theme: FC<PropsWithChildren> = ({ children }) => (
    <div>
        <CssBaseline />
        <GlobalStyles
            styles={css`
                html,
                body,
                #root {
                    margin: 0;
                    height: 100%;
                }

                * {
                    box-sizing: border-box;
                }
            `}
        />
        {children}
    </div>
);
