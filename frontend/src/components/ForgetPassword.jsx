import { Field, Form, Formik, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import axiosInstance from '../AxiosInstance';
const ForgetPassword = () => {
    return (
        <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Please provide your email address')
                    .required('Required'),
            })}
            onSubmit={async (values, options) => {
                try {
                    const data = await axiosInstance.post(
                        '/users/forgetPassword',
                        values,
                        {
                            withCredentials: true,
                            // headers: {
                            //     Authorization: `Bearer ${localStorage.getItem(
                            //         'jwt'
                            //     )}`,
                            // },
                        }
                    );
                } catch (err) {
                    console.log(err.response.data.message);
                }
            }}
        >
            <Form className="flex w-1/3 z-[150] mx-auto px-8 py-6 bg-white rounded-lg absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg shadow-xl gap-2 flex-col">
                <label className="block" htmlFor="email">
                    Email
                </label>
                <Field
                    className="px-4 border-2 border-slate-200 py-3 rounded-md outline-2 outline-blue-300"
                    name="email"
                    id="email"
                    type="email"
                />
                <ErrorMessage name="email" />
                <button
                    type="submit"
                    className="bg-blue-600 mt-2 rounded-md text-white text-lg w-auto ml-auto px-8 py-4"
                >
                    Submit
                </button>
            </Form>
        </Formik>
    );
};

export default ForgetPassword;
