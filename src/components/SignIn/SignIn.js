import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { emailSignInStart,signInWithGoogle,resetAllAuthForms } from '../../redux/User/user.actions';

import { Link, withRouter } from 'react-router-dom';




import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';

const mapState = ({user}) => ({
  currentUser: user.currentUser
});

const SignIn = props => {
  const { currentUser} = useSelector(mapState)
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

//if you hit in LOGOUT - then you can't click LOGIN because signInSuccess is :true THIS NEW ACTION RESET SIGNINSUCCES
  useEffect(()=>{
    if (currentUser){
    resetForm();
    props.history.push('/');
    }
  },[currentUser]);



  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit =  e => {
    e.preventDefault();
    dispatch(emailSignInStart({email,password}));
  }
 const handleGoogleSignIn = () => {
  dispatch(signInWithGoogle());
 }
  const configAuthWrapper = {
    headline: 'LogIn'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />

          <Button type="submit">
            LogIn
          </Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>
                Sign in with Google
              </Button>
            </div>
          </div>

          <div className="links">
            <Link to="/registration">
              Register
            </Link>
            {` | `}
            <Link to="/recovery">
              Reset Password
            </Link>
          </div>

        </form>
      </div>
    </AuthWrapper>
  );
}

export default withRouter(SignIn);