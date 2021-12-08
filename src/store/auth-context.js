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
// let logoutTimer;

// const AuthContext = React.createContext({
//   token: '',
//   isLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
// });

// const calculateRemainingTime = (expirationTime) => {
//   // Время сейчас в ms
//   const currentTime = new Date().getTime();
//   // Время прекращения работы token
//   const modifiedExpirationTime = new Date(expirationTime).getTime();
//   const remainingTime = modifiedExpirationTime - currentTime;
//   return remainingTime;
// };

// const isTokenNotExpired = () => {
//   const storedToken = localStorage.getItem('idToken');
//   const storedExpirationTime = localStorage.getItem('expirationTime');
//   const remainingTime = calculateRemainingTime(storedExpirationTime);
//   if (remainingTime <= 60000) {
//     localStorage.removeItem('idToken');
//     localStorage.removeItem('expirationTime');
//     return null;
//   }
//   return {
//     idToken: storedToken,
//     expirationTime: remainingTime,
//   };
// };

// export const AuthProvider = (props) => {
//   const tokenData = isTokenNotExpired();
//   let initialToken;
//   if (tokenData) {
//     initialToken = tokenData.idToken;
//   }
//   const [token, setToken] = useState(initialToken);
//   const isLoggedIn = !!token;

//   const logout = useCallback(() => {
//     setToken(null);
//     localStorage.removeItem('idToken');
//     localStorage.removeItem('expirationTime');
//     if (logoutTimer) {
//       clearTimeout(logoutTimer);
//     }
//   }, []);

//   const login = (token, expirationTime) => {
//     setToken(token);
//     localStorage.setItem('idToken', token);
//     localStorage.setItem('expirationTime', expirationTime);

//     const remainingTime = calculateRemainingTime(expirationTime);
//     logoutTimer = setTimeout(logout, remainingTime);
//   };

//   useEffect(() => {
//     if (tokenData) {
//       console.log(tokenData.expirationTime);
//       logoutTimer = setTimeout(logout, tokenData.expirationTime);
//     }
//   }, [tokenData, logout]);

//   const contextValue = {
//     token: token,
//     isLoggedIn: isLoggedIn,
//     login: login,
//     logout: logout,
//   };
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
