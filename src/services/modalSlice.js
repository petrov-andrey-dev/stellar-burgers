import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isActive: false,
        details: null
    },
    reducers: {
        openModal(state, action) {
            state.isActive = true;
            state.details = action.payload;
        },
        closeModal(state) {
            state.isActive = false;
            state.details = null
        }
    }
});

export const { openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer;