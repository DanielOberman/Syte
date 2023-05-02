import React from 'react';
import { Box, Button, Checkbox, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { css } from '@emotion/react';
import { useForm, useFormState, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CODE, ICatalog, ICatalogCreate, MESSAGE } from '@myworkspace/common';

import { useCreateCatalogMutation, useUpdateCatalogMutation } from '../../features/client/api';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from '../../hooks/useSnackBar';

import { schema } from './schema';

interface IProps {
    data?: ICatalog[];
    onOpen: boolean;
    onClose: () => void;
    currentCatalogId: string | null;
}

const styles = {
    modal: css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        background-color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        padding: 24px;
        outline: none;
        display: flex;
        gap: 16px;
        flex-direction: column;
    `,
    form: css`
        display: flex;
        flex-direction: column;
        gap: 16px;
    `,
    button: css`
        align-self: flex-end;
    `,
    closeButton: css`
        position: absolute;
        top: 16px;
        right: 16px;
    `,
};

/**
 * Modal component used for adding or editing a catalog.
 */
export const CatalogModal: React.FC<IProps> = ({ data, onOpen, onClose, currentCatalogId }) => {
    /** Method to create a new catalog */
    const [createCatalog, { isLoading: isCreateLoading }] = useCreateCatalogMutation();
    /** Method to update a new catalog */
    const [updateCatalog, { isLoading: isUpdateLoading }] = useUpdateCatalogMutation();
    const { setValue } = useSnackbar();

    /** Get client info */
    const { client, setClientData, isLoading: isAuthLoading } = useAuth();
    const currentCatalog = client?.catalogs.find((i) => i.id === currentCatalogId);

    /** Default values for the catalog form */
    const defaultValues = React.useMemo(() => {
        if (currentCatalog) {
            return {
                name: currentCatalog.name,
                vertical: currentCatalog.vertical,
                isPrimary: currentCatalog.isPrimary,
            };
        }
        return {};
    }, [currentCatalog]);

    /** React-hook-form */
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<Omit<ICatalogCreate, 'clientId'>>({
        defaultValues,
        resolver: yupResolver(schema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
    });
    const { isDirty, isValid, isValidating } = useFormState({ control });

    const isSubmitDisabled = React.useMemo(
        () => !isDirty || !isValid || isValidating || !!Object.keys(errors).length,
        [isDirty, isValid, isValidating, errors],
    );

    /** Reset react-hook-form */
    React.useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const isLoading = isCreateLoading || isAuthLoading || isUpdateLoading;

    const onSubmit = React.useCallback(
        async (value: Omit<ICatalogCreate, 'clientId'>) => {
            const clientId = client?.id ?? null;

            if (!clientId) {
                return;
            }

            if (currentCatalogId) {
                const isCurrentCatalogPrimary = data?.find((i) => i.id === currentCatalogId && i.isPrimary);

                if (isCurrentCatalogPrimary) {
                    setValue?.({
                        active: true,
                        message: MESSAGE.CATALOG.UPDATE_ERROR,
                        severity: 'warning',
                    });
                    return;
                }
            }

            const catalogData = {
                clientId,
                ...value,
            };

            const res = currentCatalog
                ? await updateCatalog({ id: currentCatalog.id, ...catalogData })
                : await createCatalog(catalogData);

            if ('error' in res && 'status' in res.error && res.error.status === CODE.EXIST) {
                setValue?.({
                    active: true,
                    message: MESSAGE.CATALOG.EXIST,
                    severity: 'error',
                });
            }

            if ('data' in res) {
                setValue?.({
                    active: true,
                    message: currentCatalog ? MESSAGE.CATALOG.UPDATE : MESSAGE.CATALOG.CREATE,
                    severity: 'success',
                });
                setClientData?.(res.data);
                onClose();
                reset(defaultValues);
            }
        },
        [
            client?.id,
            currentCatalog,
            updateCatalog,
            createCatalog,
            setValue,
            setClientData,
            onClose,
            reset,
            defaultValues,
        ],
    );

    return (
        <Modal open={onOpen}>
            <div css={styles.modal}>
                <Typography fontWeight={300} variant="h5">
                    {currentCatalog ? 'Edit catalog' : 'Add catalog'}
                </Typography>
                <IconButton css={styles.closeButton} aria-label="close" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                <form css={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value}
                                size="small"
                                disabled={isLoading || !!currentCatalog}
                                label="Name"
                                {...register('name')}
                                onChange={(event) => {
                                    field.onChange(event.target.value);
                                }}
                                helperText={errors.name?.message ?? ''}
                            />
                        )}
                    />
                    <Controller
                        name="vertical"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                size="small"
                                defaultValue={field.value}
                                select
                                label="Vertical"
                                {...register('vertical')}
                                disabled={isLoading || !!currentCatalog}
                                helperText={errors.vertical?.message ?? ''}
                            >
                                <MenuItem value="home">Home</MenuItem>
                                <MenuItem value="general">General</MenuItem>
                                <MenuItem value="fashion">Fashion</MenuItem>
                            </TextField>
                        )}
                    />
                    <Box display="flex" alignItems="center" gap={1}>
                        <Controller
                            name="isPrimary"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    {...register('isPrimary')}
                                    // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    //     console.log(event);
                                    //     console.log(field.onChange);
                                    // }}
                                    checked={field.value || false}
                                    color="primary"
                                />
                            )}
                        />
                        <Typography fontWeight={300} variant="body1">
                            Primary
                        </Typography>
                    </Box>

                    <Button disabled={isSubmitDisabled} variant="contained" type="submit" css={styles.button}>
                        Save
                    </Button>
                </form>
            </div>
        </Modal>
    );
};
