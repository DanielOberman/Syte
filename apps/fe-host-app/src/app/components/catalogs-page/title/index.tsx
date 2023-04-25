import React from 'react';

import { Box, Stack, Typography, Button } from '@mui/material';

interface IProps {
    actionTitle: string;
    onClick: () => void;
    showButton: boolean;
}

export const Title: React.FC<IProps> = ({ actionTitle, onClick, showButton }) => (
    <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight="300" variant="h4">
                Catalogs
            </Typography>
            {showButton && (
                <Button color="primary" size="medium" onClick={() => onClick()} variant="contained">
                    {actionTitle}
                </Button>
            )}
        </Stack>
    </Box>
);
