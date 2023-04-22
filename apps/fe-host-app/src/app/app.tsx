import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeaderLayout, PageLayout } from './components/layouts';

import { APP_ROUTES } from './routes/consts';

import { Theme } from './components/theme';
import { ProtectedRoute } from './components/protected-route';

export const App: React.FC = () => (
    <BrowserRouter>
        <Theme>
            <Routes>
                <Route element={<PageLayout header={<HeaderLayout />} />}>
                    <Route element={<div>login</div>} path={APP_ROUTES.LOGIN.PATH} />
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
        </Theme>
    </BrowserRouter>
);
