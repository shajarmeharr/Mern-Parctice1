import React from 'react';

const MeSection = () => {
    return (
        <section className="flex p-20 mt-20 gap-28 bg-gradient-to-tr  from-white to-sky-300 tracking-normal">
            <div className="flex flex-col gap-8 justify-center">
                <h3 className="text-5xl font-semibold">
                    They Call me the Mern Stack Expert.
                </h3>
                <p>
                    Shajar Mehar turns your designs into pixel perfect with
                    front end with React.js and Tailwind css and backend with
                    nodejs , mongoose and Mongodb.
                </p>
            </div>
            <div className="h-96">
                <img
                    src="/FB_IMG_1703828618188.jpg"
                    className="object-fill object-center
                    h-[300px] rounded-lg"
                    alt="developers image"
                />
            </div>
        </section>
    );
};

export default MeSection;
