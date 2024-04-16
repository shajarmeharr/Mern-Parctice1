import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './components/ErrorPage.jsx';
import Signup from './signup.jsx';
import Login from './components/Login.jsx';
import ForgetPassword from './components/ForgetPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import Tour from './components/Tour.jsx';
import UpdateMe from './components/UpdateMe.jsx';
import UpdateMeNew from './components/UpdateMeNew.jsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        // children: [
        //     {
        //         path: '/resetPasssword',
        //         element: <Signup />,
        //     },
        //     {
        //         path: '/forgetPassword',
        //         element: <Login />,
        //     },
        // ],
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    ,
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/forgetPassword',
        element: <ForgetPassword />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/resetPassword/:id',
        element: <ResetPassword />,

        errorElement: <ErrorPage />,
    },
    {
        path: '/createTour',
        element: <Tour />,
    },
    {
        path: '/updatePassword',
        element: <UpdateMe />,
    },
    {
        path: 'updateMe',
        element: <UpdateMeNew />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
