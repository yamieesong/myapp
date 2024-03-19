import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import sessionStorage from 'redux-persist/es/storage/session'
import loginSlice from './loginSlice'

const persistConfig = {
    key: 'login',
    storage: sessionStorage,
}

const rootReducer = combineReducers({
    login: loginSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)
export default store
