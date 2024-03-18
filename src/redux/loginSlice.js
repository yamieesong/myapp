import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const url = '/loginProc.do'

export const loginProc = createAsyncThunk(
    'loginProc',
    async (arg, thunkAPI) => {
        console.log('arg!!!', arg)
        try {
            const res =
                await axios.post(url, new URLSearchParams({lgn_Id: arg.id, pwd: arg.pw}))
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue('loginProc.do error' + err)
        }
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userInfo: [],
        isLoading: true,
        error: ''
    },
    reducers: {
        initUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginProc.pending, (state, action) => {
            state.isLoading = true
        }).addCase(loginProc.fulfilled, (state, action) => {
            state.userInfo = action.payload
            state.isLoading = false
        }).addCase(loginProc.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
        })
    }
})

export const {initUserInfo} = loginSlice.actions
export default loginSlice.reducer