import React, { useRef } from 'react';
import axiosInstance from '../AxiosInstance';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
const ResetPassword = () => {
    const navigate = useNavigate();
    const params = useParams();

    console.log(params, 'these are parasm');

    return (
        // <div className="h-full w-full fixed top-0 left-0 z-[100] backdrop-blur-lg">
        <div>
            <Formik
                initialValues={{
                    password: '',
                    passwordConfirm: '',
                }}
                validationSchema={Yup.object({
                    password: Yup.string()
                        .min(
                            8,
                            'Please provide a passwotrd of at least 8 chrachters'
                        )
                        .required('Required'),

                    passwordConfirm: Yup.string()
                        .min(
                            8,
                            'Please provide a passwotrd of at least 8 chrachters'
                        )
                        .required('Required'),
                })}
                onSubmit={async (values, options) => {
                    try {
                        const data = await axiosInstance.patch(
                            `/users/resetPassword/${params.id}`,
                            values
                        );

                        // console.log(JSON.stringify(data.data.token));
                        // localStorage.setItem('jwt', data.data.token);
                        // toast.success('You have logged in successfully');
                        return navigate('/');
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
                    <label className="block" htmlFor="password">
                        PaaswordConfirm
                    </label>
                    <Field
                        className="px-4 border-2 border-slate-200 py-3 rounded-md outline-2 outline-blue-300"
                        name="passwordConfirm"
                        id="passwordConfirm"
                        type="password"
                        placeholder="PasswordConfirm..."
                    />
                    <ErrorMessage name="passwordConfirm" />
                    <button
                        type="submit"
                        className="bg-blue-600 mt-2 rounded-md text-white text-lg w-auto ml-auto px-8 py-4"
                    >
                        ResetPassword
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default ResetPassword;
