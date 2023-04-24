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

export const App: React.FC = () => (
    <BrowserRouter>
        <Theme>
            <Provider store={store}>
                <AuthProvider>
                    <Routes>
                        <Route element={<PageLayout header={<HeaderLayout />} />}>
                            <Route element={<LoginPage />} path={APP_ROUTES.CLIENT.LOGIN.PATH} />
                        </Route>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <PageLayout header={<HeaderLayout />} />
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
    </BrowserRouter>
);
