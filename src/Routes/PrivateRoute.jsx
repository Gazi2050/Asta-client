import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return (
            <div className="flex justify-center items-center p-60">
                <span className="loading loading-spinner loading-lg"></span>
            </div>)
    }
    if (user) {
        return children;
    }

    return <Navigate to={'/logIn'} state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;