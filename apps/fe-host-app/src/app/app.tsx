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

export const App: React.FC = () => (
    <BrowserRouter>
        <Theme>
            <Provider store={store}>
                <AuthProvider>
                    <Routes>
                        <Route element={<PageLayout header={<HeaderLayout />} />}>
                            <Route element={<LoginPage />} path={APP_ROUTES.USER.LOGIN.PATH} />
                        </Route>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <PageLayout header={<HeaderLayout />} />
                                </ProtectedRoute>
                            }
                        >
                            <Route element={<div>HOME</div>} path={APP_ROUTES.HOME.PATH} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </Provider>
        </Theme>
    </BrowserRouter>
);
