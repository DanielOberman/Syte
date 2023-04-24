import React from 'react';

import { css } from '@emotion/react';
import { ICatalog } from '@myworkspace/common';
import { Box, Button, Chip, Tooltip, Typography, ButtonGroup } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridCellParams, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
    onDelete: (catalogIds: string[]) => void;
    onEdit: (projectId?: string) => void;
    isLoading: boolean;
}

export const Table: React.FC<IProps> = ({ data, onDelete, onEdit, isLoading }) => {
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
                field: 'isPrimary',
                headerName: 'Status',
                flex: 1,
                renderCell: ({ id, value }: GridCellParams<ICatalog, ICatalog>) => {
                    const currentId = id as string;

                    return (
                        <Box
                            height="100%"
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            {value ? (
                                <Chip size="small" label="Primary" color="info" variant="outlined" />
                            ) : (
                                <div>{''}</div>
                            )}
                            <ButtonGroup className="edit" variant="outlined" aria-label="outlined button group">
                                <Button onClick={() => onEdit(currentId)}>
                                    <EditIcon />
                                </Button>

                                {id && !value && (
                                    <Button onClick={() => onDelete([currentId])}>
                                        <DeleteOutlineIcon color="warning" />
                                    </Button>
                                )}
                            </ButtonGroup>
                        </Box>
                    );
                },
            },
        ],
        [data, onEdit, onDelete],
    );

    return (
        <div>
            <DataGrid
                css={styles.table}
                rows={data || []}
                columns={columns}
                hideFooter={true}
                autoHeight={true}
                disableColumnMenu={true}
                disableRowSelectionOnClick
                sortingMode="client"
                loading={isLoading}
                getRowId={(row) => row._id}
            />
        </div>
    );
};
