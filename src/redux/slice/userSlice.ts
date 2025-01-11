import { createSlice } from "@reduxjs/toolkit"

interface UserState {
    userInfo: {
        _id: string;
        name: string;
        email: string;
    } | null
}

const initialState: UserState = {
    userInfo: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action)=>{
            state.userInfo = action.payload
        },
        removeUserInfo: (state) =>{
            state.userInfo = null
        }
    }
})

export const { setUserInfo, removeUserInfo } = userSlice.actions;
export default userSlice.reducer;
