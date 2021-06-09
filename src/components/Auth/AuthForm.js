import React, { useState,useRef } from 'react';
import AuthModal from '../Modal/AuthModal';
import classes from './AuthForm.module.css';
import {UserAuthSend} from '../../lib/api';
import {useUserAuth} from '../../hooks/useUserAuth';


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const {status,data,error,sendRequest} = useUserAuth(UserAuthSend,false,isLogin);
  const emailInputRef =useRef();
  const passwordInputRef =useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setShowModal(true);
    sendRequest({
      email:emailInputRef.current.value,
      password:passwordInputRef.current.value
    });
  }
  
  const showModalHandler = () => {
    setShowModal(false);
  }

  return (
    <React.Fragment>
      {showModal && <AuthModal onShowModal={showModalHandler} status={status} data ={data} error={error} isLogin={isLogin}/>}
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
         <form onSubmit ={formSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' ref ={emailInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' ref={passwordInputRef} required />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default AuthForm;
