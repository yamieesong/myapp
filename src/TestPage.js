import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import TestPage2 from './TestPage2'
import TestPage3 from './TestPage3'
import TestPage4 from './TestPage4'

const TestPage = () => {
  useEffect(() => {
    console.log('TestPage useEffect start')
  }, [])
  return (
    <span id='testPage'>
      <ul>
        <li>
          <Link to='/test2'>test2</Link>
        </li>
        <li>
          <Link to='/test3'>test3</Link>
        </li>
        <li>
          <Link to='/test4'>test4</Link>
        </li>
      </ul>
      <hr />
      <hr />
      <hr />
    </span>
  )
}

export default TestPage
