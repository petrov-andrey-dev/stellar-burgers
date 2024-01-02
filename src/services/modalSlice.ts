import { createSlice } from "@reduxjs/toolkit";

type TModalSlice = {
    isActive: boolean;
    details: any | null;
}

const initialState: TModalSlice = {
    isActive: false,
    details: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action) {
            state.isActive = true;
            state.details = action?.payload;
        },
        closeModal(state) {
            state.isActive = false;
            state.details = null
        }
    }
});

export const { openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer;