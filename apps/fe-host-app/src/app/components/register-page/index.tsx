import { css } from '@emotion/react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

import { IClient, MESSAGE, CODE } from '@myworkspace/common';
import { useClientRegisterMutation } from '../../features/client/api';
import { APP_ROUTES } from '../../routes/consts';
import { useSnackbar } from '../../hooks/useSnackBar';
import { Snackbar } from '../Snackbar';
import { useAuth } from '../../hooks/useAuth';

import { schema } from './schema';

export const RegisterPage: React.FC = () => {
    const { client, isFetching: isClientFetching, isLoading: isClientLoading } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<IClient>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
    });
    const { value, setValue } = useSnackbar();
    const { isDirty, isValid, isValidating } = useFormState({ control });
    const [clientRegister, { isLoading: isRegisterLoading }] = useClientRegisterMutation();

    const isSubmitDisabled = !isDirty || !isValid || isValidating || isRegisterLoading;

    const onSubmit = (data: IClient) => {
        clientRegister(data)
            .then((res) => {
                if ('error' in res && 'status' in res.error && res.error.status === CODE.EXIST) {
                    setValue?.({
                        active: true,
                        message: MESSAGE.CLIENT.EXIST,
                        severity: 'error',
                    });
                } else if ('data' in res) {
                    window.location.pathname = APP_ROUTES.CATALOGS.PATH;
                }
            })
            .catch(() =>
                setValue?.({
                    active: true,
                    message: MESSAGE.REGISTER.ERROR,
                    severity: 'error',
                }),
            );
    };

    if (client) window.location.pathname = APP_ROUTES.CATALOGS.PATH;
    const isLoading = isClientFetching || isClientLoading;

    const content = isLoading ? (
        <CircularProgress />
    ) : (
        <>
            <form
                css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 1rem;
                    width: 400px;
                    margin: 0 auto;
                `}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography textAlign="start" variant="h3" fontWeight={300}>
                    Register
                </Typography>

                <TextField
                    disabled={isRegisterLoading}
                    label="Email"
                    type="email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message ? 'Incorrect email' : ''}
                    {...register('email')}
                />
                <TextField
                    disabled={isRegisterLoading}
                    label="Password"
                    type="password"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message ? 'Incorrect password' : ''}
                    {...register('password')}
                />
                <Box display="flex" gap={4} justifyContent="flex-end">
                    <Button
                        variant="text"
                        onClick={() => (window.location.pathname = APP_ROUTES.CLIENT.LOGIN.PATH)}
                        disabled={isRegisterLoading}
                    >
                        Login
                    </Button>
                    <Button variant="contained" type="submit" disabled={isSubmitDisabled}>
                        Sign Up
                    </Button>
                </Box>
            </form>
            {value?.active && <Snackbar value={value} onChange={setValue} />}
        </>
    );

    return (
        <Box width="100%" display="flex" height="100%" justifyContent="center" alignItems="center">
            {content}
        </Box>
    );
};
