import React, { useEffect, useState, useLayoutEffect } from 'react'
import logo_img from '../images/gagevue_logo.png'
import Session from 'react-session-api'
import axios from 'axios'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initUserInfo, userInfo } from '../redux/loginSlice'
import zustandStore from '../zustand/zustandStore'
// import testImg from './testImg.png'

const LeftMenu = () => {
  console.log('LeftMenu!!!')
  const dispatch = useDispatch()
  const { userInfo, isLoading, error } = useSelector((store) => store.login)

  const { zustandUserInfo, initZustandUserInfo } = zustandStore()

  const [state, setState] = useState(false)

  useEffect(() => {
    console.log('leftmenu userInfo!!!')

    if ('SUCCESS' === userInfo.result) {
      // alert('리덕스')
      setMenuList(userInfo.usrMnuAtrt)
      setLoginId(userInfo.loginId)
    } else if ('SUCCESS' === zustandUserInfo.data.result) {
      // alert('zustand')
      setMenuList(zustandUserInfo.data.usrMnuAtrt)
      setLoginId(zustandUserInfo.data.loginId)
    }
  }, [userInfo])

  useEffect(() => {
    console.log('leftmenu zustandUserInfo')
    if ('SUCCESS' === userInfo.result) setLoginId(userInfo.loginId)
    else if ('SUCCESS' === zustandUserInfo.data.result) setLoginId(zustandUserInfo.data.loginId)
  }, [zustandUserInfo])

  const [loginId, setLoginId] = useState('')
  const [menuList, setMenuList] = useState([])

  const [visible1, setVisible1] = useState(false)

  const navigate = useNavigate()

  const linkStyle = {
    // cursor: pointer,
  }

  const aClick = (e) => {
    console.log('aClick start')
    setVisible1(true)
    if ('a0' === e.target.name) {
      if (document.getElementsByName('dd0')[0].style.display === 'none')
        document.getElementsByName('dd0')[0].style.display = ''
      else document.getElementsByName('dd0')[0].style.display = 'none'
    } else if ('a1' === e.target.name) {
      if (document.getElementsByName('dd1')[0].style.display === 'none')
        document.getElementsByName('dd1')[0].style.display = ''
      else document.getElementsByName('dd1')[0].style.display = 'none'
    } else if ('a2' === e.target.name) {
      if (document.getElementsByName('dd2')[0].style.display === 'none')
        document.getElementsByName('dd2')[0].style.display = ''
      else document.getElementsByName('dd2')[0].style.display = 'none'
    }
    /*
    document.getElementsByName('dd0')[0].style.display='none';
    document.getElementsByName('dd1')[0].style.display='none';
    document.getElementsByName('dd2')[0].style.display='none';

    */
  }

  let i = -1
  const nodeList = () => {
    console.log('nodeList start')
    console.log('menuList', menuList)
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
        <li key={j}>
          {<Link to={url}>- {menuList[i].nodeList[j].mnu_nm}</Link>}
        </li>,
      )
    }
    //MNU_URL
    //mnu_nm
    return nodeList
  }

  const logoutproc = () => {
    if (window.confirm('로그아웃?')) {
      dispatch(initUserInfo([]))
      initZustandUserInfo()
      navigate('/')
    }
  }

  return (
    <>
      <h3 class="hidden">lnb 영역</h3>
      <div id="lnb_area">
        <div class="logo">
          <div id="header">
            <Link class="logo" to="/dashboard/home">
              <img id="logoImg" src={logo_img} alt="logo_img" />
            </Link>
          </div>
        </div>
      </div>
      <div style={{ padding: '10px' }} class="login">
        <div>
          {/*<img src={testImg} />*/}
        </div>
        <p><b>{loginId}</b> 님 접속중 | <a className="logout"
                                       onClick={logoutproc}
                                       name="modal"
                                       style={{ cursor: 'pointer' }}>LOGOUT</a>
        </p>
        {/*<p style={{marginTop: '10px'}}>*/}
        {/*<a class='logout' onClick={logoutproc} name='modal'>*/}
        {/*        <span>LOGOUT</span>*/}
        {/*    </a>*/}
        {/*</p>*/}
      </div>
      <div></div>
      <ul class="lnbMenu">
        {menuList.map((list, index) => {
          let aName = 'a' + index
          let ddName = 'dd' + index
          return (
            <li key={index}>
              <dl>
                <dt>
                  <a
                    onClick={aClick}
                    name={aName}
                    href="#"
                    class="lnbBtn menu005"
                    key={index}
                  >
                    {list.mnu_nm}
                  </a>
                </dt>
                <dd style={{ display: 'none' }} name={ddName}>
                  {nodeList()}
                </dd>
              </dl>
            </li>
          )
        })}
      </ul>
    </>
  )
}
export default LeftMenu
