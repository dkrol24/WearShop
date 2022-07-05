import React from 'react'
import './default.scss'
import {Route} from 'react-router-dom'
import Header from './components/Header/index';
import Homepage from './pages/HomePage';
import Registration from './pages/Registration/Registration'
const App = () => {
  return (
    <div className='App'>
        <Header/>
  <div className='main'>
    <Route path="/" component={Homepage}/>
    <Route path="/registration" component={Registration}/>
  </div>
    </div>

  )
}

export default App