import React, { useState, useLayoutEffect } from 'react'
import logo_img from '../images/admin/login/logo_img.png'
import Session from 'react-session-api'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const LeftMenu = () => {
  const [loginId, setLoginId] = useState('')
  const [menuList, setMenuList] = useState([])

  const navigate = useNavigate()

  const linkStyle = {
    // cursor: pointer,
  }

  const loginProc = async () => {
    await axios
      .post(
        '/loginProc.do',
        new URLSearchParams({ lgn_Id: 'admin', pwd: 'admin' }),
      )
      .then((resp) => {
        console.log('resp!!!!!!!!!!!!!!')
        setMenuList(resp.data.usrMnuAtrt)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useLayoutEffect(() => {
    console.log('leftmenu useEffect start')
    loginProc()
    setLoginId(Session.get('loginId'))
    //console.log(Session.get('usrMnuAtrt'))
    //menulist2 = Session.get('usrMnuAtrt')
    //console.log('??????????')
    if (Session.get('usrMnuAtrt') != undefined) {
      setMenuList(Session.get('usrMnuAtrt'))
    }
    const usrMnuAtrt2 = sessionStorage.getItem('usrMnuAtrt2')
    console.log(usrMnuAtrt2)
    let loginInfo = sessionStorage.getItem('loginInfo')
    console.log(loginInfo)

    let loginInfo2 = sessionStorage.getItem('loginInfo2')
    console.log(loginInfo2)
    console.log('debug')
  }, [])
  /*
                                useEffect(() => {
                                  console.log('leftmenu useEffect start')
                                  console.log(Session.get('loginResult'))

                                  console.log(Session.get('usrMnuAtrt'))
                                  
                                  Session.get('usrMnuAtrt').forEach((item) => {
                                    item.isShow = false
                                  })
                                  
                                  console.log(Session.get('usrMnuAtrt'))
                                  setMenulist([Session.get('usrMnuAtrt'), ...menulist]);
                                  //setMenulist(Session.get('usrMnuAtrt'));
                                  testArr=Session.get('usrMnuAtrt');
                                  console.log('menulist start');

                                  if (Session.get('loginResult') === 'S') {
                                    console.log('로그인상태')
                                    console.log(Session.get('loginId'))
                                    setLoginId(Session.get('loginId'))
                                  } else {
                                    navigate('/')
                                  }
                                })
                                */

  let i = -1
  const nodeList = () => {
    console.log('nodeList start')
    i++
    let nodeList = []
    let length = menuList[i].nodeList.length
    for (let j = 0; j < length; j++) {
      let url = '/dashboard' + menuList[i].nodeList[j].mnu_url
      // console.log('url start!!!!!!!!!!!!')
      if (!(url.indexOf('.do') === -1)) {
        url = url.slice(0, url.length - 3)
      }
      nodeList.push(
        <li>
          {' '}
          {<Link to={url}> -{menuList[i].nodeList[j].mnu_nm} </Link>}{' '}
          {
            // <a href={url}>
            //   - {menuList[i].nodeList[j].mnu_nm}
            // </a>
          }{' '}
        </li>,
      )
    }
    //MNU_URL
    //mnu_nm
    return nodeList
  }

  const logoutproc = () => {
    console.log(sessionStorage.getItem('loginInfo2'))
    if (window.confirm('로그아웃?')) {
      sessionStorage.setItem('loginInfo2', '')
      navigate('/')
      //navigate.push('/')
    }
  }

  return (
    <>
      <h3 class='hidden'> lnb 영역 </h3>{' '}
      <div id='lnb_area'>
        <div class='logo'>
          <div id='header'>
            <a class='logo'>
              <img id='logoImg' src={logo_img} />{' '}
            </a>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
      <div class='login'>
        <span class='LoginName'> {loginId} </span>{' '}
        <div class='btn_loginArea'>
          <a class='logout' onClick={logoutproc} name='modal'>
            <span> LOGOUT </span>{' '}
          </a>{' '}
        </div>{' '}
      </div>{' '}
      <div> </div>{' '}
      <ul class='lnbMenu'>
        {' '}
        {menuList.map((list, index) => {
          return (
            <li key={index}>
              <dl>
                <dt>
                  <a href='#' class='lnbBtn menu005'>
                    {' '}
                    {list.mnu_nm}{' '}
                  </a>{' '}
                </dt>{' '}
                <dd> {nodeList()} </dd>{' '}
              </dl>{' '}
            </li>
          )
        })}{' '}
      </ul>{' '}
    </>
  )
}
export default LeftMenu
