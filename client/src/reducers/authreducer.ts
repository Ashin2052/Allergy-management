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
        login:(state,action) => {
            initialState.isLoggedIn = false;
            console.log(state,'state',action)

        },
        logout:() => {
            initialState.isLoggedIn = false;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer