import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@context/AuthContext';
import { BabyProvider } from '@context/BabyContext';
import { DiaryProvider } from '@context/DiaryContext';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <BabyProvider>
                    <DiaryProvider>
                        <App />
                    </DiaryProvider>
                </BabyProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
