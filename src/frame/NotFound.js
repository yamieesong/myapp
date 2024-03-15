import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

function NotFound(props) {
  const location = useLocation()

  return (
    <>
      <h1> NotFound: {location.pathname} </h1>{' '}
    </>
  )
}

export default NotFound
