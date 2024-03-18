import React, {useState, KeyboardEvent, useEffect, useLayoutEffect, useRef} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
//import Left from '../frame/Left.js'
import Session from 'react-session-api'
import logo_img from '../images/admin/login/logo_img.png'
import {useDispatch, useSelector} from "react-redux";
import {loginProc} from "../redux/loginSlice";

const Login = () => {
    const dispatch = useDispatch()
    const {userInfo, isLoading, error} = useSelector((store) => store.login)

    const idRef = useRef()
    const pwRef = useRef()

    useEffect(() => {
        console.log('Login useEffect start')
    }, [])

    useLayoutEffect(() => {
        console.log('userInfo start')
        console.log(userInfo)
        // return;
        if ('SUCCESS' === userInfo.result) {
            navigate('/dashboard/home')
        } else if ('FALSE' === userInfo.result) {
            alert(userInfo.resultMsg);
        }
    }, [userInfo])

    const navigate = useNavigate()
    //const history = useHistory()

    const [account, setAccount] = useState({
        lgn_Id: '',
        pwd: '',
    })

    const linkTest = (e) => {
        console.log('linkTest start')
        console.log(e)
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            fLoginProc()
        }
    }

    //input에 입력될 때마다 account state값 변경되게 하는 함수
    const onChangeAccount = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        })
    }

    const fLoginProc = async function () {
        console.log('fLoginProc start')
        console.log(account.lgn_Id)
        console.log(account.pwd)

        // alert(Session.get("loginResult"));
        Session.set('loginResult', 'F')
        Session.set('loginId', '')
        // alert(Session.get("loginResult"));

        await axios
            .post(
                '/loginProc.do',
                new URLSearchParams({lgn_Id: account.lgn_Id, pwd: account.pwd}),
            )
            .then((resp) => {
                console.log('res start')
                console.log(resp)
                const data = resp.data
                if (data.result === 'SUCCESS') {
                    Session.set('loginResult', 'S')
                    Session.set('loginId', data.loginId)
                    //usrMnuAtrt 메뉴리스트
                    Session.set('usrMnuAtrt', data.usrMnuAtrt)

                    sessionStorage.setItem('loginInfo', JSON.stringify(data))

                    sessionStorage.setItem('usrMnuAtrt2', JSON.stringify(data.usrMnuAtrt))

                    const loginInfo = [
                        data.loginId,
                        data.userNm,
                        data.userType,
                        data.serverName,
                    ]
                    sessionStorage.setItem('loginId', data.loginId)
                    sessionStorage.setItem('userNm', data.userNm)
                    sessionStorage.setItem('userType', data.userType)
                    sessionStorage.setItem('serverName', data.serverName)

                    sessionStorage.setItem('loginInfo2', loginInfo)

                    //history.push('/dashboard/home')
                    navigate('/dashboard/home')
                } else {
                    alert('ID 혹은 비밀번호가 틀립니다')
                    Session.set('loginResult', 'F')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const login = () => {
        dispatch(loginProc({id: idRef.current.value, pw: pwRef.current.value}))
    }

    return (
        <>
            <div id='background_board'>
                <div class='login_form shadow'>
                    <div class='login-form-right-side'>
                        <div class='top-logo-wrap'>
                            <img id='login-logo' src={logo_img}/>
                        </div>

                        <h3> 안되는 것이 실패가 아니라 포기하는 것이 실패다 </h3>
                        <p>
                            성공은 실패의 꼬리를 물고 온다.지금 포기한 것이 있는가 ?
                            <br/>
                            그렇다면 다시 시작해 보자. <br/>
                            안되는 것이 실패가 아니라 포기하는 것이 실패다. <br/>
                            포기한 순간이 성공하기 5 분전이기 쉽다. <br/>
                            실패에서 더 많이 배운다. <br/>
                            실패를 반복해서 경험하면 실망하기 쉽다. <br/>
                            하지만 포기를 생각해선 안된다.실패는 언제나 중간역이지 종착역은
                            아니다. <br/>
                        </p>
                        <p> -이대희, ‘1 % 의 가능성을 희망으로 바꾼 사람들’ 에서 </p>
                    </div>

                    <div class='login-form-left-side'>
                        <fieldset>
                            <p class='id'>
                                <label for='user_id'> 아이디 </label>
                                <input
                                    ref={idRef}
                                    id='EMP_ID'
                                    type='text'
                                    name='lgn_Id'
                                    placeholder='아이디'
                                    onChange={onChangeAccount}
                                />
                            </p>
                            <p class='pw'>
                                <label for='user_pwd'> 비밀번호 </label>
                                <input
                                    ref={pwRef}
                                    id='EMP_PWD'
                                    type='password'
                                    name='pwd'
                                    placeholder='비밀번호'
                                    onChange={onChangeAccount}
                                    onKeyDown={onKeyDown}
                                />
                            </p>
                            <p class='member_info'>
                                <input id='cb_saveId' type='checkbox'/>
                                <span style={{marginRight: "40px"}} class='id_save'> ID저장 </span>
                                <Link to='/'><b>아이디 찾기</b></Link>{' '}|{' '}
                                <Link to='/'><b>비밀번호 찾기</b></Link>{' '}|{' '}
                                <Link to='/Register'><b>회원가입</b></Link>
                            </p>
                            <a className='btn_login' id='btn_login' onClick={login}>
                                <strong> Login </strong>
                            </a>
                        </fieldset>
                        {/*<button type='button' onClick={login} style={{marginTop: '200px', width: '300px'}}>*/}
                        {/*    리덕스 로그인 테스트*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
