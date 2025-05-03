function ProtectedRoute({ isLoggedIn, handleRegisterModal, handleLoginModal, children }) {
  if (!isLoggedIn) {
    // If user isn't logged in, return a Navigate component that sends the user to /login
    return (
      <div>
        <button
          onClick={handleRegisterModal}
          type="button"
          className="header__register-btn"
        >
          Sign Up
        </button>
        <button
          onClick={handleLoginModal}
          type="button"
          className="header__login-btn"
        >
          Log In
        </button>
      </div>
    );
  }

  // Otherwise, render the protected route's child component.
  return children;
}

export default ProtectedRoute;
