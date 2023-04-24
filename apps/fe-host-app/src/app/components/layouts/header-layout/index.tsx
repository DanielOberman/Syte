import React from 'react';

import { Toolbar, AppBar, css, Stack } from '@mui/material';

import { ReactComponent as Logo } from './logo.svg';

interface IHeader {
    rightSide?: React.ReactNode;
}

export const HeaderLayout: React.FC<IHeader> = ({ rightSide }) => {
    const styles = {
        bar: () => css`
            border-bottom: 1px solid, #000, 0.5)};
        `,
        toolbar: () => css`
            height: inherit;
        `,
    };

    return (
        <AppBar color="transparent" position="static" elevation={4} css={styles.bar}>
            <Toolbar disableGutters={true} variant="dense" css={styles.toolbar}>
                <Stack pl={3} pr={3} padding={2} direction="row" justifyContent="space-between" flex={1}>
                    <Logo />
                    {rightSide}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
