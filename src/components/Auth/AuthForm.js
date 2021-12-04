import { useState, useRef, useContext, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';
import classes from './AuthForm.module.css';
import useHttp from '../../hooks/useHttp';
import { authRequest } from '../../helpers/api';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const { data, sendRequest, error, isLoading } = useHttp(authRequest);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let requestUrl;
    if (isLogin) {
      requestUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFGHri0Xo-TPaq3aKL3N4uKuf3zzdsToc';
    } else {
      requestUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFGHri0Xo-TPaq3aKL3N4uKuf3zzdsToc';
    }

    sendRequest(requestUrl, {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    }).then((result) => {
      authCtx.login(data.idToken);
      history.push('/');
    });

    // if (!data) {
    //   return;
    // }

    // if (!isLoading && !error && data) {
    //   authCtx.login(data.idToken);
    //   history.push('/');
    // }
  };

  const toggleButtonHandler = () => {
    setIsLogin((prevState) => !isLogin);
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Sign up'}</button>}
          {isLoading && <p>Sending a request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={toggleButtonHandler}
          >
            {isLogin ? 'Create a new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
// const AuthForm = () => {
// const emailInputRef = useRef();
// const passwordInputRef = useRef();
// const [isLogin, setIsLogin] = useState(true);
// const [isLoading, setIsLoading] = useState(false);
// const history = useHistory();

// const authCtx = useContext(AuthContext);

// const switchAuthModeHandler = () => {
//   setIsLogin((prevState) => !prevState);
// };

// const submitHandler = (event) => {
//   event.preventDefault();
//   let url = '';
//   const enteredEmail = emailInputRef.current.value;
//   const enteredPassword = passwordInputRef.current.value;
//   setIsLoading(true);
//   if (isLogin) {
//     url =
//       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXqGhThJ7d06S4YktFbxAb7ESxyjSI7fE';
//   } else {
//     url =
//       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXqGhThJ7d06S4YktFbxAb7ESxyjSI7fE';
//   }
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       email: enteredEmail,
//       password: enteredPassword,
//       returnSecureToken: true,
//     }),
//   })
//     .then((response) => {
//       setIsLoading(false);
//       if (response.ok) {
//         return response.json();
//       } else {
//         return response.json().then((data) => {
//           let errorMessage = 'Authentification failed';
//           if (data && data.error && data.error.message) {
//             errorMessage = data.error.message;
//           }
//           throw new Error(errorMessage);
//         });
//       }
//     })
//     .then((data) => {
//       const expirationTime = new Date(
//         new Date().getTime() + +data.expiresIn * 1000
//       );
//       authCtx.login(data.idToken, expirationTime.toISOString());
//       history.replace('/');
//     })
//     .catch((error) => alert(error));
// };

// return (
//   <section className={classes.auth}>
//     <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
//     <form onSubmit={submitHandler}>
//       <div className={classes.control}>
//         <label htmlFor='email'>Your Email</label>
//         <input type='email' id='email' required ref={emailInputRef} />
//       </div>
//       <div className={classes.control}>
//         <label htmlFor='password'>Your Password</label>
//         <input
//           type='password'
//           id='password'
//           required
//           ref={passwordInputRef}
//         />
//       </div>
//       <div className={classes.actions}>
//         {!isLoading && (
//           <button>{isLogin ? 'Login' : 'Create Account'}</button>
//         )}
//         {isLoading && <p>Sending a request...</p>}
//         <button
//           type='button'
//           className={classes.toggle}
//           onClick={switchAuthModeHandler}
//         >
//           {isLogin ? 'Create new account' : 'Login with existing account'}
//         </button>
//       </div>
//     </form>
//   </section>
// );
// };

// export default AuthForm;
