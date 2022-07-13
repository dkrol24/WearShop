import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { resetPassword,resetAllAuthForms } from '../../redux/User/user.actions';

import './styles.scss';

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';


const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError
});

const EmailPassword = props => {
  const {resetPasswordSuccess, resetPasswordError} = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);


  useEffect(()=>{
    if (resetPasswordSuccess){
      dispatch(resetAllAuthForms());
      props.history.push('/login')
    }
  },[resetPasswordSuccess]);


  useEffect(()=>{
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    }
  },[resetPasswordError])


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetPassword({email}));
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

        <form >

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