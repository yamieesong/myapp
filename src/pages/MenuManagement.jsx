import './MenuManagement.css'
import { useQueryClient } from '@tanstack/react-query'
import { MenuList } from './MenuList'
import { TnUsrMnuAtrt } from './TnUsrMnuAtrt'

const MenuManagement = () => {
  const queryClient = useQueryClient()

  return (
    <>
      <div id="MenuManagement">
        <p style={{ fontSize: '2em', marginBottom: '50px' }}>MenuManagement</p>
        <MenuList />
        <hr />
        <TnUsrMnuAtrt />
      </div>
    </>
  )
}

export default MenuManagement