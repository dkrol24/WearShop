import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { resetPasswordStart, resetUserState } from '../../redux/User/user.actions';
import './styles.scss';

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr
});

const EmailPassword = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push('/login');
    }

  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }

  }, [userErr]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  }

  const configAuthWrapper = {
    headline: 'E-mail'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">

        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return (
                <li key={index}>
                  {e}
                </li>
              );
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <Button type="submit">
            Wyślij.
          </Button>

        </form>

        <div className="links">
          <Link to="/login">
            Zaloguj się
          </Link>
          {` | `}
          <Link to="/registration">
            Zarejestruj się
          </Link>
        </div>

      </div>
    </AuthWrapper>
  );
}

export default EmailPassword;