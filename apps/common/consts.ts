export const MESSAGE = {
    CATALOG: {
        DELETE: 'Catalog deleted',
        UPDATE: 'Catalog updated',
        UPDATE_ERROR: 'At least 1 directory must be primary',
        CREATE: 'Catalog created',
        PRIMARY: 'Cannot delete catalog with primary status',
        EXIST: 'Catalog with the same name already exists',
        DELETE_ERROR: 'Primary catalog cannot be deleted',
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
