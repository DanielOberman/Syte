import React from 'react';

import { Box, Stack, Typography, Button } from '@mui/material';

interface IProps {
    onAdd: (projectId?: string) => void;
}

export const Title: React.FC<IProps> = ({ onAdd }) => (
    <Box height="100%">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight="600" variant="h5">
                Catalogs
            </Typography>
            <Button color="primary" size="medium" onClick={() => onAdd()} variant="contained">
                Create catalog
            </Button>
        </Stack>
    </Box>
);
