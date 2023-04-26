export const MESSAGE = {
    CATALOG: {
        DELETE: 'Catalog deleted',
        UPDATE: 'Catalog updated',
        CREATE: 'Catalog created',
        PRIMARY: 'Cannot delete directory with primary status',
        EXIST: 'Catalog with the same name already exists',
    },
    CLIENT: {
        EXIST: 'Client already exists',
        NOT_FOUND: 'Client not found',
        INVALID_CREDENTIALS: 'Invalid credentials',
    },
    REGISTER: {
        ERROR: 'Failed to register. Please try again',
    },
    LOGIN: {
        ERROR: 'Failed to login. Please try again',
    },
};

export const CODE = {
    EXIST: 403,
    NOT_FOUND: 404,
};
