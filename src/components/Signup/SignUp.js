import React, { useState, useEffect } from 'react';
import {withRouter,Link} from 'react-router-dom'


import {auth,handleUserProfile} from '../../firebase/firebase'



import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';

const SignUp = props => {

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  
  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      const err = ['Password dont match'];
      setErrors(err);
      return
    }
    try {
      const {user} = await auth.createUserWithEmailAndPassword(email,password);
      await handleUserProfile(user, {displayName});
      reset();
      props.history.push('/');
    } catch (err){
      console.log(err)
    }
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