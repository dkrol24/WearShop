import React,{Component} from 'react';


import {auth,handleUserProfile} from '../../firebase/firebase'

import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confrimPassword: '',
  errors: [],
}

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...initialState
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {name,value} = e.target;

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = async event => {
    event.preventDefault();
    const {displayName,email,password,confrimPassword} = this.state;

    if (password !== confrimPassword) {
      const err = ['Hasła nie są takie same!'];
      this.setState({
        errors: err
      })
      return;
    }

    try {

      const {user} = await auth.createUserWithEmailAndPassword(email,password);

      await handleUserProfile(user,{displayName});

      this.setState({
        ...initialState
      });

    } catch(err) {
      //console.log(err)
    }
  }

  render(){

    const {displayName,email,password,confrimPassword,errors} = this.state;
    const configAuthWrapper = {
      headline: 'Zarejestruj się'
  }
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
                <form onSubmit={this.handleFormSubmit}>
                  <FormInput type='text' name='displayName' value={displayName} placeholder="Imię i nazwisko" onChange={this.handleChange}/>
                  <FormInput type='email' name='email' value={email} placeholder="E-mail" onChange={this.handleChange}/>
                  <FormInput type='password' name='password' value={password} placeholder="Hasło" onChange={this.handleChange}/>
                  <FormInput type='password' name='confrimPassword' value={confrimPassword} placeholder="Powtórz hasło" onChange={this.handleChange}/>
                    <Button type="submit">Zarejestruj</Button>

                </form>
                </div>
                    </AuthWrapper>

    )
  }
}

export default SignUp