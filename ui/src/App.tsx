import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider, createTheme } from '@mui/material';
import AboutUs from './pages/AboutUs/AboutUs';
import { customTheme } from './theme';
import FAQ from './pages/FAQ/FAQ';

const queryClient = new QueryClient();
const Home = lazy(() => import('./pages/Home/Home'));

const theme = createTheme(customTheme);

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <JotaiProvider>
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="faq" element={<FAQ />} />
                        </Routes>
                    </Suspense>
                </Router>
            </JotaiProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;
