import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Login} from "./pages/login/login";
import {Home} from "./pages/home/home";
import {PrivateRoute} from "./shared/auth";

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route index element={<Home />} />
                <Route path="login" element={<Login/>}/>
                {/*<Route path="home">*/}
                {/*    <Route*/}
                {/*        path="*"*/}
                {/*        element={*/}
                {/*            <PrivateRoute>*/}
                {/*                <Home/>*/}
                {/*            </PrivateRoute>*/}
                {/*        }*/}
                {/*    />*/}
                {/*</Route>*/}
            </Routes>
        </div>
    )
}

export default AppRoutes;