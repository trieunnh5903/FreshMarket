import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedTab: ''
}

const tabSlice = createSlice({
    initialState,
    name: 'tab',
    reducers: {
        setSelectedTab: (state, action) => {
            state.selectedTab = action.payload.selectedTab
        }
    }
})


export const { setSelectedTab } = tabSlice.actions;
export default tabSlice.reducer