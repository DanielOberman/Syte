import React from 'react';

import { css } from '@emotion/react';
import { ICatalog } from '@myworkspace/common';
import { Box, Button, Chip, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type {
    GridCellParams,
    GridColDef,
    GridRowSelectionModel,
    GridCallbackDetails,
    GridInputRowSelectionModel,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { ReactComponent as EmptyLogo } from '../icon.svg';

const styles = {
    table: () => css`
        border: 0;

        .MuiDataGrid-sortIcon {
            color: #000;
        }

        .edit {
            display: none;
        }

        .MuiDataGrid-row {
            &:hover {
                .edit {
                    display: flex;
                }
            }
        }
    `,
};

interface IProps {
    data?: ICatalog[];
    rowSelectionModel: string[];
    onRowSelectionModelChange: React.Dispatch<React.SetStateAction<string[]>>;
    onAdd: () => void;
    onDelete: (catalogIds: string[]) => void;
    onEdit: (projectId?: string) => void;
    isLoading: boolean;
}

/** Table with catalogs data */
export const Table: React.FC<IProps> = ({
    data,
    rowSelectionModel,
    onRowSelectionModelChange,
    onAdd,
    onDelete,
    onEdit,
    isLoading,
}) => {
    const columns: GridColDef<ICatalog>[] = React.useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Name',
                flex: 1,
                renderCell: ({ id, value }: GridCellParams<ICatalog, string>) => (
                    <Tooltip title={value} placement="top-start">
                        <Typography className="engagementName" variant="body2" noWrap>
                            {value}
                        </Typography>
                    </Tooltip>
                ),
            },
            {
                field: 'vertical',
                headerName: 'Vertical',
                width: 300,
                renderCell: ({ id, value }: GridCellParams<ICatalog, string>) => (
                    <Tooltip title={value} placement="top-start">
                        <Typography className="engagementName" variant="body2" noWrap>
                            {value}
                        </Typography>
                    </Tooltip>
                ),
            },
            {
                field: 'isPrimary',
                headerName: 'Status',
                width: 300,
                renderCell: ({ id, value }: GridCellParams<ICatalog, ICatalog>) => (
                    <Box height="100%" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                        {value ? (
                            <Chip size="small" label="Primary" color="info" variant="outlined" />
                        ) : (
                            <div>{''}</div>
                        )}
                        <Box className="edit">
                            <Button onClick={() => onEdit(id as string)}>
                                <EditIcon />
                            </Button>
                            {id && !value && data && data.length > 1 && (
                                <Button onClick={() => onDelete([id as string])}>
                                    <DeleteOutlineIcon color="warning" />
                                </Button>
                            )}
                        </Box>
                    </Box>
                ),
            },
        ],
        [data, onEdit, onDelete],
    );

    /** Select rows for deleting */
    const handleRowSelectionChange = (rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails<any>) => {
        onRowSelectionModelChange(rowSelectionModel as string[]);
    };

    return data?.length ? (
        <DataGrid
            rowSelectionModel={rowSelectionModel as GridInputRowSelectionModel}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleRowSelectionChange}
            css={styles.table}
            rows={data}
            columns={columns}
            hideFooter={true}
            autoHeight={true}
            disableColumnMenu={true}
            sortingMode="client"
            loading={isLoading}
            getRowId={(row) => row.id}
        />
    ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column" gap={2}>
            <EmptyLogo />
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={4}>
                <Typography color="#939DB7" variant="h6">
                    NOTHING HERE YET
                </Typography>
                <Button size="medium" onClick={() => onAdd()} variant="contained">
                    Create catalog
                </Button>
            </Box>
        </Box>
    );
};
