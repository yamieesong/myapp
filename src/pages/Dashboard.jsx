import React, { useEffect, useState, useLayoutEffect } from 'react'
import LeftMenu from '../frame/leftMenu'
import { useNavigate, useParams } from 'react-router-dom'
import Content from '../frame/Content'

const Dashboard = () => {
  console.log('Dashboard start')
  const userParam = useParams()
  const navigate = useNavigate()

  //const [url, setUrl] = useState('')
  //const [sampletest, setSampletest] = useState('')

  let url = ''
  if (userParam) {
    if (userParam.samplePage) {
      url = userParam.samplePage
    } else if (userParam.test) {
      url = userParam.test
    } else if (userParam.system) {
      url = userParam.system
    }
  }
  //if (userParam.samplePage) url=userParam.samplePage

  // let sampletest=''

  useLayoutEffect(() => {
    console.log('Dashboard useEffect start')

    // if (userParam.samplePage === 'samplepage1') {
    // console.log('samplepage1 start!!!!!!!!!!')
    //    setSampletest(userParam.samplePage)
    // }

    const loginInfo = sessionStorage.getItem('loginInfo2')
    if (loginInfo == null || loginInfo == '') {
      alert('로그인이 필요합니다')
      navigate('/')
      //history.push('/')
    }
  }, [])

  return (
    <>
      <div id='dashboard'>
        <div id='mask'></div>
        <div id='wrap_area'>
          <div id='container'>
            <ul>
              <li class='lnb'>{<LeftMenu />}</li>
              <li class='contents'>
                <div class='content'>{userParam && <Content url={url} />}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
