import React, {useEffect, useState, useLayoutEffect} from 'react'
import LeftMenu from '../frame/leftMenu'
import {useNavigate, useParams, useLocation} from 'react-router-dom'
import Content from '../frame/Content'
import {useDispatch, useSelector} from "react-redux";

const Dashboard = () => {
    console.log('Dashboard start')
    const {userInfo, isLoading, error} = useSelector((store) => store.login)
    const userParam = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    // const loginInfo = sessionStorage.getItem('loginInfo2')
    // if (loginInfo == null || loginInfo == '') {
    //   alert('로그인이 필요합니다')
    //   navigate('/')
    //   //history.push('/')
    // }

    useEffect(() => {
        console.log('Dashboard userInfo')
        if (0 === userInfo.length || 'FALSE' === userInfo.result) {
            alert('로그인이 필요합니다')
            navigate('/')
        }
    }, [userInfo]);

    //const [url, setUrl] = useState('')
    //const [sampletest, setSampletest] = useState('')

    let url = ''
    console.log("userParam", userParam)
    if (userParam) {
        if (userParam.samplePage) {
            url = userParam.samplePage
        } else if (userParam.gagevuePage) {
            url = userParam.gagevuePage
        } else if (userParam.mypage) {
            url = userParam.mypage
        } else if (userParam.dlmPage) {
            url = userParam.dlmPage
        } else if (userParam.systemPage) {
            url = userParam.systemPage
        } else if (userParam.test) {
            url = userParam.test
        } else if (userParam.system) {
            url = userParam.system
        }
    }
    let splitLoc = location.pathname.split("/");
    let lastArrNum = splitLoc.length - 1
    console.log("Dashboard splitLoc", splitLoc, lastArrNum)
    console.log("splitLoc[lastArrNum].toLowerCase()", splitLoc[lastArrNum].toLowerCase())
    console.log("url.toLowerCase()", url.toLowerCase())
    console.log("splitLoc[lastArrNum].toLowerCase() === url.toLowerCase()", splitLoc[lastArrNum].toLowerCase() === url.toLowerCase())
    // alert(splitLoc[lastArrNum])
    // alert(url)
    if (splitLoc[lastArrNum].toLowerCase() === url.toLowerCase()) {
        url = "/" + splitLoc[lastArrNum - 1] + "/" + splitLoc[lastArrNum];
    }

    console.log("Dashboard url", url)

    //if (userParam.samplePage) url=userParam.samplePage

    // let sampletest=''

    useLayoutEffect(() => {
        console.log('Dashboard useEffect start')

        // if (userParam.samplePage === 'samplepage1') {
        // console.log('samplepage1 start!!!!!!!!!!')
        //    setSampletest(userParam.samplePage)
        // }

        /*
        const loginInfo = sessionStorage.getItem('loginInfo2')
        if (loginInfo == null || loginInfo == '') {
          alert('로그인이 필요합니다')
          navigate('/')
          //history.push('/')
        }
        */
    }, [])

    return (
        <>
            <div id='dashboard'>
                <div id='mask'></div>
                <div id='wrap_area'>
                    <div id='container'>
                        <ul>
                            <li class='lnb'>{<LeftMenu/>}</li>
                            <li class='contents'>
                                <div class='content'>{userParam && <Content url={url}/>}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
