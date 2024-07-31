import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { AuthContext } from '../components/AuthContext.jsx';
import { usePageError } from '../hooks/usePageError.js';
import validateEmail from '../utils/validation/validateEmail.js';
import { EmailSentMessage } from '../components/auth/ResetPassword/EmailSentMessage.jsx';
import { CreateNewPassword } from '../components/auth/ResetPassword/CreateNewPassword.jsx';

export const ResetPasswordPage = () => {
  const { resetPasswordToken } = useParams();
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [error, setError] = usePageError('');
  const { resetPassword } = useContext(AuthContext);

  if (resetPasswordToken) {
    return <CreateNewPassword resetPasswordToken={resetPasswordToken} />;
  }

  if (isLinkSent) {
    return <EmailSentMessage />;
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnMount={true}
        onSubmit={({ email }) => {
          return resetPassword(email)
            .then(() => {
              setIsLinkSent(true);
            })
            .catch((error) => {
              setError(error.response?.data?.message);

              const loginError = {
                password: 'Wrong password',
                email: 'Wrong password',
              };

              if (error.response?.data?.message.includes(loginError.email)) {
                // setIsWrongPassword(true);
                console.log('email doesn`t exists');
              }
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className='box'>
            <h1 className='title'>Reset Password</h1>
            <p className='subtitle'>
              Enter your email and we`ll send you a link to reset your password
            </p>
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

            {/* <div className='field'>
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
            </div> */}

            <div className='field'>
              <button
                type='submit'
                className={cn('button is-success has-text-weight-bold mr-2', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || errors.email}
              >
                Send link to email
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {error && <p className='notification is-danger is-light'>{error}</p>}
    </>
  );
};
