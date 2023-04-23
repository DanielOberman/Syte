import { css } from '@emotion/react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, Typography } from '@mui/material';

import { schema } from './schema';
import { IUser } from '@myworkspace/common';
import { useUserRegisterMutation } from '../../features/user/api';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/consts';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<IUser>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
    });

    const { isDirty, isValid, isValidating } = useFormState({ control });
    const isSubmitDisabled = !isDirty || !isValid || isValidating;

    const [userRegister, { isLoading }] = useUserRegisterMutation();

    const onSubmit = (data: IUser) => {
        userRegister(data).then((res) => {
            if ('data' in res) {
                navigate(APP_ROUTES.MAIN.PATH);
            }
            // TODO: Create exception
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
                <Typography textAlign="center" variant="h3">
                    Sign In
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
                <Button variant="contained" type="submit" disabled={isSubmitDisabled || isLoading}>
                    Submit
                </Button>
            </form>
        </Box>
    );
};
