import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { usePageError } from '../../hooks/usePageError';
import cn from 'classnames';
import validateEmail from '../../utils/validation/validateEmail';
import validatePassword from '../../utils/validation/validatePassword';

const validateEmailChange = (values) => {
  const errors = {};

  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = emailError;
  }

  const newEmailError = validateEmail(values.newEmail);
  if (newEmailError) {
    errors.newEmail = newEmailError;
  }

  if (values.email === values.newEmail && values.email) {
    errors.newEmail = 'Emails cannot be the same';
  }

  return errors;
};

export const ChangeEmailForm = ({ close, setSuccessMsg, waitingForChange }) => {
  const [error, setError] = usePageError('');
  const { user, changeEmail } = useContext(AuthContext);

  return (
    <>
      <p className='is-size-4 has-text-weight-semibold mb-4'>Change email</p>

      <Formik
        initialValues={{
          email: user.email,
          password: '',
          newEmail: '',
        }}
        validate={validateEmailChange}
        validateOnMount={true}
        onSubmit={({ email, password, newEmail }) => {
          return changeEmail({ id: user.id, email, password, newEmail })
            .then(() => {
              setSuccessMsg(
                'Check your new email. We have sent you an email with the confirmation link'
              );
              waitingForChange(true);
              close('email');
            })
            .catch((error) => {
              setError(error.response?.data?.message);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            {/* EMAIL */}
            <div className='field'>
              <label htmlFor='email' className='label'>
                Current email
              </label>

              <div className='control has-icons-right'>
                <Field
                  name='email'
                  type='email'
                  id='email'
                  placeholder='Enter current email'
                  className={cn('input', {
                    'is-danger': touched.email && errors.email,
                  })}
                />

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
            {/* PASSWORD */}
            <div className='field'>
              <label htmlFor='password' className='label'>
                Password
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
            {/* NEW EMAIL */}
            <div className='field'>
              <label htmlFor='newEmail' className='label'>
                New email
              </label>

              <div className='control has-icons-right'>
                <Field
                  name='newEmail'
                  type='newEmail'
                  id='newEmail'
                  placeholder='Enter new email'
                  className={cn('input', {
                    'is-danger': touched.newEmail && errors.newEmail,
                  })}
                />

                {touched.newEmail && errors.newEmail && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.newEmail && errors.newEmail && (
                <p className='help is-danger'>{errors.newEmail}</p>
              )}
            </div>
            {/* buttpns SAVE and CANCEL */}
            <div className='field is-flex is-justify-content-end'>
              <button
                type='submit'
                className={cn('button is-success has-text-weight-bold mr-2', {
                  'is-loading': isSubmitting,
                })}
                disabled={
                  isSubmitting ||
                  errors.password ||
                  errors.email ||
                  errors.newEmail
                }
              >
                Save
              </button>

              <button
                type='button'
                className='button has-text-weight-bold'
                onClick={() => close('email')}
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
