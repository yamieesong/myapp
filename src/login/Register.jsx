import './Register.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import testImg from './testImg.jpg'

const Register = () => {
    useEffect(() => {
        idRef.current.focus()
    }, [])

    const navigate = useNavigate()
    // 아이디 중복체크용
    const [residCheck, setResidcheck] = useState(false)

    const idRef = useRef();
    const pwRef = useRef();
    const pw2Ref = useRef();
    const [visible, setVisible] = useState(false)

    const [id, setId] = useState()
    const [pw, setPw] = useState()
    const [name, setName] = useState()
    const [cellNum, setCellNum] = useState()
    const [mail1, setMail1] = useState()
    const [mail2, setMail2] = useState()
    const [radio, setRadio] = useState('N')
    // const [chk1, setChk1] = useState('N')
    // const [chk2, setChk2] = useState('N')
    // const [chk3, setChk3] = useState('N')

    const chk1 = useRef()
    const chk2 = useRef()
    const chk3 = useRef()

    const join = () => {
        if (!residCheck) {
            idRef.current.focus();
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
        console.log('id', id);
        console.log('pw', pw);
        console.log('name', name);
        console.log('cellNum', cellNum);
        console.log('mail1', mail1);
        console.log('mail2', mail2);
        console.log('radio', radio);

        axios
            .post(
                '/rgstMbrGgv.do',
                new URLSearchParams({
                    joinNm: name,
                    joinHp: cellNum,
                    joinMail: mail1 + '@' + mail2,
                    joinId: id,
                    joinPw: pw,
                    joinPushYn: radio
                })
            )
            .then((resp) => {
                let data = resp.data;
                console.log('가입결과' + data);
                if (data > 0) {
                    alert('가입완료')
                    navigate('/')
                } else {
                    alert('잠시 후 다시 시도해주세요.');
                    return;
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const pwonChage = () => {
        console.log(pwRef.current.value)
        setPw(pwRef.current.value)
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
        const params = new URLSearchParams()
        params.append('id', id)
        axios.post('/idCheck', params).then((res) => {
            console.log('idCheck res start')
            if (res.data.result > 0) {
                setResidcheck(false)
                alert('아이디 있음')
            } else {
                setResidcheck(true)
                alert('아이디 없음')
            }
        })
    }

    const valueCheckTest = () => {
        console.log('id', id);
        console.log('pw', pw);
        console.log('name', name);
        console.log('cellNum', cellNum);
        console.log('mail1', mail1);
        console.log('mail2', mail2);
        console.log('radio', radio);
        console.log('debug start')
        console.log('chk1', chk1.current.checked);
        console.log('chk2', chk2.current.checked);
        console.log('chk3', chk3.current.checked);
    }

    return (
        <>
            <div id="Register" style={{margin: '200px'}}>
                {/*<img src={testImg}/>*/}
                <p><span>아이디</span><input placeholder='아이디' type='text' ref={idRef} onChange={(e) => {
                    setId(e.target.value)
                }}/>
                    <button onClick={idCheck}>중복체크</button>
                </p>
                <p><span>비번</span><input type='text' ref={pwRef} onChange={pwonChage}/>
                    {visible ? <span id="pwCheck1">비번일치</span> : <span id="pwCheck2">비번불일치</span>}</p>
                <p><span>비번확인</span><input type='text' ref={pw2Ref} onChange={pw2onChage}/></p>
                <p><span>이름</span><input type='text' onChange={(e) => {
                    setName(e.target.value)
                }}/></p>
                <p><span>휴대폰번호</span><input type='text' onChange={(e) => {
                    setCellNum(e.target.value)
                }} maxLength='13'/></p>
                <p><span>메일주소</span><input type='text' onChange={(e) => {
                    setMail1(e.target.value)
                }}/>{' '}@{' '}<input type='text' onChange={(e) => {
                    setMail2(e.target.value)
                }}/></p>
                <p><span>목표관리 알림 수신 여부 |</span>
                    <span>동의 </span><input type='text' onChange={(e) => {
                        // alert(e.target.value)
                        setRadio(e.target.value)
                    }} type='radio' value='Y' checked={radio === 'Y'}/>
                    <span>미동의</span><input type='text' onChange={(e) => {
                        alert(e.target.value)
                        setRadio(e.target.value)
                    }} type='radio' value='N' checked={radio === 'N'}/></p>
                <hr/>
                <p style={{margin: '10px'}}><span>재정 관리를 위해 [목표관리] 기능을 활용해보세요. 설정한 목표 금액의 70% 도달 시 메일로 알려드립니다.</span>
                </p>
                <p style={{margin: '10px'}}><span>(지출목표 알림 %는 가입 시 70%가 기본값으로 설정되며, 마이페이지를 통해 수정하실 수 있습니다.)</span></p>
                <hr/>
                <p><input ref={chk1} type='checkbox'/><span>이용약관 동의 (보기)</span></p>
                <p><input ref={chk2} type='checkbox'/><span>개인정보 수집 이용 동의 (보기)</span></p>
                <p><input ref={chk3} type='checkbox'/><span>만 14세 이상입니다.</span></p>
                <hr/>
                <p>
                    <button onClick={join}>가입</button>
                    <button onClick={valueCheckTest}>값체크용</button>
                </p>
            </div>
        </>
    )
}

export default Register
