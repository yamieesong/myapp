import React, { useState, useEffect, useRef } from 'react'
import Core from '@fullcalendar/core'
import ko from '@fullcalendar/core/locales/ko';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";

import Modal from 'react-modal'
import '../css/UserInfo.css'
import {current} from "@reduxjs/toolkit";

const UserInfo = () => {
    const {userInfo, isLoading, error} = useSelector((store) => store.login)

    // 달력&리스트 변환
    const [menuList, setMenuList] = useState(["calendar","list"])
    // const [curMenu, setCurMenu] = useState("calendar")
    let refCurMenu = useRef("calendar")

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

    // 데이트픽커
    // const [searchFromDate, setSearchFromDate] = useState("")
    // const [searchToDate, setSearchToDate] = useState("")
    const refFromDate = useRef("")
    const refToDate = useRef("")

    // DB액션 플레스
    const [action, setAction] = useState("")

    // 공통코드 데이터
    const [pay_dvs, setPay_dvs] = useState([])
    const [use_dvs, setUse_dvs] = useState([])
    const [detail_code, setDetail_code] = useState([])

    // 가게뷰 리스트
    const [listDataList, dispListDataList] = useState([])
    const [listTotalCnt, setListTotalCnt] = useState(0)




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

    const curMenuOnChange = (e) => {
        // setCurMenu(e.target.value)
        refCurMenu.current = e.target.value
        if(refCurMenu.current === "calendar"){
            refFromDate.current = ""
            refToDate.current = ""
        }else if(refCurMenu.current === "list"){
            initDatePicker()
        }
        getGagevueList()
    }
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

        if (e.target.value.match(/[^0-9,]/)) {
            setMn_amount("")
        }else{
            setMn_amount(threeComma(e.target.value))
        }
    }
    const searchFromDateOnChange = (e) => {
        // setSearchFromDate(e.target.value)
        refFromDate.current = e.target.value
        if(dateChk() === "normal"){
            getGagevueList()
        }
    }
    const searchToDateOnChange = (e) => {
        // setSearchToDate(e.target.value)
        refToDate.current = e.target.value
        if(dateChk() === "normal"){
            getGagevueList()
        }
    }

    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        initInputData()
        setModalIsOpen(false)
    }
    const dateChk = () => {
        let fromDate = new Date(refFromDate.current);
        let toDate = new Date(refToDate.current);
        let diff = Math.abs(fromDate.getTime() - toDate.getTime());
        diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if(fromDate > toDate){
            alert("시작일보다 종료일이 빠릅니다.")
            return "early"
        }else if(diff > 90){
            alert("3개월 기간의 내역만 가능합니다.")
            return "diff"
        }else{
            return "normal"
        }
    }
    const initInputData = () => {
        setMn_no("")
        setMn_use_memo("")
        setMn_use_dvs("0")
        setMn_use_dvs_det("0")
        setMn_pay_dvs("0")
        setMn_amount("")
    }
    const initDatePicker = () => {
        let date = new Date()
        let curYear = date.getFullYear().toString()
        let curMonth = (date.getMonth()+1).toString().length === 1 ? "0"+(date.getMonth()+1) : (date.getMonth()+1).toString()
        let curDay = (date.getDate()).toString().length === 1 ? "0"+(date.getDate()) : (date.getDate()).toString()
        refFromDate.current = curYear+"-"+curMonth+"-01"
        refToDate.current = curYear+"-"+curMonth+"-"+curDay
    }
    const threeComma = (val) => {
        let cleanVal = val.replaceAll(",", "")
        return cleanVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    const dateFormat = () => {
        // console.log("dateFormat", typeof mn_dtm, mn_dtm)
        let date = mn_dtm.split("-")[0]+"년 "+mn_dtm.split("-")[1]+"월 "+mn_dtm.split("-")[2]+"일"
        return date
    }
    const setGagevueData = async (calendar) => {
        openModal();
        if (refCurMenu.current === "calendar") {
            // console.log("calendar", calendar.event)
            setCalendar(calendar)
            setMn_dtm(calendar.startStr)

            if (typeof calendar.event === "undefined") {
                setAction("INSERT")
            } else {
                setAction("UPDATE")
                // alert(calendar.event._def.publicId)
                selectedData(calendar.event._def.publicId)
            }
        } else if (refCurMenu.current === "list") {
            let mn_no = calendar;
            // alert(mn_no)
            setAction("UPDATE")
            selectedData(mn_no)
        }
    }
    const renderData = (calendar) => {
        let calendarApi = calendar.view.calendar
        calendarApi.removeAllEvents()

        calendarDataList.forEach(function (data) {
            calendarApi.addEvent(data)
        })
    }
    const dispCalendarData = (info) => {
        // console.log("disGagevueList", info.gagevueList)
        const tmpList = info.gagevueList.map((list) => ({
            id: list.mn_no,
            title: list.mn_use_memo,
            start: list.mn_dtm,
            backgroundColor: list.mn_use_dvs === "1" ? "#DB765C" : "#1DBBDB"
        }));
        setCalendarDataList(tmpList)
        //console.log("tmpList", tmpList)
        // console.log("calendarDataList", calendarDataList)

        if(Object.keys(calendar).length > 0){
            renderData(calendar)
        }
    }
    const dispListData = (info) => {
        //console.log("info.gagevueList", info.gagevueList)
        dispListDataList(info.gagevueList)
        setListTotalCnt(info.gagevueListCnt)
        /*
        let tmpList = info.gagevueList;
        console.log("tmpList", tmpList)
        tmpList.forEach(function(data, idx){
            if(idx === 0 || data.mn_dtm !== tmpList[idx - 1].mn_dtm){
               console.log(idx, data.mn_dtm)
            }
        })
        */
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
        
        if(refCurMenu.current === "list"){
            params.append("from_date", refFromDate.current);
            params.append("to_date", refToDate.current);
        }

        await axios
            .post('/scm/selectgagevueList.do', params)
            .then((res) => {
                // console.log('/scm/selectgagevueList.do res start', res.data)
                dispCalendarData(res.data)
                dispListData(res.data)
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    const selectedData = async (mn_no) => {
        setMn_no(mn_no)
        let params = new URLSearchParams();
        params.append("mn_no", mn_no);

        await axios
            .post("/scm/selectgagevueOne.do", params)
            .then(function (res){
                // console.log("/scm/selectgagevueOne.do", res)
                setMn_dtm(res.data.gagevueOne.mn_dtm)
                setMn_use_memo(res.data.gagevueOne.mn_use_memo)
                setMn_use_dvs(res.data.gagevueOne.mn_use_dvs)
                setMn_use_dvs_det(res.data.gagevueOne.mn_use_dvs_det)
                setMn_pay_dvs(res.data.gagevueOne.mn_pay_dvs)
                setMn_amount(res.data.gagevueOne.mn_amount)
            })
            .catch(function (error) {
                alert("에러! API 요청에 오류가 있습니다. " + error);
            });
    }
    const save = async (type) => {
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
        params.append("mn_amount", mn_amount.replaceAll(",", ""));
        params.append("loginID", userInfo.loginId);
        params.append("action", type);
        params.append("mn_rgst_id", userInfo.loginId);

        await axios
            .post("/scm/savegagevue.do", params)
            .then(function (res) {
                alert(res.data.resultMsg);
                getGagevueList()
                closeModal();
            })
            .catch(function (error) {
                alert("에러! API 요청에 오류가 있습니다. " + error);
            });
    }
    const del = async () => {
        let params = new URLSearchParams();
        params.append("mn_no", mn_no);

        await axios
            .post("/scm/deletegagevue.do", params)
            .then(function (res) {
                // console.log(res);
                if (res.data.result == "SUCCESS") {
                    alert(res.data.resultMsg);
                    getGagevueList()
                    closeModal();
                } else {
                    alert("실패 했습니다.");
                }
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

    return (
        <>
            {menuList.map((menu, idx, index) => (
                <>
                    {menu}&nbsp;:&nbsp;
                    <input
                        type='radio'
                        style={{marginRight:"20px"}}
                        key={menu}
                        value={menu}
                        checked={refCurMenu.current === menu}
                        onChange={curMenuOnChange}
                    />
                </>
            ))}
            { refCurMenu.current === "calendar" &&
                <div>
                    <div>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            locale={ko}
                            dayHeaderFormat={{weekday:"long"}}
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
                            events={calendarDataList}
                            select={setGagevueData}
                            eventContent={renderEventContent}
                            eventClick={setGagevueData}
                        />
                    </div>
                </div>
            }
            {refCurMenu.current === "list" &&
                <>
                <div style={{marginBottom: "20px", marginTop: "20px"}}>
                    <input
                        type='date'
                        value={refFromDate.current}
                        onChange={searchFromDateOnChange}
                    />
                    ~
                    <input
                        type='date'
                        value={refToDate.current}
                        onChange={searchToDateOnChange}
                    />
                </div>
                <div
                    className="gagevueList"
                    style={{overflowY: "auto", width: "100 %", height: "650px", marginTop: "20px"}}
                >
                    <table
                        className="col"
                        border="1"
                        width="75%"
                        cellPadding="5"
                        align="center"
                        style={{borderCollapse: "collapse", border: "1px rgb(22, 22, 22)"}}
                    >
                        {listTotalCnt === 0 &&
                            <>
                                <thead>
                                <tr>
                                    <th scope="col">가계부리스트</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colSpan="4">데이터가 없습니다</td>
                                </tr>
                                </tbody>
                            </>
                        }
                        {listTotalCnt > 0 &&
                            <>
                                {listDataList.map((item, idx) => {
                                    // return (idx === (listDataList.length-1) || item.mn_dtm !== listDataList[idx+1].mn_dtm) &&
                                    return (

                                        <tbody key={item.mn_no}>
                                        {(idx === 0 || item.mn_dtm !== listDataList[idx - 1].mn_dtm) &&
                                            <tr align="left" style={{border: "1px", borderColor: "rgb(22, 22, 22)"}}>
                                                <th scope="col" colSpan="4"
                                                    style={{backgroundColor: "skyblue", padding: "10px"}}>
                                                     <span style={{
                                                         fontSize: "large",
                                                         color: "black",
                                                         marginRight: "10px"
                                                     }}>
                                                     {item.mn_dtm}
                                                     </span>
                                                    &nbsp;
                                                    <span style={{marginRight: "10px", color: "blue"}}>
                                                        수입 : {threeComma(item.sum_for_use_dvs_import_sum)}
                                                     </span>
                                                    &nbsp;
                                                    <span style={{marginRight: "10px", color: "red"}}>
                                                        지출 : {threeComma(item.sum_for_use_dvs_expense_sum)}
                                                     </span>
                                                </th>
                                            </tr>
                                        }
                                        {/*/!**/}
                                        <tr align="left" onClick={(e) => {
                                            setGagevueData(item.mn_no)
                                        }}>
                                            <td rowspan="3" style={{fontSize: "18px"}}>
                                                <span>{item.mn_use_memo}</span>
                                            </td>
                                            {item.mn_use_dvs === "1" &&
                                                <td align="right">
                                                    <span style={{color: "red"}}>
                                                        {item.mn_pay_dvs === "1" &&
                                                            <span>
                                                              카드 :&nbsp;
                                                          </span>
                                                        }
                                                        {item.mn_pay_dvs === "2" &&
                                                            <span>
                                                                현금 :&nbsp;
                                                            </span>
                                                        }
                                                        {threeComma(item.mn_amount)}
                                                    </span>
                                                </td>
                                            }
                                            {item.mn_use_dvs === "2" &&
                                                <td align="right">
                                                    <span style={{color: "blue"}}>
                                                        {item.mn_pay_dvs === "1" &&
                                                            <span>
                                                              카드 :&nbsp;
                                                          </span>
                                                        }
                                                        {item.mn_pay_dvs === "2" &&
                                                            <span>
                                                                현금 :&nbsp;
                                                            </span>
                                                        }
                                                        {threeComma(item.mn_amount)}
                                                    </span>
                                                </td>
                                            }
                                        </tr>
                                        <tr align="right">
                                            <td align="left">{item.mn_use_dvs_det_name}</td>
                                        </tr>
                                        {/**!/*/}
                                        </tbody>
                                    );
                                })}
                            </>
                        }
                    </table>
                </div>
                </>
            }
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
                                value={threeComma(mn_amount)}
                                onChange={mnAmountOnChange}
                            />
                        </td>
                    </tr>
                </table>
                <div className='modal-button'>
                    { action === "INSERT" && <button onClick={(e) => {save(action)}}> 등록</button> }
                    { action !== "INSERT" && <button onClick={(e) => {save(action)}}> 수정</button> }
                    { action !== "INSERT" && <button onClick={del}> 삭제</button> }
                    <button onClick={closeModal}> 닫기</button>
                </div>
            </Modal>
        </>
    )
}

export default UserInfo
