import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true
        },
        signinSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
        },
        signinFailure: (state) => {
            state.loading = false
            state.error = true
        },
        signout: (state) => {
            state.loading = false
            state.currentUser = null
            state.error = false
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.findIndex((channelId) => channelId === action.payload), 1)
            } else {
                state.currentUser.subscribedUsers.push(action.payload)
            }
        }
    }
})

export const {signinStart, signinSuccess, signinFailure, signout, subscription} = userSlice.actions

export default userSlice.reducer