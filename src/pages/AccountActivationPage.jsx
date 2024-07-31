import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext.jsx';
import { Loader } from '../components/Loader.jsx';

export const AccountActivationPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const { activate } = useContext(AuthContext);
  const { activationToken } = useParams();

  useEffect(() => {
    activate(activationToken)
      .catch((error) => {
        setError(error.response?.data?.message || `Wrong activation link`);
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
      <h1 className='title'>Account activation</h1>

      {error ? (
        <p className='notification is-danger is-light'>{error}</p>
      ) : (
        <p className='notification is-success is-light'>
          Your account is now active
        </p>
      )}
    </>
  );
};
