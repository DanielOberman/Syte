/** App routing. */
export const APP_ROUTES = {
    CATALOGS: {
        PATH: '/catalogs',
        TITLE: 'catalogs',
    },
    USER: {
        LOGIN: {
            PATH: 'user/login',
            TITLE: 'login',
        },
        REGISTER: {
            PATH: 'user/register',
            TITLE: 'register',
        },
    },
} as const;
