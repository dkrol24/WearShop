import React,{useEffect} from 'react'
import './default.scss'
import { connect } from 'react-redux/es/exports';
import {Route,Switch,Redirect} from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/firebase';
import { setCurrentUser } from './redux/User/user.actions';
// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/HomePage/HomePage';
import Registration from './pages/Registration/Registration'
import Login from './pages/Login/Login';
import RecoveryPassword from './pages/RecoveryPassword/RecoveryPassword';
import Dashboard from './pages/Dashboard/Dashboard';




const App = props => {
const {setCurrentUser, currentUser} = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        })
      }
      setCurrentUser(userAuth)
    });
  
    return () => {
      authListener();
    }
  }, [])
  
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
    <Route path="/dashboard" render={() => (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    )}/>
    </Switch>

    </div>

  )
}
const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);