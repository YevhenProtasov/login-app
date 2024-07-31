import { Field, Form, Formik } from 'formik';
import { usePageError } from '../../hooks/usePageError';
import cn from 'classnames';
import validatePassword from '../../utils/validation/validatePassword';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const validatePasswordChange = (values) => {
  const errors = {};

  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  const newPasswordError = validatePassword(values.newPassword);
  if (newPasswordError) {
    errors.newPassword = newPasswordError;
  }

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = 'Confirm Password is required';
  } else if (values.confirmNewPassword !== values.newPassword) {
    errors.confirmNewPassword = 'Passwords must match';
  }

  return errors;
};

export const ChangePasswordForm = ({ close, setSuccessMsg }) => {
  const [error, setError] = usePageError('');
  const { user, changePassword } = useContext(AuthContext);

  return (
    <>
      <p className='is-size-4 has-text-weight-semibold mb-4'>Change password</p>

      <Formik
        initialValues={{
          password: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validate={validatePasswordChange}
        validateOnMount={true}
        onSubmit={({ password, newPassword, confirmNewPassword }) => {
          return changePassword({
            id: user.id,
            password,
            newPassword,
            confirmNewPassword,
          })
            .then(() => {
              setSuccessMsg('Password has been successfully updated');
              close('password');
            })
            .catch((error) => {
              setError(error.response?.data?.message);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            {/* OLD PASS */}
            <div className='field'>
              <label htmlFor='password' className='label'>
                Old password
              </label>

              <div className='control has-icons-right'>
                <Field
                  name='password'
                  type='password'
                  id='password'
                  placeholder='******'
                  className={cn('input', {
                    'is-danger': touched.password && errors.password,
                  })}
                />

                {touched.password && errors.password && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.password && errors.password && (
                <p className='help is-danger'>{errors.password}</p>
              )}
            </div>
            {/* NEW PASSWORD */}
            <div className='field'>
              <label htmlFor='newPassword' className='label'>
                New password
              </label>

              <div className='control has-icons-right'>
                <Field
                  name='newPassword'
                  type='password'
                  id='newPassword'
                  placeholder='******'
                  className={cn('input', {
                    'is-danger': touched.newPassword && errors.newPassword,
                  })}
                />

                {touched.newPassword && errors.newPassword && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.newPassword && errors.newPassword && (
                <p className='help is-danger'>{errors.newPassword}</p>
              )}
            </div>
            {/* CONFIRM NEW PASSWORD */}
            <div className='field'>
              <label htmlFor='confirmNewPassword' className='label'>
                Confirm new password
              </label>

              <div className='control has-icons-right'>
                <Field
                  name='confirmNewPassword'
                  type='password'
                  id='confirmNewPassword'
                  placeholder='******'
                  className={cn('input', {
                    'is-danger':
                      touched.confirmNewPassword && errors.confirmNewPassword,
                  })}
                />

                {touched.confirmNewPassword && errors.confirmNewPassword && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.confirmNewPassword && errors.confirmNewPassword && (
                <p className='help is-danger'>{errors.confirmNewPassword}</p>
              )}
            </div>
            {/* buttons SAVE and CANCEL */}
            <div className='field is-flex is-justify-content-end'>
              <button
                type='submit'
                className={cn('button is-success has-text-weight-bold mr-2', {
                  'is-loading': isSubmitting,
                })}
                disabled={
                  isSubmitting ||
                  errors.password ||
                  errors.newPassword ||
                  errors.confirmNewPassword
                }
              >
                Save
              </button>

              <button
                type='button'
                className='button has-text-weight-bold'
                onClick={() => close('password')}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {error && <p className='notification is-danger is-light'>{error}</p>}
    </>
  );
};
