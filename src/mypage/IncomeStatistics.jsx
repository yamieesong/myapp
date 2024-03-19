import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut, Pie } from 'react-chartjs-2'
import axios from 'axios'
import './mypage.css'
import { useDispatch, useSelector } from 'react-redux'

ChartJS.register(ArcElement, Tooltip, Legend)
/** 가계뷰 > 마이페이지 > 수입통계 IncomeStatistics  */
const IncomeStatistics = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()

  const defaultFromDate = `${currentYear}-${
    currentMonth < 10 ? '0' + currentMonth : currentMonth
  }-01`
  const defaultToDate = `${currentYear}-${
    currentMonth < 10 ? '0' + currentMonth : currentMonth
  }-${daysInMonth}`

  /** 시작날짜 */
  const [fromDate, setFromDate] = useState(defaultFromDate)
  /** 종료날짜 */
  const [toDate, setToDate] = useState(defaultToDate)
  /** 차트 Chart */
  const [chartData, setChartData] = useState(null)
  /** 지출 리스트 list */
  const [listexpense, setListExpense] = useState([])
  /** 로그인 session */
  const dispatch = useDispatch()
  const { userInfo, isLoading, error } = useSelector((store) => store.login)

  useEffect(() => {
    search() // 초기화면 * onload
  }, [])

  useLayoutEffect(() => {
    console.log('userInfo start')
    console.log(userInfo)
  }, [userInfo])

  /** 날짜 조회 검색 btn click */
  const search = async () => {
    let params = new URLSearchParams()
    params.append('from_date', fromDate) /** 시작날짜 */
    params.append('to_date', toDate) /** 종료날짜 */
    params.append('mn_use_dvs', '2') /** 1:지출 2:수입 */
    params.append('mn_rgst_id', userInfo.loginId) /** 로그인ID */

    await axios
      .post('/mypage/selectgagevueChart.do', params)
      .then((res) => {
        console.log('pie char succ 성공 ')
        setListExpense(res.data.gagevueListChart)

        /** 지출 라벨 labels */
        const labels = res.data.gagevueListChart.map((item) => item.detail_name)
        /** 지출 금액 amount */
        const data = res.data.gagevueListChart.map((item) => item.mn_amount)

        /** 차트 배경 색상 랜덤으로 돌리기 chart background */
        const getRandomColor = () => {
          const r = Math.floor(Math.random() * 256)
          const g = Math.floor(Math.random() * 256)
          const b = Math.floor(Math.random() * 256)
          return `rgb(${r}, ${g}, ${b})`
        }
        const backgroundColors = Array.from({ length: labels.length }, () =>
          getRandomColor(),
        )

        // 도넛 차트 start
        setChartData({
          labels: labels,
          datasets: [
            {
              label: labels,
              data: data,
              backgroundColor: backgroundColors,
              hoverOffset: 2,
            },
          ],
        })
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  return (
    <div id='content'>
      <p class='Location'>
        <a href='/dashboard/home' class='btn_set home'></a>
        <span class='btn_nav bold'>가계부</span>
        <span class='btn_nav bold'>마이페이지</span>
        <span class='btn_nav bold'>수입통계</span>
        <a
          href='/dashboard/mypage/IncomeStatistics'
          class='btn_set refresh'
        ></a>
      </p>
      <div id='searchArea' class='d-flex justify-content-around'>
        <input
          type='date'
          id='from_date'
          name='from_date'
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        ~
        <input
          type='date'
          id='to_date'
          name='to_date'
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button
          id='searchBtn'
          type='button'
          className='btn btn-primary'
          onClick={search}
        >
          검색
        </button>
      </div>
      <div id='piechartArea'>
        {' '}
        {chartData && (
          <Doughnut
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: 'right', // 라벨 위치 설정 (top, bottom, left, right)
                  labels: {
                    generateLabels: function (chart) {
                      const data = chart.data
                      if (data.labels.length && data.datasets.length) {
                        return data.labels.map(function (label, i) {
                          const meta = chart.getDatasetMeta(0)
                          const ds = data.datasets[0]
                          const arc = meta.data[i]
                          const value = ds.data[i]
                          const formattedValue = value.toLocaleString() + '원' // 값 포맷 설정
                          return {
                            text: `${label}: ${formattedValue}`,
                            fillStyle: ds.backgroundColor[i],
                            hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                            index: i,
                          }
                        })
                      }
                      return []
                    },
                  },
                },
              },
            }}
          />
        )}
      </div>
      {listexpense.length > 0 && (
        <table className='col'>
          <thead>
            <tr>
              <th scope='col'>수입항목</th>
              <th scope='col'>총금액</th>
            </tr>
          </thead>
          <tbody>
            {listexpense.map((list, index) => (
              <tr key={index}>
                <td>{list.detail_name}</td>
                <td>{list.mn_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {listexpense.length === 0 && <p>결과가 없습니다.</p>}
    </div>
  )
}

export default IncomeStatistics
