import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  // Время сейчас в ms
  const currentTime = new Date().getTime();
  // Время прекращения работы token
  const modifiedExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = modifiedExpirationTime - currentTime;
  return remainingTime;
};

const isTokenNotExpired = () => {
  const storedToken = localStorage.getItem('idToken');
  const storedExpirationTime = localStorage.getItem('expirationTime');
  const remainingTime = calculateRemainingTime(storedExpirationTime);
  if (remainingTime <= 60000) {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationTime');
    return null;
  }
  return {
    idToken: storedToken,
    expirationTime: remainingTime,
  };
};

export const AuthProvider = (props) => {
  const tokenData = isTokenNotExpired();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.idToken;
  }
  const [token, setToken] = useState(initialToken);
  const isLoggedIn = !!token;

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationTime');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const login = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('idToken', token);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logout, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.expirationTime);
      logoutTimer = setTimeout(logout, tokenData.expirationTime);
    }
  }, [tokenData, logout]);

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
