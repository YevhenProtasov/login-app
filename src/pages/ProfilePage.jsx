import React, { useContext, useState } from 'react';
import { usePageError } from '../hooks/usePageError.js';
import { AuthContext } from '../components/AuthContext.jsx';
import { ChangeEmailForm } from '../components/profile/ChangeEmailForm.jsx';
import { ChangeNameForm } from '../components/profile/ChangeNameForm.jsx';
import { ChangePasswordForm } from '../components/profile/ChangePasswordForm.jsx';
import { usePageSuccess } from '../hooks/usePageSuccess.js';

export const ProfilePage = () => {
  const [error] = usePageError('');
  const [success, setSuccess] = usePageSuccess('');
  const [isEdit, setIsEdit] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [isPendingConfirmation, setIsPendingConfirmation] = useState(false);
  const { user } = useContext(AuthContext);

  const closeChangeForm = (value) =>
    setIsEdit((prev) => ({ ...prev, [value]: false }));

  const emailWillBeChanged = isPendingConfirmation
    ? ' *email will be changed after confirming the new address'
    : '';

  return (
    <>
      <div className='box'>
        <h1 className='title'>Info</h1>
        {/* name */}
        <div className='field'>
          <label className='label'>Name</label>

          <div className='field is-flex'>
            <div className='control is-flex is-flex-grow-1 is-align-items-center'>
              {!isEdit.name && <p>{user.name}</p>}
            </div>

            {!isEdit.name && (
              <button
                className='button mt-auto'
                onClick={() => {
                  setIsEdit((prev) => ({ ...prev, name: true }));
                }}
              >
                <span className='icon'>
                  <i className='fa fa-pencil'></i>
                </span>
              </button>
            )}
          </div>
          {isEdit.name && (
            <ChangeNameForm
              close={closeChangeForm}
              setSuccessMsg={setSuccess}
            />
          )}
        </div>
        {/* email */}
        <div className='field'>
          {!isEdit.email && (
            <>
              <label className='label'>Email</label>

              <div className='field is-flex'>
                <div className='control is-flex is-flex-grow-1 is-align-items-center'>
                  <p>
                    {user.email}
                    {emailWillBeChanged && (
                      <span className='is-size-7 is-italic has-text-grey-light'>
                        {emailWillBeChanged}
                      </span>
                    )}
                  </p>
                </div>

                <button
                  className='button mt-auto'
                  onClick={() => {
                    setIsEdit((prev) => ({ ...prev, email: true }));
                  }}
                >
                  <span className='icon'>
                    <i className='fa fa-pencil'></i>
                  </span>
                </button>
              </div>
            </>
          )}

          {isEdit.email && (
            <ChangeEmailForm
              close={closeChangeForm}
              setSuccessMsg={setSuccess}
              waitingForChange={setIsPendingConfirmation}
            />
          )}
        </div>
        {/* password */}
        <div className='field'>
          {!isEdit.password && (
            <button
              className='button mt-auto'
              onClick={() => {
                setIsEdit((prev) => ({ ...prev, password: true }));
              }}
            >
              <span className='icon mr-2'>
                <i className='fa fa-key'></i>
              </span>
              Change password
            </button>
          )}

          {isEdit.password && (
            <ChangePasswordForm
              close={closeChangeForm}
              setSuccessMsg={setSuccess}
            />
          )}
        </div>
      </div>

      {success && <p className='notification is-success is-light'>{success}</p>}
      {error && <p className='notification is-danger is-light'>{error}</p>}
    </>
  );
};
