import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <p>Checking Authentication...</p>
    }

    // if not logged in redirect to login page
    if(!user){
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // if logged in render the children
    return children;
}


export default ProtectedRoute;