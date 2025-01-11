import { createSlice } from "@reduxjs/toolkit";


interface OwnerState {
    ownerInfo: {
        _id: string;
        name: string;
        email: string;
    } | null
}

const initialState: OwnerState = {
    ownerInfo: null
}

const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        setOwnerInfo: (state, action) => {
            state.ownerInfo = action.payload
        },
        logoutOwnerInfo: (state) => {
            state.ownerInfo = null
        }
    }
})

export const { setOwnerInfo, logoutOwnerInfo } = ownerSlice.actions;
export default ownerSlice.reducer