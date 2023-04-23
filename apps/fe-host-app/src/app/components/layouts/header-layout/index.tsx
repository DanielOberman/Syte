import React from 'react';

import { Toolbar, AppBar, css, Stack } from '@mui/material';

import { HEADER_HEIGHT } from '../consts';

interface IHeader {
    leftSide?: React.ReactNode;
    rightSide?: React.ReactNode;
}

export const HeaderLayout: React.FC<IHeader> = ({ leftSide, rightSide }) => {
    const styles = {
        bar: () => css`
            border-bottom: 1px solid, #000, 0.5)};
            height: ${HEADER_HEIGHT}px;
        `,
        toolbar: () => css`
            height: inherit;
        `,
    };

    return (
        <AppBar color="transparent" position="static" elevation={4} css={styles.bar}>
            <Toolbar disableGutters={true} variant="dense" css={styles.toolbar}>
                <Stack direction="row" justifyContent="space-between" flex={1}>
                    {leftSide}
                    {rightSide}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
