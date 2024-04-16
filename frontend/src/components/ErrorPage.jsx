import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);
    return (
        <div className="text-center h-screen w-screen text-5xl">{error}</div>
    );
};

export default ErrorPage;
