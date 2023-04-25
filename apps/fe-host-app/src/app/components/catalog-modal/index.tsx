import React from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { css } from '@emotion/react';
import { useForm, useWatch, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { ICatalogCreate } from '@myworkspace/common';
import { useCreateCatalogMutation, useUpdateCatalogMutation } from '../../features/client/api';
import { useAuth } from '../../hooks/useAuth';

interface IProps {
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
    input: css`
        margin-top: 10px;
    `,
    button: css`
        align-self: flex-end;
    `,
    select: css`
        width: 100%;
    `,
    closeButton: css`
        position: absolute;
        top: 16px;
        right: 16px;
    `,
};

export const CatalogModal: React.FC<IProps> = ({ onOpen, onClose, currentCatalogId }) => {
    const [createCatalog, { isLoading: isCreateLoading }] = useCreateCatalogMutation();
    const [updateCatalog, { isLoading: isUpdateLoading }] = useUpdateCatalogMutation();

    const { client, setClientData, isLoading: isAuthLoading } = useAuth();
    const currentCatalog = client?.catalogs.find((i) => i.id === currentCatalogId);

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

    const isSubmitDisabled = !isDirty || !isValid || isValidating;
    console.log(isSubmitDisabled);

    const isPrimary = useWatch<Omit<ICatalogCreate, 'clientId'>, ['isPrimary']>({
        control,
        name: ['isPrimary'],
    });

    React.useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const isLoading = isCreateLoading || isAuthLoading || isUpdateLoading;

    const onSubmit = React.useCallback(
        async (data: Omit<ICatalogCreate, 'clientId'>) => {
            const clientId = client?.id ?? null;

            if (!clientId) {
                return;
            }

            const catalogData = {
                clientId,
                ...data,
            };

            const res = currentCatalog
                ? await updateCatalog({ id: currentCatalog.id, ...catalogData })
                : await createCatalog(catalogData);

            if ('data' in res) {
                setClientData?.(res.data);
                onClose();
                reset(defaultValues);
            }
        },
        [client?.id, currentCatalog, updateCatalog, createCatalog, setClientData, onClose, reset, defaultValues],
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
                    {!currentCatalog && (
                        <FormControl css={styles.input}>
                            <TextField
                                size="small"
                                disabled={isLoading}
                                label="Name"
                                {...register('name', { required: true })}
                                helperText={errors.name?.message ?? ''}
                            />
                        </FormControl>
                    )}
                    <FormControl css={styles.input}>
                        <TextField
                            size="small"
                            defaultValue={defaultValues?.vertical}
                            select
                            label="Variant"
                            disabled={isLoading}
                            {...register('vertical', { required: true })}
                            css={styles.select}
                            helperText={errors.vertical?.message ?? ''}
                        >
                            <MenuItem value="home">Home</MenuItem>
                            <MenuItem value="general">General</MenuItem>
                            <MenuItem value="fashion">Fashion</MenuItem>
                        </TextField>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox {...register('isPrimary')} checked={isPrimary[0] || false} color="primary" />
                        }
                        label="Primary"
                    />

                    <Button disabled={isSubmitDisabled} variant="contained" type="submit" css={styles.button}>
                        Save
                    </Button>
                </form>
            </div>
        </Modal>
    );
};
