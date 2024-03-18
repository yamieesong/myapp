// import './Register.css';
import {NavLink, useLocation, useParams} from "react-router-dom";
import Register from "./Register";
import FindId from "./FindId";
import FindPw from "./FindPw";

const JoinNavLink = () => {
    const useParam = useParams()
    const location = useLocation()
    // console.log('location', location.pathname)
    return (
        <>
            <div id="Register" style={{margin: '200px'}}>
                <hr/>
                <span><NavLink to='/join/join' style={{color: 'red'}}>회원가입</NavLink></span>{' '}|{' '}
                <span><NavLink to='/join/findId' style={{color: 'orange'}}>아이디찾기</NavLink></span>{' '}|{' '}
                <span><NavLink to='/join/findPw' style={{color: 'yellow'}}>비번찾기</NavLink></span>{' '}|{' '}
                <span><NavLink to={location.pathname} style={{color: 'green'}}>메</NavLink></span>{' '}|{' '}
                <span><NavLink to={location.pathname} style={{color: 'blue'}}>뉴</NavLink></span>{' '}|{' '}
                <span><NavLink to={location.pathname} style={{color: 'navy'}}>다</NavLink></span>{' '}|{' '}
                <span><NavLink to='/' style={{color: 'purple'}}>로그인</NavLink></span>{' '}|{' '}
                <hr/>
                {'join' === useParam.join && <Register/>}
                {'findId' === useParam.join && <FindId/>}
                {'findPw' === useParam.join && <FindPw/>}
            </div>
        </>
    )
}

export default JoinNavLink