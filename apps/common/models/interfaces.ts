import { EVertical } from './enums';

export interface IUser {
    id?: string;
    email: string;
    password: string;
}

export interface IUserError {
    error: {
        status: number;
    };
}

export interface ICatalog {
    id?: string;
    name: string;
    vertical: string;
    isPrimary: boolean;
}
