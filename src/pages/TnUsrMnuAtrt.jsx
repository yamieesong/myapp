import { useQuery } from '@tanstack/react-query'
import { menuListAxios, tnUsrMnuAtrtAxios } from './menuListAxios'
import { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination'

export const TnUsrMnuAtrt = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [tnUsrMnuAtrtList, setTnUsrMnuAtrtList] = useState()

  const { data } = useQuery({
    queryKey: ['tnUsrMnuAtrt']
    , queryFn: () => tnUsrMnuAtrtAxios(currentPage, pageSize),
  })

  useEffect(() => {
      if (!(undefined === data)) {
        setTnUsrMnuAtrtList(data.tnUsrMnuAtrt)
        // console.log('tnUsrMnuAtrtList!!!', data.tnUsrMnuAtrt)
      }
    }, [data],
  )

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage)
    tnUsrMnuAtrtAxios(currentPage, pageSize).then(res =>
      setTnUsrMnuAtrtList(res.tnUsrMnuAtrt),
    )
  }

  return (
    <>
      <div id="tnUsrMnuAtrt" style={{ height: '220px' }}>
        {data &&
          <p>전체 : {data.tnUsrMnuAtrtCnt}{' '}|{' '}현재페이지 : {currentPage}</p>
        }
        <table>
          <tr>
            <th>user_type</th>
            <th>MNU_ID</th>
          </tr>
          {tnUsrMnuAtrtList && tnUsrMnuAtrtList.map((tnUsrMnuAtrtList) =>
            <tr key={tnUsrMnuAtrtList.mnu_ID}>
              <td>{tnUsrMnuAtrtList.user_type}</td>
              <td>{tnUsrMnuAtrtList.mnu_ID}</td>
            </tr>,
          )}
        </table>
      </div>
      {data &&
        <div id="tnUsrMnuAtrtPagination">
          <Pagination
            activePage={currentPage} // 현재 페이지
            itemsCountPerPage={pageSize} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={data.tnUsrMnuAtrtCnt} // 총 아이템 갯수
            pageRangeDisplayed={pageSize} // paginator의 페이지 범위
            prevPageText={'‹'} // "이전"을 나타낼 텍스트
            nextPageText={'›'} // "다음"을 나타낼 텍스트
            onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
          />
        </div>
      }
    </>
  )
}