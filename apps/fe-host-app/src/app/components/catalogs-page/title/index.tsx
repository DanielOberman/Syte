import React from 'react';

import { Box, Stack, Typography, Button } from '@mui/material';

interface IProps {
    onAdd: (projectId?: string) => void;
    showButton: boolean;
}

export const Title: React.FC<IProps> = ({ onAdd, showButton }) => (
    <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight="300" variant="h4">
                Catalogs
            </Typography>
            {showButton && (
                <Button color="primary" size="medium" onClick={() => onAdd()} variant="contained">
                    Create catalog
                </Button>
            )}
        </Stack>
    </Box>
);
