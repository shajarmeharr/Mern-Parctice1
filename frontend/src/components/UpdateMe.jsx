import { Field, Form, Formik, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import axiosInstance from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';
const UpdateMe = () => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{ password: '', newPassword: '' }}
            validationSchema={Yup.object({
                password: Yup.string()
                    .min(
                        8,
                        'Your password should be at least 8 characters long'
                    )
                    .required('Required'),
                newPassword: Yup.string()
                    .min(
                        8,
                        'Your password should be at least 8 characters long'
                    )
                    .required('Required'),
            })}
            onSubmit={async (values, options) => {
                try {
                    console.log(values, 'these afre values');

                    const data = await axiosInstance.post(
                        '/users/updatePassword',
                        values,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    'jwt'
                                )}`,
                            },
                        }
                    );
                    localStorage.setItem('jwt', data.data.token);
                    return navigate('/');
                } catch (err) {
                    console.log(err.response.data.message);
                }
            }}
        >
            <Form className="flex w-1/3 z-[150] mx-auto px-8 py-6 bg-white rounded-lg absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg shadow-xl gap-2 flex-col">
                <label className="block" htmlFor="password">
                    Paasword
                </label>
                <Field
                    className="px-4 border-2 border-slate-200 py-3 rounded-md outline-2 outline-blue-300"
                    name="password"
                    id="password"
                    type="password"
                />
                <ErrorMessage name="password" />
                <label className="block" htmlFor="newPassword">
                    New Password
                </label>
                <Field
                    className="px-4 border-2 border-slate-200 py-3 rounded-md outline-2 outline-blue-300"
                    name="newPassword"
                    id="newPassword"
                    type="password"
                />
                <ErrorMessage name="newPassword" />
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

export default UpdateMe;
