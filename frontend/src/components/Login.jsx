import React, { useRef } from 'react';
import axiosInstance from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
const Login = () => {
    const navigate = useNavigate();
    return (
        // <div className="h-full w-full fixed top-0 left-0 z-[100] backdrop-blur-lg">
        <div>
            <Formik
                initialValues={{
                    password: '',
                    email: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Please provide a valid email')
                        .required('Required'),
                    password: Yup.string()
                        .min(
                            8,
                            'Please provide a passwotrd of at least 8 chrachters'
                        )
                        .required('Required'),
                })}
                onSubmit={async (values, options) => {
                    try {
                        const data = await axiosInstance.post(
                            '/users/login',
                            values
                        );
                        // console.log(data);
                        // console.log(JSON.stringify(data.data.token));
                        localStorage.setItem('jwt', data.data.token);
                        return navigate('/');
                        // toast.success('You have logged in successfully');
                    } catch (err) {
                        toast.error(err.response.message);
                    }
                }}
            >
                <Form
                    onClick={(e) => e.stopPropagation()}
                    className="flex w-1/3 z-[150] mx-auto px-8 py-6 bg-white rounded-lg absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg shadow-xl gap-2 flex-col"
                >
                    <p className="text-2xl font-semibold mb-3">Log In</p>

                    <label className="block" htmlFor="email">
                        Email
                    </label>
                    <Field
                        className="px-4 border-2 border-slate-200 py-3 rounded-md outline-2 outline-blue-300"
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Email..."
                    />
                    <ErrorMessage name="email" />
                    <label className="block" htmlFor="password">
                        Paasword
                    </label>
                    <Field
                        className="px-4 border-2 border-slate-200 py-3 rounded-md outline-2 outline-blue-300"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Password..."
                    />
                    <ErrorMessage name="password" />
                    <button
                        type="submit"
                        className="bg-blue-600 mt-2 rounded-md text-white text-lg w-auto ml-auto px-8 py-4"
                    >
                        Login
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
