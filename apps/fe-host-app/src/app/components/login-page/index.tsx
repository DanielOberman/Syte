import { css } from '@emotion/react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

import { CODE, IClient, MESSAGE } from '@myworkspace/common';
import { useClientLoginMutation } from '../../features/client/api';
import { APP_ROUTES } from '../../routes/consts';
import { useSnackbar } from '../../hooks/useSnackBar';
import { Snackbar } from '../Snackbar';
import { useAuth } from '../../hooks/useAuth';

import { schema } from './schema';

/** Login page */
export const LoginPage: React.FC = () => {
    const { client, isLoading: isClientLoading, isFetching: isClientFetching } = useAuth();

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
    /** React-hook-form */
    const { isDirty, isValid, isValidating } = useFormState({ control });

    /** Login */
    const [clientLogin, { isLoading: isLoginLoading }] = useClientLoginMutation();

    /** Desable inputs and button */
    const isSubmitDisabled = !isDirty || !isValid || isValidating || isLoginLoading;

    if (client) window.location.pathname = APP_ROUTES.CATALOGS.PATH;
    const isLoading = isClientFetching || isClientLoading;

    const onSubmit = (data: IClient) => {
        clientLogin(data)
            .then((res) => {
                if ('error' in res && 'status' in res.error && res.error.status === CODE.NOT_FOUND) {
                    setValue?.({
                        active: true,
                        message: MESSAGE.CLIENT.NOT_FOUND,
                        severity: 'error',
                    });
                } else if ('data' in res) {
                    window.location.pathname = APP_ROUTES.CATALOGS.PATH;
                }
            })
            .catch(() =>
                setValue?.({
                    active: true,
                    message: MESSAGE.LOGIN.ERROR,
                    severity: 'error',
                }),
            );
    };

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
                    Sign in
                </Typography>

                <TextField
                    disabled={isLoginLoading}
                    label="Email"
                    type="email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message ? 'Incorrect email' : ''}
                    {...register('email')}
                />
                <TextField
                    disabled={isLoginLoading}
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
                        onClick={() => (window.location.pathname = APP_ROUTES.CLIENT.REGISTER.PATH)}
                        disabled={isLoginLoading}
                    >
                        Sign up
                    </Button>
                    <Button variant="contained" type="submit" disabled={isSubmitDisabled}>
                        Sign in
                    </Button>
                </Box>
            </form>
            {value?.active && <Snackbar value={value} onChange={setValue} />}
        </>
    );

    return (
        <Box display="flex" height="100%" justifyContent="center" alignItems="center">
            {content}
        </Box>
    );
};
