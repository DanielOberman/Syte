import type {} from '@mui/x-data-grid/themeAugmentation';

import { createTheme } from '@mui/material';
import type * as MaterialTheme from '@mui/material/styles';

const brandThemeOptions: MaterialTheme.ThemeOptions = {
    components: {
        MuiDataGrid: {
            styleOverrides: {
                cell: {
                    borderColor: 'transparent',
                    outline: 'none!important',

                    '&:focus': {
                        borderColor: 'transparent',
                        outline: 'none',
                    },
                },
                columnHeader: {
                    '&:focus-within': {
                        borderColor: 'transparent',
                        outline: 'none',
                    },
                },
            },
        },
    },
};

export const BRAND_THEME = createTheme(brandThemeOptions);
