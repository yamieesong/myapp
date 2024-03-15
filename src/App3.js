import logo from './logo.svg'
import './App.css'

import React, { Component, startTransition } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Header from './frame/Header'
import Main from './frame/Main'
import Product from './frame/Product'
import NotFound from './frame/NotFound'
import Left from './frame/Left'
import Login from './pages/Login'
import App2 from './App2'
import Session from 'react-session-api'
import Dashboard from './pages/Dashboard'
import SamplePage1 from './pages/SamplePage1'
import LeftMenu from './frame/leftMenu'
import TestPage from './TestPage'
import TestPage2 from './TestPage2'
import TestPage3 from './TestPage3'
import TestPage4 from './TestPage4'
const App2 = () => {
  //<TestPage/>
  return (
    <div className='App'>
      <TestPage />
      <Route path='/test2' component={TestPage2} />{' '}
      <Route path='/test3' component={TestPage3} />{' '}
      <Route path='/test4' component={TestPage4} />{' '}
      <Route exact path='/' component={Login} />{' '}
      <Route path='/dashboard/home' component={Dashboard} />{' '}
    </div>
  )
}

export default App3
