import React from 'react';
import { auth } from '@util/firebase';
import { useBaby } from '@context/BabyContext';

const MainApp = () => {
    const { babies } = useBaby();
    console.log('kyle_debug ~ file: MainApp.jsx ~ line 7 ~ MainApp ~ babies', babies);
    return (
        <div className="h-screen text-3xl flex flex-col items-center justify-center">
            MainApp
            <div className="mt-10">
                <div
                    className="text-center bg-primary text-gray-100 p-4 w-full rounded-full tracking-wide
                                                font-semibold focus:outline-none focus:shadow-outline hover:bg-primary-dark
                                                shadow-lg cursor-pointer"
                    onClick={() => auth.signOut()}
                >
                    Log out
                </div>
            </div>
        </div>
    );
};

export default MainApp;
