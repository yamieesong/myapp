import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Session from 'react-session-api'
import { useNavigate } from 'react-router-dom'

const Left = (props) => {
  const navigate = useNavigate()
  //const navigate = useHistory()
  useEffect(() => {
    console.log('useEffect  start')
    console.log(Session.get('loginResult'))
    if (Session.get('loginResult') === 'S') {
      console.log('로그인상태')
    } else {
      //navigate('/')
    }
  })
  return (
    <>
      <h3> 안녕하세요.메인페이지 입니다. </h3>{' '}
      <ul>
        <Link to='/'>
          {' '}
          <li> Home </li>{' '}
        </Link>{' '}
        <Link to='/product/2'>
          {' '}
          <li> 1 번상품 </li>{' '}
        </Link>{' '}
        <Link to='/product/1'>
          {' '}
          <li> 2 번상품 </li>{' '}
        </Link>{' '}
        <Link to='/product2'>
          {' '}
          <li> product2 </li>{' '}
        </Link>{' '}
      </ul>{' '}
    </>
  )
}

export default Left
