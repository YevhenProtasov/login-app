import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { AuthContext } from '../components/AuthContext.jsx';
import { usePageError } from '../hooks/usePageError.js';
import validateEmail from '../utils/validation/validateEmail.js';
import validatePassword from '../utils/validation/validatePassword.js';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [isEmailActivated, setIsEmailActivated] = useState(true);
  const [activationLinkSent, setActivationLinkSent] = useState(false);
  const [activationEmail, setActivationEmail] = useState(null);
  const [error, setError] = usePageError('');
  const { login, sendActivation } = useContext(AuthContext);

  const sendActivationLink = () => {
    if (!activationEmail) {
      return;
    }

    sendActivation(activationEmail)
      .then((res) => {
        console.log(res.message);

        setActivationLinkSent(true);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  if (activationLinkSent) {
    return (
      <section className=''>
        <h1 className='title'>Check your email</h1>
        <div className='field'>
          <p>We have sent you an email with the activation link</p>
        </div>
        <button
          type='button'
          className='button'
          onClick={() => {
            setActivationLinkSent(false);
            setActivationEmail(null);
            setIsEmailActivated(true);
          }}
        >
          Back to Login
        </button>
      </section>
    );
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnMount={true}
        onSubmit={({ email, password }) => {
          return login({ email, password })
            .then(() => {
              navigate('/profile');
            })
            .catch((error) => {
              setError(error.response?.data?.message);

              const loginError = {
                activation: 'The account is not activated',
                password: 'Wrong password',
              };

              if (
                error.response?.data?.message.includes(loginError.activation)
              ) {
                setIsEmailActivated(false);
                setActivationEmail(email);
              }
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className='box'>
            <h1 className='title'>Log in</h1>
            <div className='field'>
              <label htmlFor='email' className='label'>
                Email
              </label>

              <div className='control has-icons-left has-icons-right'>
                <Field
                  validate={validateEmail}
                  name='email'
                  type='email'
                  id='email'
                  placeholder='e.g. bobsmith@gmail.com'
                  className={cn('input', {
                    'is-danger': touched.email && errors.email,
                  })}
                />

                <span className='icon is-small is-left'>
                  <i className='fa fa-envelope'></i>
                </span>

                {touched.email && errors.email && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.email && errors.email && (
                <p className='help is-danger'>{errors.email}</p>
              )}
            </div>
            <div className='field'>
              <label htmlFor='password' className='label'>
                Password
              </label>

              <div className='control has-icons-left has-icons-right'>
                <Field
                  validate={validatePassword}
                  name='password'
                  type='password'
                  id='password'
                  placeholder='*******'
                  className={cn('input', {
                    'is-danger': touched.password && errors.password,
                  })}
                />

                <span className='icon is-small is-left'>
                  <i className='fa fa-lock'></i>
                </span>

                {touched.password && errors.password && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.password && errors.password ? (
                <p className='help is-danger'>{errors.password}</p>
              ) : (
                <p className='help'>At least 6 characters</p>
              )}
            </div>
            <div className='field'>
              <Link to='/reset-password'>Forgot password?</Link>
            </div>
            <div className='field'>
              <button
                type='submit'
                className={cn('button is-success has-text-weight-bold mr-2', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || errors.email || errors.password}
              >
                Log in
              </button>

              {!isEmailActivated && (
                <button
                  type='button'
                  className={cn('button is-link has-text-weight-bold', {
                    // 'is-loading': isSubmitting,
                  })}
                  onClick={sendActivationLink}
                >
                  Activate Account
                </button>
              )}
            </div>
            Do not have an account? <Link to='/sign-up'>Sign up</Link>
          </Form>
        )}
      </Formik>

      {error && <p className='notification is-danger is-light'>{error}</p>}
    </>
  );
};
