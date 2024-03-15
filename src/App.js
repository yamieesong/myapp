//import logo from './logo.svg'
import './App.css'

import React, { useState, useLayoutEffect, useEffect } from 'react'
import {
  Router,
  Switch,
  Route,
  Link,
  Routes,
  useLocation,
  NavLink,
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

let crtPath = ''

const App = () => {
  //<TestPage/>
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)

  let location = useLocation()

  useLayoutEffect(() => {
    console.log('App useEffect start')
    setVisible(false)
    setVisible2(true)
  }, [])

  // useEffect(() => {
  //   if (crtPath === location.pathname) window.location.reload()
  //
  //   crtPath = location.pathname
  // }, [location])

  // <Route path='/dashboard/sampletest/:home' element={<SamplePage1_ydh />} />
  return (
      <>
        <div id='app'>
          <Routes>
            <Route path='/' element={<Login />} />{' '}
            <Route path='/dashboard/home' element={<Dashboard />} />{' '}
            <Route
                path='/dashboard/sampletest/:samplePage'
                element={<Dashboard />}
            />{' '}
            <Route
                path='/dashboard/scm/:gagevuePage'
                element={<Dashboard />}
            />{' '}
            <Route path='/dashboard/test/:test' element={<Dashboard />} />{' '}
            <Route path='/dashboard/system/:system' element={<Dashboard />} />{' '}
          </Routes>{' '}
        </div>{' '}
      </>
  )
}

export default App