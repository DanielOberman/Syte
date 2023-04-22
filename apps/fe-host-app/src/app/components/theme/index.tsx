import type { FC, PropsWithChildren } from 'react';

import { css, CssBaseline, GlobalStyles } from '@mui/material';

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

                #root > div {
                    height: 100%;
                }
            `}
        />
        {children}
    </div>
);
