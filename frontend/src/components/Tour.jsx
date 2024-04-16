import React, { useRef } from 'react';
import axiosInstance from '../AxiosInstance';
import { Field, Form, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate();
    return (
        // <div className="h-full w-full fixed top-0 left-0 z-[100] backdrop-blur-lg">

        <Formik
            initialValues={{
                name: '',
                numOfTourists: 0,
                price: '',
                description: '',
                Braekfast: false,
                guides: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('Required'),
                numOfTourists: Yup.number().required('Required'),
                price: Yup.string().required('Required'),
                description: Yup.string().required('requird'),
                Braekfast: Yup.bool().required('requird'),
                guides: Yup.string().required('Required'),
            })}
            onSubmit={async (values, options) => {
                try {
                    const data = await axiosInstance.post('/tours', values);
                    console.log(data);
                    console.log(values);
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
                <p className="text-2xl font-semibold mb-3">Create Tour</p>
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
                <label className="block" htmlFor=" numOfTourists">
                    numOfTourists
                </label>
                <Field
                    className="px-4 border-2 border-slate-200 py-3 rounded-md outline-2 outline-blue-300"
                    name="numOfTourists"
                    id="numOfTourists"
                    type="number"
                />
                <ErrorMessage name="numOfTourists" />
                <label className="block" htmlFor="price">
                    Price
                </label>
                <Field
                    className="px-4 border-2 border-slate-200 py-3 rounded-md outline-2 outline-blue-300"
                    name="price"
                    id="price"
                    type="text"
                />
                <ErrorMessage name="price" />
                <label className="block" htmlFor="description">
                    Description
                </label>
                <Field
                    className="px-4 border-2 border-slate-200 py-3 rounded-md outline-2 outline-blue-300"
                    name="description"
                    id="description"
                    type="text"
                />
                <ErrorMessage name="description" />
                <label className="block" htmlFor="guides">
                    Guides
                </label>
                <Field
                    className="px-4 border-2 border-slate-200 py-3 rounded-md outline-2 outline-blue-300"
                    name="guides"
                    id="guides"
                    type="text"
                />
                <ErrorMessage name="guides" />
                <button
                    type="submit"
                    className="bg-blue-600 mt-2 rounded-md text-white text-lg w-auto ml-auto px-8 py-4"
                >
                    Create Tour
                </button>
            </Form>
        </Formik>
    );
};

export default Signup;
