import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const history = useHistory();

  //Validation
  const validateInputEmail = (input) => {
    return input.trim().length > 7 && input.includes('@');
  };
  const validateInputPassword = (input) => {
    return input.trim().length > 5;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    let isEmailValid = false;
    let isPasswordValid = false;
    let isFormValid = false;
    let isFormTouched = true;

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    isEmailValid = validateInputEmail(enteredEmail);
    isPasswordValid = validateInputPassword(enteredPassword);
    let emailInvalid = !isEmailValid && isFormTouched;
    setIsEmailInvalid(emailInvalid);
    setIsPasswordInvalid(!isPasswordValid && isFormTouched);
    isFormValid = isEmailValid && isPasswordValid;

    // Fetch data
    if (isFormValid) {
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
        headers: { 'Content-type': 'application/json' },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error.message || 'Something went wrong');
          }

          authCtx.login(data.idToken, enteredEmail);
          if (history?.location?.state?.prevPage === '/cart') {
            history.goBack(-1);
          } else {
            history.push('/');
          }
        })
        .catch((e) => alert(e));
    }

    setIsLoading(false);
  };

  const toggleButtonHandler = () => {
    setIsLogin((prevState) => !isLogin);
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
      <form onSubmit={submitHandler} noValidate>
        <div className={classes['auth__control']}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
          {isEmailInvalid && <span>Email is invalid</span>}
        </div>

        <div className={classes['auth__control']}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
          {isPasswordInvalid && <span>Password is invalid</span>}
        </div>
        <div className={classes['auth__actions']}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Sign up'}</button>}
          {isLoading && <p>Sending a request...</p>}
          <button
            type='button'
            className={classes['auth__toggle']}
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
