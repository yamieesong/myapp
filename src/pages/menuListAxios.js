import axios from 'axios'

export const menuListAxios = async (currentPage, pageSize) => {
  console.log('menuListAxios!!!')
  // alert(currentPage + ',' + pageSize)
  const res = await axios.get('/menuList',
    {
      params: {
        currentPage: currentPage,
        pageSize: pageSize,
      },
    },
  )
  return res.data
}

export const tnUsrMnuAtrtAxios = async (currentPage, pageSize) => {
  console.log('tnUsrMnuAtrt!!!')
  // alert(currentPage + ',' + pageSize)
  const res = await axios.get('/tnUsrMnuAtrt',
    {
      params: {
        currentPage: currentPage,
        pageSize: pageSize,
      },
    },
  )
  // console.log('tnUsrMnuAtrt res!!!',res.data)
  return res.data
}