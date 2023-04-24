import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

import { useAuth } from '../../hooks/useAuth';
import { useDeleteCatalogMutation } from '../../features/client/api';
import { CatalogModal } from '../catalog-modal';

import { Title } from './title';
import { Table } from './table';

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

    const handleCatalogDelete = (catalogIds: string[]) => {
        const clientId = clientData?.id;

        if (clientId) {
            deleteCatalog({
                clientId,
                catalogIds,
            }).then((res) => {
                if ('data' in res) {
                    setClientData?.(res.data);
                }
            });
        }
    };

    const content = isLoading ? (
        <CircularProgress />
    ) : (
        <>
            <Title onAdd={handleOpenModal} showButton={!!clientData?.catalogs?.length} />
            <Table
                onAdd={handleOpenModal}
                onDelete={handleCatalogDelete}
                onEdit={handleOpenModal}
                data={clientData?.catalogs}
                isLoading={isLoading}
            />
            <CatalogModal onOpen={modalOpen} onClose={handleCloseModal} currentCatalogId={currentCatalogId} />
        </>
    );

    return (
        <Box height="100%" css={isLoading ? styles.empty : null} padding={6} pt={9}>
            {content}
        </Box>
    );
};
