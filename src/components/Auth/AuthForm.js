import { useState, useRef, useContext, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // new

    let requestUrl;
    if (isLogin) {
      requestUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFGHri0Xo-TPaq3aKL3N4uKuf3zzdsToc';
    } else {
      requestUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFGHri0Xo-TPaq3aKL3N4uKuf3zzdsToc';
    }

    fetch(requestUrl, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { 'Content-type': 'pplication/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        authCtx.login(data.idToken);
        history.push('/');
      })
      .catch((e) => alert(e));
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
