import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {signUpUserStart} from '../../redux/User/user.actions'
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
});

const SignUp = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);




  useEffect(() => {
    if (currentUser) {
      reset();
      history.push('/');
    }

  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }

  }, [userErr]);
  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(signUpUserStart({
      displayName,
      email,
      password,
      confirmPassword
    }));
  }

  const configAuthWrapper = {
    headline: 'Rejestracja'
  };
    return(
      <AuthWrapper {...configAuthWrapper}> 
                <div className="formWrap">
                {errors.length > 0 && (
                  <ul>
                    {errors.map((err,index) => {
                      return(
                        <li key={index}>
                        {err}
                      </li>
                     )
                    })}
                  </ul>
                )}
                  <form onSubmit={handleFormSubmit}>
                  <FormInput type='text' name='displayName' value={displayName} placeholder="Imię i nazwisko" handleChange={e => setDisplayName(e.target.value)}/>
                  <FormInput type='email' name='email' value={email} placeholder="E-mail" handleChange={e => setEmail(e.target.value)}/>
                  <FormInput type='password' name='password' value={password} placeholder="Hasło" handleChange={e => setPassword(e.target.value)}/>
                  <FormInput type='password' name='confrimPassword' value={confirmPassword} placeholder="Powtórz hasło"  handleChange={e => setConfirmPassword(e.target.value)}/>
                    <Button type="submit">Zarejestruj</Button>

                </form>
                <div className="links">
          <Link to="/login">
                Zaloguj
          </Link>
          
        </div>
                </div>
                    </AuthWrapper>

    )
  }

export default SignUp