import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  login: (token, user) => {},
  logout: () => {},
  user: null,
});

export const AuthProvider = (props) => {
  let initialToken;
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    initialToken = savedToken;
  }
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(null);
  let isLoggedIn = !!token;

  const login = (token, user) => {
    localStorage.setItem('token', token);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const contextValue = {
    token,
    user,
    isLoggedIn,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
