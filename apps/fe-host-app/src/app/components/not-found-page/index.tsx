import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/consts';

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const goToMainPage = () => navigate(APP_ROUTES.MAIN.PATH);

    return (
        <Box
            gap={8}
            sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box display="flex" flexDirection="column" gap={4} alignItems="center">
                <Typography variant="h2">Page not found</Typography>
                <Button onClick={goToMainPage} variant="outlined" size="medium">
                    Go back to home page
                </Button>
            </Box>
        </Box>
    );
};
