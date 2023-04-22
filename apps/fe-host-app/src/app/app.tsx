import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeaderLayout, PageLayout } from './components/layouts';

import { APP_ROUTES } from '../routes/consts';

import { Theme } from './components/theme';

export const App: React.FC = () => (
    <BrowserRouter>
        <Theme>
            <Routes>
                <Route path={APP_ROUTES.HOME.PATH}>
                    <Route element={<PageLayout header={<HeaderLayout />} />}>
                        <Route element={<div>ReloginPage /</div>} path={APP_ROUTES.LOGIN.PATH} />
                    </Route>
                    <Route element={<PageLayout header={<HeaderLayout />} />}>
                        <Route element={<div>HOME</div>} path={APP_ROUTES.HOME.PATH} />
                    </Route>
                </Route>
            </Routes>
        </Theme>
    </BrowserRouter>
);
