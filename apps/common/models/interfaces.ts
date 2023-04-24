import { EVertical } from './enums';

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
    error: {
        status: number;
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
