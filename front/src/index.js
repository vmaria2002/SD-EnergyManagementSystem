/*
Sursa: https://www.youtube.com/watch?v=oUZjO00NkhY
 */
import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import cookieParser from 'cookie-parser'
import {COOKIE_SECRET} from "./utils";


ReactDOM.render(
            <BrowserRouter>

                    <Routes>
                        <Route path="/*" element={<App/>} />
                        {cookieParser(COOKIE_SECRET)}
                    </Routes>
            </BrowserRouter>,
    document.getElementById('root'));
