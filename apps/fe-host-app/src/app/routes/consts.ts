/** App routing. */
export const APP_ROUTES = {
    CATALOGS: {
        PATH: '/',
        TITLE: 'catalogs',
    },
    CLIENT: {
        LOGIN: {
            PATH: 'client/login',
            TITLE: 'login',
        },
        REGISTER: {
            PATH: 'client/register',
            TITLE: 'register',
        },
    },
} as const;
