import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Logout as LogoutIcon, ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { Button, ListItemIcon, Menu, MenuItem, Stack, alpha, css } from '@mui/material';
import { useClientLogoutMutation } from '../../features/client/api';
import { APP_ROUTES } from '../../routes/consts';

interface IMenuItem {
    key: string | number;
    title: string;
    action: () => void;
    icon?: React.ReactElement;
}

/** User panel  */
export const UserInfo = () => {
    const userRef = React.useRef(null);

    const [isOpen, isSetOpen] = React.useState(false);
    const [clientLogout] = useClientLogoutMutation();

    const options: IMenuItem[] = [
        {
            key: 1,
            title: 'Sign out',
            action: () => {
                clientLogout({}).then(() => (window.location.pathname = APP_ROUTES.CLIENT.LOGIN.PATH));
            },
            icon: <LogoutIcon color="action" />,
        },
    ];

    return (
        <>
            <Stack spacing={2} direction="row" ref={userRef} onClick={() => isSetOpen(true)}>
                <Button
                    startIcon={<AccountCircleIcon color="primary" />}
                    endIcon={<ArrowDropDownIcon color="primary" />}
                    size="large"
                    css={() => css`
                        color: #16191c;
                        border-radius: 16px;
                        background-color: ${isOpen ? alpha('#406EF1' as string, 0.09) : 'initial'};
                        &:hover: {
                            background-color: ${alpha('#406EF1' as string, 0.09)};
                        }
                    `}
                />
            </Stack>
            <Menu
                open={isOpen}
                onClose={() => isSetOpen(false)}
                anchorEl={userRef.current}
                autoFocus={false}
                PaperProps={{
                    elevation: 6,
                }}
                css={{ borderRadius: '16px' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {options.map((option) => (
                    <MenuItem key={option.key} onClick={option.action}>
                        {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
                        {option.title}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
