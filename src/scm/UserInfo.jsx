import React, { useState, useEffect, useRef } from 'react'
import { Calendar, formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";

import Modal from 'react-modal'
import '../css/UserInfo.css'

const UserInfo = () => {
    const {userInfo, isLoading, error} = useSelector((store) => store.login)
    const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([])

    // 달력에 표시할 데이터
    const [calendarDataList, setCalendarDataList] = useState([])
    // 풀캘린더
    const [calendar, setCalendar] = useState({})

    // 모달
    const [modalIsOpen, setModalIsOpen] = useState(false)

    // 가게뷰 데이터
    const [mn_no, setMn_no] = useState("")
    const [mn_dtm, setMn_dtm] = useState("")
    const [mn_use_memo, setMn_use_memo] = useState("")
    const [mn_use_dvs, setMn_use_dvs] = useState("0")
    const [mn_use_dvs_det, setMn_use_dvs_det] = useState("0")
    const [mn_pay_dvs, setMn_pay_dvs] = useState("0")
    const [mn_amount, setMn_amount] = useState("")

    // DB액션 플레스
    const [action, setAction] = useState("")

    // 공통코드 데이터
    const [pay_dvs, setPay_dvs] = useState([])
    const [use_dvs, setUse_dvs] = useState([])
    const [detail_code, setDetail_code] = useState([])


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

    useEffect(() => {
        getGagevueList()
        getCodeList()
    }, [])


    const mnUseMemoOnChange = (e) => {
        setMn_use_memo(e.target.value)
    }
    const mnUseDvsOnChange = (e) => {
        setMn_use_dvs(e.target.value)
    }
    const mnUseDvsDetOnChange = (e) => {
        setMn_use_dvs_det(e.target.value)
    }
    const mnPayDvsOnChange = (e) => {
        setMn_pay_dvs(e.target.value)
    }
    const mnAmountOnChange = (e) => {

        if (e.target.value.match(/[^0-9],[,]/)) {
            setMn_amount("")
        }else{
            setMn_amount(e.target.value)
        }
    }

    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        initInputData()
        setModalIsOpen(false)
    }

    const initInputData = () => {
        setMn_no("")
        setMn_use_memo("")
        setMn_use_dvs("0")
        setMn_use_dvs_det("0")
        setMn_pay_dvs("0")
        setMn_amount("")
    }

    const threeComma = (val) => {
        return val.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const setGagevueData = async (calendar) => {
        openModal();
        // console.log("calendar", calendar.event)
        setCalendar(calendar)
        setMn_dtm(calendar.startStr)

        if(typeof calendar.event === "undefined"){
            setAction("INSERT")
        }else{
            setAction("UPDATE")
            // alert(calendar.event._def.publicId)
            selectedData(calendar.event._def.publicId)
        }
    }

    const renderData = (calendar) => {
        let calendarApi = calendar.view.calendar
        calendarApi.removeAllEvents()

        calendarDataList.forEach(function(data){
            calendarApi.addEvent(data)
        })
    }

    const getCodeList = async () => {
        await axios
            .post('/scm/setCode.do')
            .then((res) => {
                // console.log('/scm/setCode.do res start', res)
                let payDvsList = []
                let useDvsList = []
                let detailCodeList = []
                res.data.forEach(function(code){
                    if(code.group_code === "PAY_DVS"){
                        payDvsList.push(code)
                    }else if(code.group_code === "USE_DVS"){
                        useDvsList.push(code)
                    }else if(code.group_code === "PAY_DETAIL" || code.group_code === "USE_DETAIL"){
                        detailCodeList.push(code)
                    }
                })
                setPay_dvs(payDvsList)
                setUse_dvs(useDvsList)
                setDetail_code(detailCodeList)
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    const getGagevueList = async () => {
        let params = new URLSearchParams();
        params.append("mn_rgst_id", userInfo.loginId);

        await axios
            .post('/scm/selectgagevueList.do', params)
            .then((res) => {
                // console.log('/scm/selectgagevueList.do res start', res)
                dispGagevueList(res.data)
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    const dispGagevueList = (info) => {
        // console.log("disGagevueList", info.gagevueList)
        const tmpList = info.gagevueList.map((list) => ({
            id: list.mn_no,
            title: list.mn_use_memo,
            start: list.mn_dtm,
        }));
        setCalendarDataList(tmpList)
        //console.log("tmpList", tmpList)
        //console.log("calendarDataList", calendarDataList)

        if(Object.keys(calendar).length > 0){
            renderData(calendar)
        }
    }

    const selectedData = async (mn_no) => {
        setMn_no(mn_no)
        let params = new URLSearchParams();
        params.append("mn_no", mn_no);

        await axios
            .post("/scm/selectgagevueOne.do", params)
            .then(function (res){
                console.log("/scm/selectgagevueOne.do", res)
                setMn_dtm(res.data.gagevueOne.mn_dtm)
                setMn_use_memo(res.data.gagevueOne.mn_use_memo)
                setMn_use_dvs(res.data.gagevueOne.mn_use_dvs)
                setMn_use_dvs_det(res.data.gagevueOne.mn_use_dvs_det)
                setMn_pay_dvs(res.data.gagevueOne.mn_pay_dvs)
                setMn_amount(res.data.gagevueOne.mn_amount)
                /*
                vm.mn_dtm = response.data.gagevueOne.mn_dtm; // * 사용날짜
                vm.mn_use_memo = response.data.gagevueOne.mn_use_memo; // * 사용내용 : 메모
                vm.mn_use_dvs = response.data.gagevueOne.mn_use_dvs; // * 구분 1: 지출 2:수입
                vm.mn_use_dvs_det = response.data.gagevueOne.mn_use_dvs_det; // * 항목 선택 : U06 교육/육아 등등
                vm.mn_pay_dvs = response.data.gagevueOne.mn_pay_dvs; // * 결제구분 : 1:카드 2:현금
                vm.mn_amount = response.data.gagevueOne.mn_amount; // * 결제금액
                */
            })
            .catch(function (error) {
                alert("에러! API 요청에 오류가 있습니다. " + error);
            });
    }
    const save = async (type) => {
        if(type === "DELETE"){
            alert("미구현")
            closeModal()
            return;
        }
        if(mn_use_memo === "" || mn_use_dvs === "0" || mn_use_dvs_det === "0" || mn_pay_dvs === "0" || mn_amount === ""){
            alert("모든 항목을 입력해 주세요");
            return;
        }
        
        let params = new URLSearchParams();

        params.append("mn_no", mn_no);
        params.append("mn_dtm", mn_dtm);
        params.append("mn_use_memo", mn_use_memo);
        params.append("mn_use_dvs", mn_use_dvs);
        params.append("mn_use_dvs_det", mn_use_dvs_det);
        params.append("mn_pay_dvs", mn_pay_dvs);
        params.append("mn_amount", mn_amount);
        params.append("loginID", userInfo.loginId);
        params.append("action", type);
        params.append("mn_rgst_id", userInfo.loginId);

        await axios
            .post("/scm/savegagevue.do", params)
            .then(function (response) {
                alert(response.data.resultMsg);
                getGagevueList()
                closeModal();
            })
            .catch(function (error) {
                alert("에러! API 요청에 오류가 있습니다. " + error);
            });

    }

    const renderEventContent = (eventInfo) => {
        return (
            <>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    const Sidebar = ({ weekendsVisible, handleWeekendsToggle, currentEvents }) => {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                            type='checkbox'
                            checked={weekendsVisible}
                            onChange={handleWeekendsToggle}
                        ></input>
                        toggle weekends
                    </label>
                </div>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({currentEvents.length})</h2>
                    <ul>
                        {currentEvents.map((event) => (
                            <SidebarEvent key={event.id} event={event} />
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    const SidebarEvent = ({ event }) => {
        return (
            <li key={event.id}>
                <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
                <i>{event.title}</i>
            </li>
        )
    }

    return (
        <>
            <div>
                <div>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: '',
                            center: 'title',
                            right: 'prev,next today',
                        }}
                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={weekendsVisible}
                        events={calendarDataList} // alternatively, use the `events` setting to fetch from a feed
                        select={setGagevueData}
                        eventContent={renderEventContent} // custom render function
                        eventClick={setGagevueData}
                        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                        /* you can update a remote database when these fire:
                        eventAdd={openPop}
                        eventChange={function(){}}
                        eventRemove={function(){}}
                        */
                    />
                </div>
            </div>
            <Modal
                style={modalStyle}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <table className='row modal-content'>
                    <tr>
                        <th>날짜</th>
                        <td>
                            {mn_dtm}
                        </td>
                    </tr>
                    <tr>
                        <th>사용 내용</th>
                        <td>
                            <input
                                type='text'
                                value={mn_use_memo}
                                onChange={mnUseMemoOnChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>구분</th>
                        <td>
                            {/*
                            <input
                                type='text'
                                value={mn_use_dvs}
                                onChange={mnUseDvsOnChange}
                            />
                            */}
                            <select value={mn_use_dvs} onChange={mnUseDvsOnChange}>
                                <option key='0' value='0' disabled selected>
                                    구분
                                </option>
                                {use_dvs.map((item) => (
                                    <option key={item.detail_code} value={item.detail_code}>
                                        {item.detail_name}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>항목</th>
                        <td>
                            {/*
                            <input
                                type='text'
                                value={mn_use_dvs_det}
                                onChange={mnUseDvsDetOnChange}
                            />
                            */}
                            <select value={mn_use_dvs_det} onChange={mnUseDvsDetOnChange}>
                                <option key='0' value='0' disabled selected>
                                    항목
                                </option>
                                {detail_code.map((item) => (
                                    <option key={item.detail_code} value={item.detail_code}>
                                        {item.detail_name}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>결제</th>
                        <td>
                            {/*
                            <input
                                type='text'
                                value={mn_pay_dvs}
                                onChange={mnPayDvsOnChange}
                            />
                            */}
                            <select value={mn_pay_dvs} onChange={mnPayDvsOnChange}>
                                <option key='0' value='0' disabled selected>
                                    결제
                                </option>
                                {pay_dvs.map((item) => (
                                    <option key={item.detail_code} value={item.detail_code}>
                                        {item.detail_name}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>금액</th>
                        <td>
                            <input
                                type='text'
                                value={mn_amount}
                                onChange={mnAmountOnChange}
                            />
                        </td>
                    </tr>
                </table>
                <div className='modal-button'>
                    { action === "INSERT" && <button onClick={(e) => {save(action)}}> 등록</button> }
                    { action !== "INSERT" && <button onClick={(e) => {save(action)}}> 수정</button> }
                    { action !== "INSERT" && <button onClick={(e) => {save("DELETE")}}> 삭제</button> }
                    <button onClick={closeModal}> 닫기</button>
                </div>
            </Modal>
        </>
    )
}

export default UserInfo
