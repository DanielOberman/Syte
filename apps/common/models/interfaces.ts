import { AlertColor } from '@mui/material';

export interface ICatalog {
    id: string;
    name: string;
    vertical: string;
    isPrimary: boolean;
}

export interface IClient {
    id?: string;
    email: string;
    password: string;
    catalogs: ICatalog[];
}

export interface IClientError {
    error?: {
        status?: number;
        originalStatus?: number;
        data?: {
            status?: number;
        };
    };
}

export interface ICatalogDelete {
    clientId: string;
    catalogIds: string[];
}

export interface ICatalogCreate {
    clientId: string;
    name: string;
    vertical: string;
    isPrimary: boolean;
}

export interface ICatalogUpdate {
    id: string;
    clientId: string;
    name: string;
    vertical: string;
    isPrimary: boolean;
}

export interface ISnackbar {
    active: boolean;
    message: string;
    severity: AlertColor;
}
