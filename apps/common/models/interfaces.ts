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
