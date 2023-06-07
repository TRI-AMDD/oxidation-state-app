import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as JotaiProvider } from 'jotai';
import CognitoProvider from './Cognito';
// import  { CognitoProvider } from './Cognito'
import { ThemeProvider, createTheme } from '@mui/material';

const queryClient = new QueryClient();
const Home = lazy(() => import('./pages/Home/Home'));

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto'
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: 'white',
                    textDecorationColor: 'white'
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: 'rgba(97, 97, 97, 1)'
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#3747AC',
            dark: '#0B1FA2',
            light: '#5261C6'
        }
    }
});

const App = () => (
    <QueryClientProvider client={queryClient}>
        <CognitoProvider>
            <ThemeProvider theme={theme}>
                <JotaiProvider>
                    <Router>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </Suspense>
                    </Router>
                </JotaiProvider>
            </ThemeProvider>
        </CognitoProvider>
    </QueryClientProvider>
);

export default App;
