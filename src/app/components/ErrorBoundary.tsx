import React, { FunctionComponent, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const ErrorBoundary: FunctionComponent<Props> = ({ children }) => <>{children}</>;

export default ErrorBoundary;
