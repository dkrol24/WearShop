import React,{Component} from 'react'
import './default.scss'
import {Route,Switch,Redirect} from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/firebase';
// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/HomePage/HomePage';
import Registration from './pages/Registration/Registration'
import Login from './pages/Login/Login';
import RecoveryPassword from './pages/RecoveryPassword/RecoveryPassword';


const initialState = {
  currentUser:null
};

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListener = null;

  componentDidMount(){
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      this.setState({
        ...initialState
      })
    });
  }
  componentWillUnmount(){
    this.authListener();
  }

render(){
  const {currentUser} = this.state;


  return (
    <div className='App'>
    <Switch>
    <Route exact path="/" render={()=>(
      <HomepageLayout >
        <Homepage/>
      </HomepageLayout>
    )}/>
    <Route path="/registration" render={()=> currentUser ? <Redirect to="/"/> : (
      <MainLayout>
        <Registration/>
      </MainLayout>
    )}/>
    <Route path="/login" render={()=> currentUser ? <Redirect to="/"/> : (
      <MainLayout>
        <Login/>
      </MainLayout>
    )}/>

    <Route path="/recovery" render={() => (
      <MainLayout>
        <RecoveryPassword />
      </MainLayout>
    )}/>
    </Switch>

    </div>

  )
}
}

export default App