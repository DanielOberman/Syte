import { css } from '@emotion/react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, Typography } from '@mui/material';

import { schema } from './schema';
import { IClient } from '@myworkspace/common';
import { useClientRegisterMutation } from '../../features/client/api';
import { APP_ROUTES } from '../../routes/consts';

export const RegisterPage: React.FC = () => {
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

    const { isDirty, isValid, isValidating } = useFormState({ control });
    const isSubmitDisabled = !isDirty || !isValid || isValidating;

    const [clientRegister, { isLoading }] = useClientRegisterMutation();

    const onSubmit = (data: IClient) => {
        clientRegister(data).then((res) => {
            if ('data' in res) {
                window.location.pathname = APP_ROUTES.CATALOGS.PATH;
            }
        });
    };

    return (
        <Box display="flex" height="100%" alignItems="center">
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
                    disabled={isLoading}
                    label="Email"
                    type="email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message ? 'Incorrect email' : ''}
                    {...register('email')}
                />
                <TextField
                    disabled={isLoading}
                    label="Password"
                    type="password"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message ? 'Incorrect password' : ''}
                    {...register('password')}
                />
                <Box display="flex" gap={4} justifyContent="flex-end">
                    <Button variant="text" onClick={() => (window.location.pathname = APP_ROUTES.CLIENT.LOGIN.PATH)}>
                        Login
                    </Button>
                    <Button variant="contained" type="submit" disabled={isSubmitDisabled || isLoading}>
                        Sign Up
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
