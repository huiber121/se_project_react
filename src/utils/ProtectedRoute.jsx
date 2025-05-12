function ProtectedRoute({isLoggedIn, children}) {

    if (!isLoggedIn) {
        return null; // or a loading spinner, etc.
    }

    return children; // Render the protected component if logged in
 
}

export default ProtectedRoute;
