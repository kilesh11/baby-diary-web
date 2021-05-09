import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useAuth } from '@context/AuthContext';

const loginMode = {
    logIn: 'LOGIN',
    signup: 'SIGNUP',
};

const LoginApp = () => {
    const { logIn, signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState(loginMode.logIn);

    const clearInput = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            if (mode === loginMode.logIn) {
                if (email && password) {
                    await logIn({ email, password });
                } else {
                    setIsLoading(false);
                }
            }
            if (mode === loginMode.signUp) {
                if (email && password && confirmPassword && password === confirmPassword) {
                    await signUp(email, password);
                } else {
                    setIsLoading(false);
                }
            }
        } catch (err) {
            setIsLoading(false);
            clearInput();
        }
    };

    const onKeyPress = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-3/4 lg:w-1/2 xl:max-w-screen-sm">
                <div className="px-12 sm:px-24 md:px-20 lg:px-12 xl:px-24 xl:max-w-2xl">
                    <h2
                        className="text-center text-4xl text-primary-darkest font-display font-semibold lg:text-left xl:text-5xl
        xl:text-bold"
                    >
                        {mode === loginMode.logIn && 'Log in'}
                        {mode === loginMode.signUp && 'Sign Up'}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => mode === loginMode.logIn && onKeyPress(e)}
                                />
                            </div>
                            {mode === loginMode.signUp && (
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Confirm Password
                                    </div>
                                    <input
                                        className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Enter your confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onKeyPress={onKeyPress}
                                    />
                                </div>
                            )}
                            <div className="mt-10">
                                <div
                                    className="text-center bg-primary text-gray-100 p-4 w-full rounded-full tracking-wide
                                                font-semibold focus:outline-none focus:shadow-outline hover:bg-primary-dark
                                                shadow-lg cursor-pointer flex items-center justify-center"
                                    onClick={onSubmit}
                                >
                                    {mode === loginMode.logIn &&
                                        (isLoading ? (
                                            <CircularProgress
                                                style={{
                                                    color: 'white',
                                                    width: '24px',
                                                    height: '24px',
                                                }}
                                            />
                                        ) : (
                                            'Log In'
                                        ))}
                                    {mode === loginMode.signUp &&
                                        (isLoading ? (
                                            <CircularProgress
                                                style={{
                                                    color: 'white',
                                                    width: '24px',
                                                    height: '24px',
                                                }}
                                            />
                                        ) : (
                                            'Sign Up'
                                        ))}
                                </div>
                            </div>
                        </form>
                        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center flex justify-center">
                            Don't have an account?
                            <p
                                onClick={() => {
                                    let newMode = '';
                                    switch (mode) {
                                        case loginMode.signUp:
                                            newMode = loginMode.logIn;
                                            break;
                                        case loginMode.logIn:
                                            newMode = loginMode.signUp;
                                            break;
                                        default:
                                    }
                                    setMode(newMode);
                                    clearInput();
                                }}
                                className="cursor-pointer text-primary  hover:text-primary-dark pl-1"
                            >
                                {mode === loginMode.logIn && 'Sign Up'}
                                {mode === loginMode.signUp && 'Log in'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginApp;
