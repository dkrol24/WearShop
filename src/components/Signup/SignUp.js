import React, { useState, useEffect } from 'react';
import {withRouter,Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { signUpUser,resetAllAuthForms } from '../../redux/User/user.actions';




import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';


const mapState = ({user}) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
})

const SignUp = props => {
  const {signUpSuccess,signUpError} = useSelector(mapState)
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(()=>{
    if (signUpSuccess) {
      reset();
      dispatch(resetAllAuthForms());
      props.history.push('/');
    }
  },[signUpSuccess])

  useEffect(()=>{
    if (Array.isArray(signUpError) && signUpError.length > 0){
      setErrors(signUpError);
    }
  },[signUpError])

  
  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleFormSubmit =  event => {
    event.preventDefault();
    dispatch(signUpUser({
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

export default withRouter(SignUp);