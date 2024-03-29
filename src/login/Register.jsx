import './Register.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import navLink from './JoinNavLink'
import JoinNavLink from './JoinNavLink'
// import testImg from './testImg.jpg'

const Register = () => {
  useEffect(() => {
    idRef.current.focus()
  }, [])

  const navigate = useNavigate()
  // 아이디 중복체크용
  const [residCheck, setResidcheck] = useState(false)

  const idRef = useRef()
  const pwRef = useRef()
  const pw2Ref = useRef()
  const [visible, setVisible] = useState(false)

  const [id, setId] = useState()
  const [pw, setPw] = useState()
  const [name, setName] = useState()
  const [cellNum, setCellNum] = useState()
  const [mail1, setMail1] = useState()
  const [mail2, setMail2] = useState()
  const [radio, setRadio] = useState('N')

  const [pwDisplay, setPwDisplay] = useState(true)
  const [pwMsg, setPwMsg] = useState(false)
  // const [chk1, setChk1] = useState('N')
  // const [chk2, setChk2] = useState('N')
  // const [chk3, setChk3] = useState('N')

  const chkAll = useRef()
  const chk1 = useRef()
  const chk2 = useRef()
  const chk3 = useRef()


  const join = () => {
    if (!residCheck) {
      idRef.current.focus()
      alert('중복체크 후 다시 시도해주세요')
      return
    }
    const pw1 = pwRef.current.value
    const pw2 = pw2Ref.current.value
    if (!(pw1 === pw2)) {
      alert('비번하고 비번확인하고 일치하지 않음')
      return
    }

    if (!(chk1.current.checked) ||
      !(chk2.current.checked) ||
      !(chk3.current.checked)) {
      alert('약관 전부 동의해주세요')
      return
    }

    // alert('가입완료테스트')
    console.log('db 저장값')
    console.log('id', id)
    console.log('pw', pw)
    console.log('name', name)
    console.log('cellNum', cellNum)
    console.log('mail1', mail1)
    console.log('mail2', mail2)
    console.log('radio', radio)

    axios
      .post(
        '/rgstMbrGgv.do',
        new URLSearchParams({
          joinNm: name,
          joinHp: cellNum,
          joinMail: mail1 + '@' + mail2,
          joinId: id,
          joinPw: pw,
          joinPushYn: radio,
        }),
      )
      .then((resp) => {
        let data = resp.data
        console.log('가입결과' + data)
        if (data > 0) {
          alert('가입완료')
          navigate('/')
        } else {
          alert('잠시 후 다시 시도해주세요.')
          return
        }
      })
      .catch(function(error) {
        console.log(error)
      })

  }

  const pwonChage = () => {
    console.log(pwRef.current.value)
    setPw(pwRef.current.value)

    const pw = pwRef.current.value
    if (8 > pw.length) {
      setPwMsg(true)
      // alert('8~20자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.')
      // pwRef.current.focus()
    } else {
      setPwMsg(false)
      // pw2Ref.current.focus()
    }

    if (pwRef.current.value === pw2Ref.current.value) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }
  const pw2onChage = () => {
    console.log(pw2Ref.current.value)
    if (pwRef.current.value === pw2Ref.current.value) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const idCheck = () => {
    console.log('idCheck start')
    const id = idRef.current.value
    if (0 === id.length) {
      idRef.current.focus()
      alert('아이디 입력해주셈요')
      return
    }
    const params = new URLSearchParams()
    params.append('id', id)
    axios.post('/idCheck', params).then((res) => {
      console.log('idCheck res start')
      if (res.data.result > 0) {
        setResidcheck(false)
        alert('존재하는 아이디\n다른 아이디를 입력해주세요')
      } else {
        setResidcheck(true)
        alert('사용가능합니다')
      }
    })
  }

  const valueCheckTest = () => {
    console.log('id', id)
    console.log('pw', pw)
    console.log('name', name)
    console.log('cellNum', cellNum)
    console.log('mail1', mail1)
    console.log('mail2', mail2)
    console.log('radio', radio)
    console.log('debug start')
    console.log('chk1', chk1.current.checked)
    console.log('chk2', chk2.current.checked)
    console.log('chk3', chk3.current.checked)
  }

  const pwShow = () => {
    setPwDisplay(false)
    pwRef.current.type = 'text'
  }

  const pwHide = () => {
    setPwDisplay(true)
    pwRef.current.type = 'password'
  }

  const pwOnBlur = () => {
    console.log('pwOnBlur')
    // alert('pwOnBlur')
    const pw = pwRef.current.value
    if (8 > pw.length) {
      setPwMsg(true)
      // alert('8~20자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.')
      // pwRef.current.focus()
    } else {
      setPwMsg(false)
      // pw2Ref.current.focus()
    }
  }

  const allChk = () => {
    // console.log('allChk!!!')
    if (chkAll.current.checked) {
      chk1.current.checked = true
      chk2.current.checked = true
      chk3.current.checked = true
    } else {
      chk1.current.checked = false
      chk2.current.checked = false
      chk3.current.checked = false
    }
  }

  return (
    <>
      {/*<JoinNavLink/>*/}
      {/*<img src={testImg}/>*/}
      <p><span>아이디</span><input maxLength="20" placeholder="아이디" type="text" ref={idRef} onChange={(e) => {
        setId(e.target.value)
      }} />
        <button onClick={idCheck}>중복체크</button>
      </p>
      {/*onBlur={pwOnBlur}*/}
      <p><span>비번</span><input maxLength="20" type="password" ref={pwRef} onChange={pwonChage} />
        {pwDisplay ? <button type="button" onClick={pwShow}>비번보임</button> :
          <button type="button" onClick={pwHide}>비번안보임</button>}
      </p>
      <p><span>비번확인</span><input maxLength="20" type="text" ref={pw2Ref} onChange={pw2onChage} />
        {visible ? <span id="pwCheck1">비번일치</span> : <span id="pwCheck2">비번불일치</span>}</p>
      <p>{pwMsg ? <b>8~20자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</b> : ''}</p>
      <p><span>이름</span><input type="text" onChange={(e) => {
        setName(e.target.value)
      }} /></p>
      <p><span>휴대폰번호</span><input type="text" onChange={(e) => {
        setCellNum(e.target.value)
      }} maxLength="13" /></p>
      <p><span>메일주소</span><input type="text" onChange={(e) => {
        setMail1(e.target.value)
      }} />{' '}@{' '}<input type="text" onChange={(e) => {
        setMail2(e.target.value)
      }} /></p>
      <p><span>목표관리 알림 수신 여부 |</span>
        <span>동의 </span><input type="text" onChange={(e) => {
          // alert(e.target.value)
          setRadio(e.target.value)
        }} type="radio" value="Y" checked={radio === 'Y'} />
        <span>미동의</span><input type="text" onChange={(e) => {
          // alert(e.target.value)
          setRadio(e.target.value)
        }} type="radio" value="N" checked={radio === 'N'} /></p>
      <hr />
      <p style={{ margin: '10px' }}><span>재정 관리를 위해 [목표관리] 기능을 활용해보세요. 설정한 목표 금액의 70% 도달 시 메일로 알려드립니다.</span>
      </p>
      <p style={{ margin: '10px' }}><span>(지출목표 알림 %는 가입 시 70%가 기본값으로 설정되며, 마이페이지를 통해 수정하실 수 있습니다.)</span></p>
      <hr />
      <p><input ref={chkAll} onChange={allChk} type="checkbox" /><span><b>모두동의</b></span></p>
      <p><input ref={chk1} type="checkbox" /><span>이용약관 동의 (보기)</span></p>
      <p><input ref={chk2} type="checkbox" /><span>개인정보 수집 이용 동의 (보기)</span></p>
      <p><input ref={chk3} type="checkbox" /><span>만 14세 이상입니다.</span></p>
      <hr />
      <p>
        <button onClick={join}>가입</button>
        <button onClick={valueCheckTest}>값체크용</button>
      </p>
    </>
  )
}

export default Register