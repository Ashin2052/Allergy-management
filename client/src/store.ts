// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './shared/reducers/authreducer'
import allergyreducer from "./shared/reducers/allergyreducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        allergy: allergyreducer,

    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;