import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider, createTheme } from '@mui/material';
import AboutUs from './pages/AboutUs/AboutUs';
import { customTheme } from './theme';
import { FAQ } from './pages/FAQ/FAQ';
import Tutorial from './pages/Tutorial/Tutorial';

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
                            <Route path="/:input" element={<Home/>} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/tutorial" element={<Tutorial />} />
                        </Routes>
                    </Suspense>
                </Router>
            </JotaiProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;