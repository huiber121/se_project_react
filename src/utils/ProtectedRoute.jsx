import { useNavigate } from 'react-router-dom';

function ProtectedRoute({isLoggedIn, children}) {
    const navigate = useNavigate();

    if (!isLoggedIn) {
        navigate('/', { replace: true });
        return null; // or a loading spinner, etc.
    }

    return children; // Render the protected component if logged in
 
}

export default ProtectedRoute;
