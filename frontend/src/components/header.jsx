import React from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../AxiosInstance';

const header = ({ setDisplay }) => {
    return (
        <header className="h-screen">
            <nav className="flex justify-between border-b-2 border-slate-300 pb-4">
                <h3 className="font-bold text-xl">Shajar Mehar</h3>
                <ul className="flex text-lg font-medium text-slate-500 justify-between gap-8">
                    <li>
                        <Link to={'/signup'}>SignUp</Link>
                    </li>
                    <li>
                        <Link to={'/login'}>Login</Link>
                    </li>
                    <li>
                        <Link to={'/forgetPassword'}>Forget Password</Link>
                    </li>
                    <li>
                        <button
                            onClick={async () => {
                                const data = await axiosInstance.patch(
                                    `/users/shajar?age[gte]=5,age[lte]=20&mango[lt]=7`
                                );
                            }}
                        >
                            Reset Password Pro{' '}
                        </button>
                    </li>
                    <li>
                        <Link to={'/resetPassword/shjaatrrr'}>
                            Reset Password
                        </Link>
                    </li>
                    {/* <li>
                        <button
                            onClick={() => {
                                setDisplay((dis) => {
                                    return {
                                        ...dis,
                                        login: !dis.login,
                                    };
                                });
                            }}
                        >
                            My Login
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setDisplay((dis) => {
                                    return {
                                        ...dis,
                                        signup: !dis.signup,
                                    };
                                });
                            }}
                        >
                            My signUp
                        </button>
                    </li> */}
                    <button
                        onClick={() => localStorage.setItem('jwt', '')}
                        className="text-blue-600 font-medium  [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]"
                    >
                        Log out
                    </button>
                </ul>
                <a className="text-blue-600 font-medium  [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                    {' '}
                    Project Request
                </a>
            </nav>
            <section className="flex  mb-20 flex-col text-center gap-8 mx-auto pt-24 w-2/4">
                <h1 className="text-[90px] text-transparent bg-clip-text leading-none bg-gradient-to-b bg-gradient from-blue-500 to-blue-950 tracking-normal">
                    Exceptional Webflow Sites
                </h1>
                <p className="text-gray-500 font-medium text-lg">
                    High-end Webflow development for design driven companies
                    where attention to detail and passionate dedication matters.
                </p>
                <button className="text-blue-600 text-lg font-medium  [text-shadow:_0_1px_5px_rgb(0_0_0_/_40%)]">
                    Start a project request &rarr;
                </button>
            </section>
            <div className="flex justify-between text-lg font-medium  px-40">
                <p>Truted by</p>
                <p className="text-gray-600">Perspective</p>
                <p className="text-gray-600">Compound</p>
                <p className="text-gray-600">WorkOs</p>
                <p className="text-gray-600">Disney</p>
            </div>
        </header>
    );
};

export default header;
