import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeaderLayout, PageLayout } from './components/layouts';

import { APP_ROUTES } from './routes/consts';

import { Theme } from './components/theme';
import { ProtectedRoute } from './components/protected-route';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './hooks/useAuth';
import { LoginPage } from './components/login-page';
import { NotFoundPage } from './components/not-found-page';
import { CatalogsPage } from './components/catalogs-page';
import { RegisterPage } from './components/register-page';
import { UserInfo } from './components/user-info';
import { SnackbarProvider } from './hooks/useSnackBar';

export const App: React.FC = () => (
    <BrowserRouter>
        <SnackbarProvider>
            <Theme>
                <Provider store={store}>
                    <AuthProvider>
                        <Routes>
                            <Route element={<PageLayout header={<HeaderLayout />} />}>
                                <Route element={<LoginPage />} path={APP_ROUTES.CLIENT.LOGIN.PATH} />
                            </Route>
                            <Route element={<PageLayout header={<HeaderLayout />} />}>
                                <Route element={<RegisterPage />} path={APP_ROUTES.CLIENT.REGISTER.PATH} />
                            </Route>
                            <Route
                                element={
                                    <ProtectedRoute>
                                        <PageLayout header={<HeaderLayout rightSide={<UserInfo />} />} />
                                    </ProtectedRoute>
                                }
                            >
                                <Route element={<CatalogsPage />} path={APP_ROUTES.CATALOGS.PATH} />
                            </Route>
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </AuthProvider>
                </Provider>
            </Theme>
        </SnackbarProvider>
    </BrowserRouter>
);
