import { Link } from 'react-router-dom';

export const SuccessMessage = () => {
  return (
    <section className='box'>
      <div className='field is-flex is-align-items-center'>
        <span class='icon has-text-success mr-4'>
          <i class='fas fa-2x fa-check-square'></i>
        </span>
        <h1 className='title'>Password successfully reset</h1>
      </div>
      <div className='field'>
        <p>You can now log in with your new password</p>
      </div>
      <div className='field'>
        <Link to='/login'>
          Back to login
          <span class='icon'>
            <i class='fas fa-arrow-right'></i>
          </span>
        </Link>
      </div>
    </section>
  );
};
