import React, { useRef } from 'react';
import axiosInstance from '../AxiosInstance';
import { Field, Form, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const UpdateMeNew = () => {
    const navigate = useNavigate();
    return (
        // <div className="h-full w-full fixed top-0 left-0 z-[100] backdrop-blur-lg">

        <Formik
            initialValues={{
                name: '',
                email: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('Required'),
                email: Yup.string()
                    .email('Please provide a valid email')
                    .required('Required'),
            })}
            onSubmit={async (values, options) => {
                try {
                    const data = await axiosInstance.patch(
                        '/users/updateMe',
                        values,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    'jwt'
                                )}`,
                            },
                        }
                    );
                    console.log(data);

                    // localStorage.setItem('jwt', data.data.token);
                    return navigate('/');
                } catch (err) {
                    console.log(err);
                }
            }}
        >
            <Form
                onClick={(e) => e.stopPropagation()}
                className="flex w-1/3 z-[150] mx-auto px-8 py-6 bg-white rounded-lg absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg shadow-xl gap-2 flex-col"
            >
                <p className="text-2xl font-semibold mb-3">Sign Up</p>
                <label className="block" htmlFor="name">
                    Name
                </label>
                <Field
                    className="px-4 border-2 border-slate-200 py-3 rounded-md outline-2 outline-blue-300"
                    name="name"
                    id="name"
                    type="text"
                />
                <ErrorMessage name="name" />
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
                    Update
                </button>
            </Form>
        </Formik>
    );
};

export default UpdateMeNew;
