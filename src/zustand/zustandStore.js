import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from 'axios'

const url = '/loginProc.do'

const zustandStore = create(
  persist(
    (set) => ({
      zustandUserInfo: [],
      zustandLogin: async (login) => set({
        zustandUserInfo: await axios.post(url, new URLSearchParams({ lgn_Id: login.id, pwd: login.pw })),
      }),
      initZustandUserInfo: () => set({
        zustandUserInfo: [],
      }),
    }),
    {
      name: 'zustandUserInfo',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
export default zustandStore