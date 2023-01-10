// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../src/reducers/authreducer'

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})
export default store