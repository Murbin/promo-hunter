import React, { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../store/api';
import notificationsReducer from '../store/notificationsSlice';
import filtersReducer from '../store/filtersSlice';
import { theme } from '../theme';

function createTestStore(preloadedState = {}) {
    return configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            notifications: notificationsReducer,
            filters: filtersReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
        preloadedState
    });
}

function render(
    ui: ReactElement,
    {
        preloadedState = {},
        store = createTestStore(preloadedState),
        ...renderOptions
    } = {}
) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    );

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render, createTestStore }; 
