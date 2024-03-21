import { useQuery } from '@tanstack/react-query'
import { menuListAxios, tnUsrMnuAtrtAxios } from './menuListAxios'
import Pagination from 'react-js-pagination'
import { useEffect, useState } from 'react'

export const MenuList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [currentPage2, setCurrentPage2] = useState(1)
  const [pageSize2, setPageSize2] = useState(5)
  const [menuList, setMenuList] = useState()
  const [tnUsrMnuAtrtList, setTnUsrMnuAtrtList] = useState()

  // const tnUsrMnuAtrt = useQuery({
  //   queryKey: ['tnUsrMnuAtrt']
  //   , queryFn: () => {
  //     tnUsrMnuAtrtAxios(currentPage2, pageSize2)
  //   },
  // })

  const { data } = useQuery({
    queryKey: ['menuList']
    , queryFn: () => menuListAxios(currentPage, pageSize),
  })

  // useEffect(() => {
  //     if (!(undefined === tnUsrMnuAtrt)) {
  //       console.log('tnUsrMnuAtrtList!!!')
  //       console.log(tnUsrMnuAtrt)
  //       // setTnUsrMnuAtrtList(tnUsrMnuAtrt.data.tnUsrMnuAtrt)
  //     }
  //   }, [tnUsrMnuAtrt],
  // )

  useEffect(() => {
      if (!(undefined === data)) {
        setMenuList(data.menuList)
      }
    }, [data],
  )

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage)
    menuListAxios(currentPage, pageSize).then(res =>
        setMenuList(res.menuList),
      // console.log('r!!!', setMenuList(res.menuList)),
    )
  }

  return (
    <>
      <div id="menuList" style={{ height: '210px' }}>
        {data &&
          <p>전체 : {data.menuListCnt}{' '}|{' '}현재페이지 : {currentPage}</p>
        }
        <table style={{ width: '950px' }}>
          {/*<colgroup>*/}
          {/*  <col width="60px" />*/}
          {/*  <col width="130px" />*/}
          {/*  <col width="80px" />*/}
          {/*  <col width="185px" />*/}
          {/*  <col width="110px" />*/}
          {/*  <col width="75px" />*/}
          {/*  <col width="40px" />*/}
          {/*  <col width="30px" />*/}
          {/*  <col width="105px" />*/}
          {/*  <col width="70px" />*/}
          {/*  <col width="65px" />*/}
          {/*</colgroup>*/}
          <tr>
            <th>MNU_ID</th>
            <th>HIR_MNU_ID</th>
            <th>MNU_NM</th>
            <th>MNU_URL</th>
            <th>MNU_DVS_COD</th>
            <th>GRP_NUM</th>
            <th>ODR</th>
            <th>LVL</th>
            <th>MNU_ICO_COD</th>
            <th>USE_POA</th>
            <th>DLT_POA</th>
          </tr>
          {menuList && menuList.map((menuList) =>
            <tr key={menuList.mnu_ID}>
              <td>{menuList.mnu_ID}</td>
              <td>{menuList.hir_MNU_ID}</td>
              <td>{menuList.mnu_NM}</td>
              <td>{menuList.mnu_URL}</td>
              <td>{menuList.mnu_DVS_COD}</td>
              <td>{menuList.grp_NUM}</td>
              <td>{menuList.odr}</td>
              <td>{menuList.lvl}</td>
              <td>{menuList.mnu_ICO_COD}</td>
              <td>{menuList.use_POA}</td>
              <td>{menuList.dlt_POA}</td>
            </tr>,
          )}
        </table>
      </div>
      {data &&
        <div id="menuListPagination">
          <Pagination
            activePage={currentPage} // 현재 페이지
            itemsCountPerPage={pageSize} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={data.menuListCnt} // 총 아이템 갯수
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