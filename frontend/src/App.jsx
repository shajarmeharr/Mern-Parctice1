import React, { useState } from 'react';
import Header from './components/header';
import MeSection from './components/MeSection';
import { Outlet } from 'react-router-dom';
import Signup from './signup';
import Login from './components/Login';
import axiosInstance from './AxiosInstance';
const App = () => {
    const [display, setDisplay] = useState({ login: false, signup: false });
    const [tours, setTours] = useState(null);
    async function getAllTours() {
        const data = await axiosInstance.get('/tours');
        console.log(data.data.tours);
        setTours(data.data.tours);
    }
    return (
        <main className=" container mx-auto  pt-5">
            <Header setDisplay={setDisplay} />
            <MeSection />
            <h1 className="text-2xl font-bold py-20 text-center">
                This is FlexBox
            </h1>

            <div className="flex  flex-wrap gap-10 justify-center ">
                {Array.from({ length: 12 }).map((el, index) => {
                    return (
                        <div
                            className="px-10 basis-1/4 flex-1 py-5 flex flex-col shadow-lg gap-4"
                            key={index}
                        >
                            <h1 className="text-2xl font-bold ">
                                Shajar Mehar
                            </h1>
                            <p className="text-gray-500 font-medium text-lg">
                                {' '}
                                Shajar Mehar turns your designs into pixel
                                perfect with front end with React.js and
                                Tailwind css and backend with nodejs , mongoose
                                and Mongodb.
                            </p>
                            <p> They Call me the Mern Stack Expert.</p>
                        </div>
                    );
                })}
            </div>

            <h1 className="text-2xl font-bold py-20 text-center">
                This is Grid
            </h1>
            {/* Array.from({ length: 12 }) */}
            <button
                onClick={getAllTours}
                className="bg-blue-600 mt-2 rounded-md text-white text-lg w-auto ml-auto px-8 py-4"
            >
                Get All Tours
            </button>
            <div className="grid grid-cols-3 py-10 grid-flow-row gap-8 ">
                {tours
                    ? tours.map((el, index) => {
                          return (
                              <div
                                  className={`
                            ${
                                index === 0 ? 'bg-cyan-300' : ''
                            } px-10   py-5 flex flex-col shadow-lg gap-4`}
                                  key={index}
                              >
                                  <h1 className="text-2xl font-bold ">
                                      {el.name}
                                  </h1>
                                  <p className="text-gray-500 font-medium text-lg">
                                      {' '}
                                      {el.description}
                                  </p>
                                  <p> {el.price}</p>
                              </div>
                          );
                      })
                    : null}
            </div>
            {display.login === true ? (
                <div
                    onClick={(e) => setDisplay({ login: false, signup: false })}
                    className={`fixed top-0 left-0 h-full  backdrop-blur-sm bg-slate-200/50 w-full`}
                >
                    <Login />
                </div>
            ) : null}
            {display.signup === true ? (
                <div
                    onClick={(e) => setDisplay({ login: false, signup: false })}
                    className={`fixed top-0 left-0 h-full bg-slate-200/50 backdrop-blur-sm  w-full`}
                >
                    <Signup />
                </div>
            ) : null}
        </main>
    );
};

export default App;
