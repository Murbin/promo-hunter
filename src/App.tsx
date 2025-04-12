import React, { Suspense, lazy } from 'react';
import { Container, CssBaseline, ThemeProvider, CircularProgress, Box } from '@mui/material';
import { theme } from './theme';
import { Header } from './components/Header';
import { PromotionSimulator } from './components/PromotionSimulator';

const Promotions = lazy(() => import('./components/Promotions').then(module => ({
    default: module.Promotions
})));

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Suspense fallback={
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                        <CircularProgress />
                    </Box>
                }>
                    <Promotions />
                </Suspense>
            </Container>
            <PromotionSimulator />
        </ThemeProvider>
    );
}

export default React.memo(App); 