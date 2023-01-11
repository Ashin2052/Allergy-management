import {createSlice, Draft} from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    loading: false,
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem('accessToken',action.payload.accessToken)
            localStorage.setItem('refreshToken',action.payload.refreshToken)
            localStorage.setItem('userInfo',action.payload.userInfo)
        },
        logout: () => {
            initialState.isLoggedIn = false;
            localStorage.clear()
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer