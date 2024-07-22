'use client';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// import { Button } from "../ui/button";

type Props = {
    children: React.ReactNode;
};

export default function ReactQueryErrorBoundary({ children }: Props) {
    const { reset } = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
                <section className="h-screen w-full gap-10 fcc-col">
                    <h2 className="text-8xl font-extrabold">404</h2>
                    <p className="text-2xl font-medium">잘못된 요청입니다.</p>
                    <button onClick={resetErrorBoundary}>재시도</button>
                </section>
            )}
        >
            {children}
        </ErrorBoundary>
    );
}
