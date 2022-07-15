import React,{useEffect} from 'react'
import './default.scss'
import {useDispatch } from 'react-redux';
import {Route,Switch} from 'react-router-dom'
import { checkUserSession } from './redux/User/user.actions';

//hoc
import WithAuth from './hoc/withAuth'
import WithAdminAuth from './hoc/withAdminAuth';

// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/HomePage/HomePage';
import Registration from './pages/Registration/Registration'
import Login from './pages/Login/Login';
import RecoveryPassword from './pages/RecoveryPassword/RecoveryPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';


const App = props => {
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])
  
  return (
    <div className='App'>
    <Switch>
    <Route exact path="/" render={()=>(
      <HomepageLayout >
        <Homepage/>
      </HomepageLayout>
    )}/>
    <Route path="/registration" render={()=> 
      <MainLayout>
        <Registration/>
      </MainLayout>
    }/>
    <Route path="/login" render={()=> 
      <MainLayout>
        <Login/>
      </MainLayout>
    }/>

    <Route path="/recovery" render={() => (
      <MainLayout>
        <RecoveryPassword />
      </MainLayout>
    )}/>
    <Route path="/admin" render={() => (
      <WithAdminAuth>
      <MainLayout>
        <Admin />
      </MainLayout>
      </WithAdminAuth>
    )}/>
    <Route path="/dashboard" render={() => (
      <WithAuth>
      <MainLayout>
        <Dashboard />
      </MainLayout>
      </WithAuth>
    )}/>
    </Switch>

    </div>

  )
}


export default App;