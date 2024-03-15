import React, { useState, useEffect } from 'react'
import './SamplePage1.css'
import axios from 'axios'
import Modal from 'react-modal'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

const SamplePage1 = () => {
  //세션값
  const [sessionUserName, setSessionUserName] = useState('')
  const [sessionLoginId, setSessionLoginId] = useState('')

  //noticeList
  const [stitle, setStitle] = useState('')
  const [sfromDate, setSfromDate] = useState('')
  const [stoDate, setStoDate] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchKey, setSearchKey] = useState('')
  const [sname, setSname] = useState('')
  const [title, setTitle] = useState('')
  const [totCnt, setTotCnt] = useState(0)

  const [noticeList, setNoticeList] = useState([])

  //noticeDetail
  const [loginId, setLoginId] = useState('')
  const [noticeTitle, setNoticeTitle] = useState('')
  const [noticeContent, setNoticeContent] = useState('')
  const [noticeNo, setNoticeNo] = useState('')
  const [loginName, setLoginName] = useState('')

  // 모달
  const [modalIsOpen, setModalIsOpen] = useState(false)

  //테스트용
  const [inputValue, setInputValue] = useState({})

  //체크박스
  const [allCheck, setAllCheck] = useState(false)
  const [noticeCheck, setNoticeCheck] = useState([])

  //보이기
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)

  useEffect(() => {
    console.log('samplePage1 useEffect start')
    //console.log(sessionStorage.getItem('userNm'))
    // setSessionLoginId(sessionStorage.getItem('loginId'))
    // setSessionUserName(sessionStorage.getItem('userNm'))

    // console.log(sessionLoginId)
    // console.log(sessionUserName)

    listSearch()
  }, [])

  const noticeNoStyle = {
    color: 'red',
  }

  const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  const fsettitle = (e) => {
    setStitle(e.target.value)
  }

  const inputTitleKeyUp = (e) => {
    console.log('inputTitleKeyUp start')
    console.log(e.target.value)
    if (e.keyCode === 13) listSearch()
  }

  const noticeInsert = async () => {
    console.log('noticeInsert start')
    let params = new URLSearchParams()
    params.append('loginId', sessionStorage.getItem('loginId'))
    params.append('noticeTitle', noticeTitle)
    params.append('noticeContent', noticeContent)

    await axios
      .post('/system/insertNotice', params)
      .then((res) => {
        console.log('insertNotice res start')
        alert('등록성공')
        closeModal()
        listSearch()
      })
      .catch((err) => {
        console.log('insertNotice catch start')
        alert(err.message)
      })
  }

  const testBtn = (e) => {
    alert(noticeCheck)
  }

  const noticeCheckChange = (e, noticeNo) => {
    console.log('noticeCheckChange start')
    console.log(noticeNo)
    if (e.target.checked) {
      console.log('checked')
      let flag = true
      for (let i = 0; i < noticeCheck.length; i++) {
        if (noticeCheck[i] == noticeNo) flag = false
      }
      if (flag) {
        const updateNoticeCheck = [...noticeCheck, noticeNo]
        setNoticeCheck(updateNoticeCheck)
      }
      console.log(noticeCheck)
    } else {
      console.log('!checked')
      for (let i = 0; i < noticeCheck.length; i++) {
        if (noticeCheck[i] == noticeNo) {
          noticeCheck.splice(i, 1)
        }
      }
      console.log(noticeCheck)
    }
  }

  const noticeAllCheck = (e) => {
    console.log('noticeAllCheck')
    if (!allCheck) {
      setAllCheck(true)
      console.log(noticeList)
      let noticeNoArr = []
      for (let i = 0; i < noticeList.length; i++) {
        console.log(noticeList[i].noticeNo)
        noticeNoArr.push(noticeList[i].noticeNo)
        document.getElementsByName(
          'notice_' + noticeList[i].noticeNo,
        )[0].checked = true
      }
      setNoticeCheck(noticeNoArr)
      //let noticeNoTest=noticeNo;
      //document.getElementsByName('notice_'+noticeList[i].noticeNo)[0].checked=true;
    } else {
      setAllCheck(false)
      for (let i = 0; i < noticeList.length; i++) {
        console.log(noticeList[i].noticeNo)
        document.getElementsByName(
          'notice_' + noticeList[i].noticeNo,
        )[0].checked = false
      }
      setNoticeCheck([])
    }
  }

  const noticeUpdate = async () => {
    console.log('noticeUpdate start')
    let params = new URLSearchParams()
    params.append('noticeNo', noticeNo)
    params.append('noticeTitle', noticeTitle)
    params.append('noticeContent', noticeContent)

    await axios
      .post('/system/noticeUpdate', params)
      .then((res) => {
        console.log('noticeUpdate res start')
        alert('수정성공')
        closeModal()
        listSearch()
      })
      .catch((err) => {
        console.log('noticeUpdate catch start')
        alert(err.message)
      })
  }

  const titleOnChange = (e) => {
    console.log('titleOnChange start')
    setNoticeTitle(e.target.value)
  }
  const contentOnChange = (e) => {
    console.log('contentOnChange start')
    setNoticeContent(e.target.value)
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const noticeListDetail = async (noticeNo) => {
    console.log('noticeListDetail start')
    let params = new URLSearchParams()
    params.append('noticeNo', noticeNo)

    await axios
      .post('/system/noticeDetail', params)
      .then((res) => {
        console.log('noticeDetail res start')
        console.log(res)
        console.log(res.data.noticeDetail.loginId)
        console.log(res.data.noticeDetail.noticeTitle)
        console.log(res.data.noticeDetail.noticeContent)
        console.log(res.data.noticeDetail.noticeNo)
        console.log(res.data.noticeDetail.loginName)

        setLoginId(res.data.noticeDetail.loginId)
        setNoticeTitle(res.data.noticeDetail.noticeTitle)
        setNoticeContent(res.data.noticeDetail.noticeContent)
        setNoticeNo(res.data.noticeDetail.noticeNo)
        setLoginName(res.data.noticeDetail.loginName)

        openModal()
        setVisible1(false)
        setVisible2(true)
        setVisible3(true)
      })
      .catch((err) => {
        console.log('noticeDetail catch start')
        alert(err.message)
      })
  }

  const inputTitle = (e) => {
    console.log('inputTitle start')
    setTitle(e.target.value)
  }

  const listSearch = async (cpage) => {
    console.log('listSearch start')

    cpage = cpage || 1
    setCurrentPage(cpage)

    let params = new URLSearchParams()
    params.append('title', stitle)
    params.append('from_date', sfromDate)
    params.append('to_date', stoDate)
    params.append('currentPage', currentPage)
    params.append('pageSize', pageSize)

    await axios
      .post('/system/noticeListvue.do', params)
      .then((res) => {
        console.log('res start')
        console.log(res)
        setNoticeList(res.data.notice)
        setTotCnt(res.data.noticeCnt)
        console.log(noticeList)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const newReg = () => {
    console.log('newReg start')
    setModalIsOpen(true)
    setVisible1(true)
    setVisible2(false)
    setVisible3(false)

    console.log(sessionStorage.getItem('loginId'))
    console.log(sessionStorage.getItem('userNm'))

    setLoginId(sessionStorage.getItem('loginId'))
    setLoginName(sessionStorage.getItem('userNm'))
    setNoticeTitle('')
    setNoticeContent('')
  }

  const noticeDelete = async () => {
    console.log('noticeDelete start')
    let params = new URLSearchParams()
    params.append('noticeNo', noticeNo)

    console.log('noticeDelete params : ' + params)

    await axios
      .post('/system/noticeDelete', params)
      .then((res) => {
        console.log('noticeUpdate res start')
        alert('삭제성공')
        closeModal()
        listSearch()
      })
      .catch((err) => {
        console.log('noticeUpdate catch start')
        alert(err.message)
      })
  }

  return (
    <>
      <div>
        <p class='conTitle'>
          <span> 공지 </span>{' '}
          <span>
            <table cellpadding='5' cellspacing='0' className='samplePageTable'>
              <tr className='samplePageTable2'>
                <td className='samplePageTable3' width='50' height='25'>
                  <div id='searchArea' class='d-flex justify-content-around'>
                    제목{' '}
                    <input
                      className='samplePageInput1'
                      type='text'
                      class='form-control'
                      id='stitle'
                      name='stitle'
                      onChange={fsettitle}
                    />{' '}
                    <input
                      type='date'
                      class='form-control'
                      id='sfromdate'
                      name='sfromdate'
                      onChange={(e) => {
                        setSfromDate(e.target.value)
                      }}
                    />{' '}
                    <input
                      type='date'
                      class='form-control'
                      id='stodate'
                      name='stodate'
                      onChange={(e) => {
                        setStoDate(e.target.value)
                      }}
                    />{' '}
                    <span class='fr'>
                      <a
                        onClick={listSearch}
                        class='btn btn-primary mx-2'
                        id='btnSearchGrpcod'
                        name='btn'
                      >
                        <span> 검 색 </span>{' '}
                      </a>{' '}
                      <a
                        class='btn btn-light mx-2'
                        onClick={newReg}
                        name='modal'
                      >
                        <span> 신규등록 </span>{' '}
                      </a>{' '}
                      <button onClick={openModal} type='button'>
                        모달테스트{' '}
                      </button>{' '}
                      <button onClick={testBtn} type='button'>
                        테스트버튼{' '}
                      </button>{' '}
                    </span>{' '}
                  </div>{' '}
                </td>{' '}
              </tr>{' '}
            </table>{' '}
          </span>{' '}
        </p>{' '}
        <div style={{ marginTop: '100px' }}>
          <span>
            {' '}
            {totCnt !== 0 && '총 게시글: ' + totCnt}{' '}
            {currentPage != 0 && ' / 현재 페이지 번호 : ' + currentPage}{' '}
          </span>{' '}
          <table class='col'>
            <thead>
              <tr>
                <th>
                  <input
                    type='checkbox'
                    name='noticeAllCheck'
                    checked={allCheck}
                    onChange={noticeAllCheck}
                  />{' '}
                </th>{' '}
                <th scope='col'> noticeNo </th>{' '}
                <th scope='col'> noticeTitle </th>{' '}
                <th scope='col'> noticeRegdate </th>{' '}
                <th scope='col'> loginId </th> <th scope='col'> loginName </th>{' '}
              </tr>{' '}
            </thead>{' '}
            <tbody>
              {' '}
              {noticeList.map((list, index) => {
                let checkName = 'notice_' + list.noticeNo
                return (
                  <tr>
                    <td>
                      <input
                        type='checkbox'
                        name={checkName}
                        onChange={(e) => noticeCheckChange(e, list.noticeNo)}
                      />{' '}
                    </td>{' '}
                    <td> {list.noticeNo} </td>{' '}
                    <td onClick={() => noticeListDetail(list.noticeNo)}>
                      {' '}
                      {list.noticeTitle}{' '}
                    </td>{' '}
                    <td> {list.noticeRegdate} </td> <td> {list.loginId} </td>{' '}
                    <td> {list.loginName} </td>{' '}
                  </tr>
                )
              })}{' '}
            </tbody>{' '}
          </table>{' '}
          {/* 페이징 처리 */}{' '}
          <div>
            {' '}
            {[...Array(Math.ceil(totCnt / pageSize))].map((n, index) => {
              return (
                <button
                  style={{ width: '30px', marginLeft: '5px' }}
                  onClick={() => listSearch(index + 1)}
                >
                  {' '}
                  {index + 1}{' '}
                </button>
              )
            })}{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
      <Modal
        style={modalStyle}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        {visible3 && (
          <input readOnly={true} value={noticeNo} style={noticeNoStyle} />
        )}{' '}
        <br />
        loginId <input readOnly={true} value={loginId} /> <br />
        loginName <input readOnly={true} value={loginName} /> <br />
        noticeTitle <input value={noticeTitle} onChange={titleOnChange} />{' '}
        <br />
        noticeContent{' '}
        <textarea
          value={noticeContent}
          onChange={contentOnChange}
        /> <br /> {visible1 && <button onClick={noticeInsert}> 등록 </button>}{' '}
        {visible2 && <button onClick={noticeUpdate}> 수정 </button>}{' '}
        {visible2 && <button onClick={noticeDelete}> 삭제 </button>}{' '}
        <button onClick={closeModal}> 닫기 </button>{' '}
      </Modal>{' '}
    </>
  )
}

export default SamplePage1
