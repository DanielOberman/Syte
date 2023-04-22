import React from 'react';

import { Box, css } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { HEADER_HEIGHT, MIN_SCREEN_SIZE } from '../consts';

interface IBaseLayout {
    header: React.ReactNode;
}

const styles = {
    root: () => css`
        height: 100%;
        min-width: ${MIN_SCREEN_SIZE}px;
    `,
    body: () => css`
        height: calc(100% - ${HEADER_HEIGHT}px);
        min-width: ${MIN_SCREEN_SIZE}px;
        position: relative;
    `,
};

export const PageLayout: React.FC<IBaseLayout> = ({ header }) => (
    <Box css={styles.root}>
        {header}
        <Box css={styles.body}>
            <Outlet />
        </Box>
    </Box>
);
