import React from 'react';

import { Box, css } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { HEADER_HEIGHT } from '../consts';

interface IBaseLayout {
    header: React.ReactNode;
}

const styles = {
    root: () => css`
        height: 100%;
    `,
    body: () => css`
        height: calc(100% - ${HEADER_HEIGHT}px);
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
