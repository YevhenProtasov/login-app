import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { usePageError } from '../../hooks/usePageError';
import cn from 'classnames';
import validateName from '../../utils/validation/validateName';

export const ChangeNameForm = ({ close, setSuccessMsg }) => {
  const [error, setError] = usePageError('');
  const { user, changeName } = useContext(AuthContext);

  return (
    <>
      <Formik
        initialValues={{
          name: user.name,
        }}
        validateOnMount={true}
        onSubmit={({ name }) => {
          if (name === user.name) {
            setError('The same names');

            return;
          }

          return changeName({ id: user.id, newName: name })
            .then(() => {
              console.log('good');
              setSuccessMsg('Name successfully changed');
              close('name');
            })
            .catch((error) => {
              console.log('error changeName');
              setError(error.response?.data?.message);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <div className='field'>
              <div className='control has-icons-right'>
                <Field
                  validate={validateName}
                  name='name'
                  type='text'
                  id='name'
                  placeholder='enter new name'
                  className={cn('input', {
                    'is-danger': touched.name && errors.name,
                  })}
                />

                {touched.name && errors.name && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.name && errors.name && (
                <p className='help is-danger'>{errors.name}</p>
              )}
            </div>

            <div className='field is-flex is-justify-content-end'>
              <button
                type='submit'
                className={cn('button is-success has-text-weight-bold mr-2', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || errors.name}
              >
                Save
              </button>

              <button
                type='button'
                className='button has-text-weight-bold'
                onClick={() => close('name')}
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
