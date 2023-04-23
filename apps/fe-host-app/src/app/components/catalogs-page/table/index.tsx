import React from 'react';

import { css } from '@emotion/react';
import { ICatalogs } from '@myworkspace/common';
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
    data: ICatalogs[];
    isLoading: boolean;
    isFetching: boolean;
}

const COLUMNS: GridColDef<ICatalogs>[] = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        renderCell: ({ id, value }: GridCellParams<ICatalogs, string>) => (
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
        renderCell: ({ id, value }: GridCellParams<ICatalogs, string>) => (
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
        renderCell: ({ id, value }: GridCellParams<ICatalogs, string>) => (
            <Box height="100%" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                {value ? <Chip size="small" label="Primary" color="info" variant="outlined" /> : <div>{''}</div>}
                <ButtonGroup className="edit" variant="outlined" aria-label="outlined button group">
                    <Button onClick={() => console.log('edit')}>
                        <EditIcon />
                    </Button>

                    {!value && (
                        <Button onClick={() => console.log('edit')}>
                            <DeleteOutlineIcon color="warning" />
                        </Button>
                    )}
                </ButtonGroup>
            </Box>
        ),
    },
];

export const Table: React.FC<IProps> = ({ data, isFetching }) => (
    <div>
        <DataGrid
            css={styles.table}
            rows={data}
            columns={COLUMNS}
            hideFooter={true}
            autoHeight={true}
            disableColumnMenu={true}
            disableRowSelectionOnClick
            sortingMode="client"
            loading={isFetching}
        />
    </div>
);
