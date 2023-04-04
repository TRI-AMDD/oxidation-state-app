import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CognitoProvider from './Cognito';
// import  { CognitoProvider } from './Cognito'

const queryClient = new QueryClient();
const Home = lazy(() => import('./pages/Home/Home'));

const App = () => (
    <QueryClientProvider client={queryClient}>
        <CognitoProvider>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Suspense>
            </Router>
        </CognitoProvider>
    </QueryClientProvider>
);

export default App;
