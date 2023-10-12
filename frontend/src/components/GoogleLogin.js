import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/actions/authActions';

function GoogleLogin() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    if (isAuthenticated) {
      // Redirect to a secure route or home page
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  const handleGoogleLogin = () => {
    // Redirect to your backend's Google OAuth URL.
    window.location.href = 'http://localhost:4000/auth/google'; // Adjust the URL
  };


  return (
    <div>
      <h2>Google Login</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}

export default GoogleLogin;