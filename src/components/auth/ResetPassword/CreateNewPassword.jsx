import { Field, Form, Formik } from 'formik';
import validatePassword from '../../../utils/validation/validatePassword';
import { usePageError } from '../../../hooks/usePageError';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import cn from 'classnames';
import { SuccessMessage } from './SuccessMessage';

export const CreateNewPassword = ({ resetPasswordToken }) => {
  const [error, setError] = usePageError('');
  const { saveNewPassword } = useContext(AuthContext);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const validatePasswords = (values) => {
    const errors = {};

    const passwordError = validatePassword(values.password);

    if (passwordError) {
      errors.password = passwordError;
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords must match';
    }

    return errors;
  };

  if (isPasswordUpdated) {
    return <SuccessMessage />;
  }

  return (
    <>
      <section className=''>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validateOnMount={true}
          validate={validatePasswords}
          onSubmit={({ password, confirmPassword }) => {
            return saveNewPassword({
              resetToken: resetPasswordToken,
              password,
              confirmPassword,
            })
              .then(() => {
                setIsPasswordUpdated(true);
              })
              .catch((error) => {
                setError(error.response?.data?.message);
              });
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className='box'>
              <h1 className='title'>Change Password</h1>
              <div className='field'>
                <label htmlFor='password' className='label'>
                  New password
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
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
                <label htmlFor='confirmPassword' className='label'>
                  Confirm password
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    name='confirmPassword'
                    type='password'
                    id='confirmPassword'
                    placeholder='*******'
                    className={cn('input', {
                      'is-danger':
                        touched.confirmPassword && errors.confirmPassword,
                    })}
                  />

                  <span className='icon is-small is-left'>
                    <i className='fa fa-lock'></i>
                  </span>

                  {touched.confirmPassword && errors.confirmPassword && (
                    <span className='icon is-small is-right has-text-danger'>
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.password && errors.confirmPassword && (
                  <p className='help is-danger'>{errors.confirmPassword}</p>
                )}
              </div>

              <div className='field'>
                <button
                  type='submit'
                  className={cn('button is-success has-text-weight-bold mr-2', {
                    'is-loading': isSubmitting,
                  })}
                  disabled={
                    isSubmitting || errors.password || errors.confirmPassword
                  }
                >
                  Reset password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>

      {error && <p className='notification is-danger is-light'>{error}</p>}
    </>
  );
};
