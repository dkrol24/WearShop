import React,{Component} from 'react';
import { Link } from 'react-router-dom';


import {signInWithGoogle,auth} from '../../firebase/firebase';



import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from "../Forms/FormInput/FormInput"
import Button from '../Forms/Button/Button';

const initialState = {
    email: '',
    password: '',
}

//////////////////////////////////////////////////// PAMIĘTAJ ZAPYTANIE JEŻELI EMAIL NIE ISTNIEJE ERROR
class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const {name,value} = e.target;
        this.setState({
            [name]:value
        });
    }

    handleSubmit = async (e) =>{
        e.preventDefault();
        const {email,password} = this.state;

        try{

            await auth.signInWithEmailAndPassword(email,password);
            this.setState({
                ...initialState
            });

        }catch(err){
            // console.log(err);
        }
    };

    render(){
        const {email,password} = this.state;
        const configAuthWrapper = {
            headline: 'Zaloguj się'
        }
        return(
            <AuthWrapper {...configAuthWrapper}>
                        <div className='formWrap'>
                            
                            <form onSubmit={this.handleSubmit}>
                                <FormInput 
                                type = "email"
                                name = "email"
                                value = {email}
                                placeholder = "E-mail"
                                handleChange={this.handleChange}
                                />
                                <FormInput 
                                type = "password"
                                name = "password"
                                value = {password}
                                placeholder = "Hasło"
                                handleChange={this.handleChange}
                                />
                                <Button type="submit">Zaloguj</Button>
                                <div className='socialSignin'>
                                    <div className='row'>
                                        <Button onClick={signInWithGoogle}>
                                            Zaloguj przez google
                                        </Button>
                                    </div>
                                </div>

                                <div className="links">
                                    <Link to="/recovery">
                                        Zapomniałeś hasła?
                                    </Link>
                                </div>
                            </form>
                        </div>
                </AuthWrapper>
        )
    }
}

export default SignIn;