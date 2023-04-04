import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

interface ReactBaseProps {
    children?: React.ReactNode;
}

export const MockQuery: FC<ReactBaseProps> = (props) => {
    const { children } = props;

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default MockQuery;
