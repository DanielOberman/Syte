/** App routing. */
export const APP_ROUTES = {
    MAIN: {
        PATH: '/',
        TITLE: 'main',
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
