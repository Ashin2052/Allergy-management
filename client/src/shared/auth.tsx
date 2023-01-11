import {RouteProps, useLocation} from "react-router";
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";


export const PrivateRoute = ({children, hasAnyAuthorities = [], ...rest}: any) => {
    const {user: authUser} = useSelector<any, any>(x => x.auth);

    if (!authUser) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{from: useLocation()}}/>
    }

    // authorized so return child components
    return children;
}