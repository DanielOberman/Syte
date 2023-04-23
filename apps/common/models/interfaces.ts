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

export interface ICatalogs {
    id: string;
    userId?: string;
    name: string;
    vertical: EVertical;
    isPrimary: boolean;
}
