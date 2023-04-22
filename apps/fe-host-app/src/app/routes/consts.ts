/** App routing. */
export const APP_ROUTES = {
    HOME: {
        PATH: '/',
        TITLE: 'home',
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
