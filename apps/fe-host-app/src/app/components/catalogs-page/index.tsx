import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

import { useAuth } from '../../hooks/useAuth';
import { useDeleteCatalogMutation } from '../../features/client/api';
import { CatalogModal } from '../catalog-modal';
import { useSnackbar } from '../../hooks/useSnackBar';

import { Title } from './title';
import { Table } from './table';
import { Snackbar } from '../Snackbar';
import { MESSAGE } from '@myworkspace/common';

const styles = {
    empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
};

export const CatalogsPage: React.FC = () => {
    const { client, setClientData, isLoading: isClienLoading, isFetching } = useAuth();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [currentCatalogId, setCurrentCatalogId] = React.useState<string | null>(null);
    const [deleteCatalog, { isLoading: isDeleteLoading }] = useDeleteCatalogMutation();
    const [rowSelectionModel, setRowSelectionModel] = React.useState<string[]>([]);
    const { value, setValue } = useSnackbar();
    const isLoading = isClienLoading || isFetching || isDeleteLoading;
    const clientData = React.useMemo(() => client, [client]);

    const handleOpenModal = (projectId?: string) => {
        setCurrentCatalogId(projectId ?? null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentCatalogId(null);
    };

    const handleRowSelectionDelete = () => {
        const clientId = client?.id;

        const isPrimaryCatalogExists = client?.catalogs.find(
            (catalog) => catalog.isPrimary && rowSelectionModel.includes(catalog.id.toString()),
        );

        if (isPrimaryCatalogExists) {
            setValue?.({ active: true, message: MESSAGE.CATALOG.PRIMARY, severity: 'warning' });
            setRowSelectionModel([]);
            return;
        }

        if (clientId) {
            deleteCatalog({
                clientId,
                catalogIds: rowSelectionModel,
            }).then((res) => {
                if ('data' in res) {
                    setValue?.({ active: true, message: MESSAGE.CATALOG.DELETE, severity: 'success' });
                    setClientData?.(res.data);
                    setRowSelectionModel([]);
                }
            });
        }
    };

    const handleCatalogDelete = (catalogIds: string[]) => {
        const clientId = clientData?.id;

        if (clientId) {
            deleteCatalog({
                clientId,
                catalogIds,
            }).then((res) => {
                if ('data' in res) {
                    setValue?.({ active: true, message: MESSAGE.CATALOG.DELETE, severity: 'success' });
                    setClientData?.(res.data);
                    setRowSelectionModel([]);
                }
            });
        }
    };

    const content = isLoading ? (
        <CircularProgress />
    ) : (
        <>
            <Title
                actionTitle={rowSelectionModel?.length ? 'Delete catalogs' : 'Create catalog'}
                onClick={rowSelectionModel?.length ? handleRowSelectionDelete : handleOpenModal}
                showButton={!!clientData?.catalogs?.length}
            />
            <Table
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={setRowSelectionModel}
                onAdd={handleOpenModal}
                onDelete={handleCatalogDelete}
                onEdit={handleOpenModal}
                data={clientData?.catalogs}
                isLoading={isLoading}
            />
            <CatalogModal onOpen={modalOpen} onClose={handleCloseModal} currentCatalogId={currentCatalogId} />
            {value?.active && <Snackbar value={value} onChange={setValue} />}
        </>
    );

    return (
        <Box height="100%" css={isLoading ? styles.empty : null} padding={6} pt={9}>
            {content}
        </Box>
    );
};
