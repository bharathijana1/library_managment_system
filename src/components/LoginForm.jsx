import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('pavithra'); // Set default username
  const [password, setPassword] = useState('pavi@1234'); // Set default password
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState(null); // Store previous path

  useEffect(() => {
    // Check if user is already logged in, redirect to homepage if yes
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken) {
      // If user is already logged in, navigate back to the previous path
      if (previousPath) {
        navigate(previousPath);
      } else {
        navigate('/');
      }
    }
  }, [navigate, previousPath]);

  useEffect(() => {
    // Store the current path when component mounts or location changes
    setPreviousPath(location.pathname);
  }, [location]);

  const onChangeUsername = event => {
    setUsername(event.target.value);
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    });
  
    // If previous path exists, navigate back to it; otherwise, navigate to '/'
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate('/');
    }
  };
  

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async event => {
    event.preventDefault();
    const userDetails = { username, password };
   
    if (username === 'pavithra' && password === 'pavi@1234') {
      onSubmitSuccess('mockJwtToken'); 
    } else {
      onSubmitFailure('Invalid username or password');
    }
  };

  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={onChangePassword}
        />
      </>
    );
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
        />
      </>
    );
  };

  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-image"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-image"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
