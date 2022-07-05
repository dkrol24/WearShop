import React,{Component} from 'react';
import './styles.scss';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confrimPassword: '',
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

  render(){

    const {displayName} = this.state;

    return(
        <div className='signup'>
            <div className='wrap'>
                <h2>Signup</h2>
                
                <form action="">
                  <FormInput type='text' name='displayName' value={displayName} placeholder="Full Name" onChange={this.handleChange}/>

                </form>
            </div>
        </div>
    )
  }
}

export default SignUp