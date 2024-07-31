import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext.jsx';
import { Loader } from '../components/Loader.jsx';

export const ChangeEmailPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const { checkAuth, saveNewEmail } = useContext(AuthContext);
  const { confirmNewEmailToken } = useParams();

  useEffect(() => {
    saveNewEmail(confirmNewEmailToken)
      .then(() => {
        checkAuth();
      })
      .catch((error) => {
        setError(error.response?.data?.message || `Wrong confirmation link`);
      })
      .finally(() => {
        setDone(true);
        setTimeout(() => {
          if (error) {
            navigate('/');
          } else {
            navigate('/profile');
          }
        }, 5000);
      });
  }, []);

  if (!done) {
    return <Loader />;
  }

  return (
    <>
      <h1 className='title'>Сonfirmation of new email</h1>

      {error ? (
        <p className='notification is-danger is-light'>{error}</p>
      ) : (
        <p className='notification is-success is-light'>
          Your email has been successfully changed
        </p>
      )}
    </>
  );
};
