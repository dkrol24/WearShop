import React,{Component} from 'react'
import './styles.scss'
import { withRouter } from 'react-router-dom'


import AuthWrapper from '../AuthWrapper/AuthWrapper'
import FormInput from '../Forms/FormInput/FormInput'
import Button from '../Forms/Button/Button'

import { auth } from '../../firebase/firebase'

const initialState = {
    email:'',
    errors: []
};

class EmailPassword extends Component {
    constructor(props){
        super(props);
        this.state= {
            ...initialState
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        const {name,value} = e.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {email} = this.state;
            const config = {
                url: 'http://localhost:3000/login'
            };

            await auth.sendPasswordResetEmail(email,config)
            .then(() => {
                this.props.history.push('/login');
            })
            .catch(()=>{
                const err = ['Niepoprawny adres e-mail'];
                this.setState({
                    errors:err
                });
            });

        }catch(err){
            // console.log(err);
        }
    };


    render(){
        const {email, errors} = this.state;
        const configAuthWrapper = {
            headline: 'Nowe hasło na e-mail'
        }
        return(
            <AuthWrapper {...configAuthWrapper}>
                <div className='formWrap'>
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
                    <form onSubmit={this.handleSubmit}>
                        <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="E-mail"
                        onChange={this.handleChange}
                        />
                    <Button type="submit">Wyślij</Button>
                    </form>
                </div>
            </AuthWrapper>
        )
    }
}

export default withRouter(EmailPassword);