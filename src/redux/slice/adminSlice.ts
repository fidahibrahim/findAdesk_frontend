import { createSlice } from "@reduxjs/toolkit";

export interface AdminInfo {
    name: string
    email: string
}

interface AdminState {
    adminInfo: AdminInfo | null
}

const initialState: AdminState = {
    adminInfo: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        setAdminInfo: (state, action) =>{
            state.adminInfo = action.payload
        },
        AdminLogout: (state, ) =>{
            state.adminInfo = null
        }
    }
})

export const { setAdminInfo, AdminLogout } = adminSlice.actions;
export default adminSlice.reducer;