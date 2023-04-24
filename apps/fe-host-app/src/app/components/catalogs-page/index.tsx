import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

import { useAuth } from '../../hooks/useAuth';
import { useDeleteCatalogMutation } from '../../features/client/api';

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
    const { client, setClientData, isLoading, isFetching } = useAuth();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [currentProjectId, setCurrentProjectId] = React.useState<string | null>(null);

    const [deleteCatalog, { isLoading: isDeleteLoading }] = useDeleteCatalogMutation();
    const handleOpenModal = (projectId?: string) => {
        setCurrentProjectId(projectId ?? null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentProjectId(null);
    };

    const handleCatalogDelete = (catalogIds: string[]) => {
        const clientId = client?.id;

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
            <Title onAdd={handleOpenModal} />
            <Table
                onDelete={handleCatalogDelete}
                onEdit={handleOpenModal}
                data={client?.catalogs}
                isLoading={isLoading || isFetching || isDeleteLoading}
            />
            {/* <Modal onOpen={modalOpen} onClose={handleCloseModal} currentProjectId={currentProjectId} /> */}
        </>
    );

    return (
        <Box css={isLoading ? styles.empty : null} padding={6}>
            {content}
        </Box>
    );
};
