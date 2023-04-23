import React from 'react';

import { Box } from '@mui/material';
import { Title } from './title';
import { Table } from './table';
import { EVertical } from '@myworkspace/common';

const MOCKS = [
    {
        id: '1',
        name: 'catalog1',
        vertical: EVertical.FASHION,
        isPrimary: false,
    },
    {
        id: '2',
        name: 'catalog2',
        vertical: EVertical.GENERAL,
        isPrimary: true,
    },
    {
        id: '3',
        name: 'catalog2',
        vertical: EVertical.HOME,
        isPrimary: false,
    },
];

export const CatalogsPage: React.FC = () => (
    <Box padding={6}>
        <Title />
        <Table data={MOCKS} isLoading={false} isFetching={false} />
    </Box>
);
