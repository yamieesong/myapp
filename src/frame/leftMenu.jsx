import React, { useEffect, useState, useLayoutEffect } from 'react'
import logo_img from '../images/gagevue_logo.png'
import Session from 'react-session-api'
import axios from 'axios'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initUserInfo, userInfo } from '../redux/loginSlice'
import zustandStore from '../zustand/zustandStore'

const LeftMenu = () => {
  const dispatch = useDispatch()
  const { userInfo, isLoading, error } = useSelector((store) => store.login)

  const { zustandUserInfo, initZustandUserInfo } = zustandStore()

  const [state, setState] = useState(false)

  useEffect(() => {
    console.log('leftmenu userInfo')

    if ('SUCCESS' === userInfo.result) setLoginId(userInfo.loginId)
    else if ('SUCCESS' === zustandUserInfo.data.result) setLoginId(zustandUserInfo.data.loginId)
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
    // setLoginId(Session.get('loginId'))
    // //console.log(Session.get('usrMnuAtrt'))
    // //menulist2 = Session.get('usrMnuAtrt')
    // //console.log('??????????')
    // if (Session.get('usrMnuAtrt') != undefined) {
    //   setMenuList(Session.get('usrMnuAtrt'))
    // }
    // const usrMnuAtrt2 = sessionStorage.getItem('usrMnuAtrt2')
    // console.log(usrMnuAtrt2)
    // let loginInfo = sessionStorage.getItem('loginInfo')
    // console.log(loginInfo)
    //
    // let loginInfo2 = sessionStorage.getItem('loginInfo2')
    // console.log(loginInfo2)
    // console.log('debug')
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
        <li>
          {<Link to={url}>- {menuList[i].nodeList[j].mnu_nm}</Link>}
          {
            // <a href={url}>
            //   - {menuList[i].nodeList[j].mnu_nm}
            // </a>
          }
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
            <a class="logo" href={'/dashboard/home'}>
              <img id="logoImg" src={logo_img} />
            </a>
          </div>
        </div>
      </div>
      <div style={{ padding: '10px' }} class="login">
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
