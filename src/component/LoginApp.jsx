import React from 'react';

const LoginApp = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-3/4 lg:w-1/2 xl:max-w-screen-sm">
                <div className="px-12 sm:px-24 md:px-20 lg:px-12 xl:px-24 xl:max-w-2xl">
                    <h2
                        className="text-center text-4xl text-primary-darkest font-display font-semibold lg:text-left xl:text-5xl
        xl:text-bold"
                    >
                        Log in
                    </h2>
                    <div className="mt-12">
                        <form>
                            <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Email Address
                                </div>
                                <input
                                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary"
                                    type="email"
                                    autoComplete="username"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="mt-8">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Password
                                </div>
                                <input
                                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="mt-10">
                                <button
                                    className="bg-primary text-gray-100 p-4 w-full rounded-full tracking-wide
                                                font-semibold focus:outline-none focus:shadow-outline hover:bg-primary-dark
                                                shadow-lg"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>
                        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center flex justify-center">
                            Don't have an account?
                            <p className="cursor-pointer text-primary  hover:text-primary-dark pl-1">
                                Sign up
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginApp;
