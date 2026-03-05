import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PremiumLoader from "./PremiumLoader";

const ProtectedRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <PremiumLoader />
    }

    // if not logged in redirect to login page
    if(!user){
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // if logged in render the children
    return children;
}


export default ProtectedRoute;