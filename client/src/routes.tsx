import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "./components/login/login";
import {PrivateRoute} from "./shared/auth";
import {Home} from "./components/home/home";

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="login" element={<Login/>}/>
                <Route path="/" element={<PrivateRoute>
                    <Home/>
                </PrivateRoute>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </div>
    )
}

export default AppRoutes;