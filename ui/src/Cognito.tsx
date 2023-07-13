import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { AuthEventData } from '@aws-amplify/ui';
import '@aws-amplify/ui-react/styles.css';
import { ReactNode } from 'react';

Amplify.configure(AWS_CONFIG);

interface Props {
    children?: ReactNode;
}

interface AmplifyProps {
    children?: ReactNode;
    user: string | undefined;
    signOut?: ((data?: AuthEventData | undefined) => void) | undefined;
}

function CognitoApp({ user, signOut, children }: AmplifyProps) {
    console.log(user);
    console.log(signOut);

    return <>{children}</>;
}

export default function CognitoProvider({ children }: Props) {
    if (!AMPLIFY_ENABLED) {
        return <>{children}</>;
    }

    return (
        <Authenticator hideSignUp={true}>
            {({ signOut, user }) => (
                <CognitoApp user={user && user.username} signOut={signOut}>
                    {children}
                </CognitoApp>
            )}
        </Authenticator>
    );
}
