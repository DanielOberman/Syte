import React from 'react';

import { Snackbar as MuiSnackbar, Alert } from '@mui/material';
import { ISnackbar } from '@myworkspace/common';

interface IProps {
    value: ISnackbar;
    onChange: ((value?: ISnackbar | undefined) => void) | undefined;
}

export const Snackbar: React.FC<IProps> = ({ value, onChange }) => (
    <MuiSnackbar open={value?.active} autoHideDuration={4000} onClose={() => onChange?.(undefined)}>
        <Alert severity={value?.severity} sx={{ width: '100%' }}>
            {value?.message}
        </Alert>
    </MuiSnackbar>
);
