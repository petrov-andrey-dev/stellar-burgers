import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isActive: false,
        type: '',
        details: null
    },
    reducers: {
        openModal(state, action) {
            state.isActive = true;
            state.type = action.payload.type;
            state.details = action.payload.details;
        },
        closeModal(state) {
            state.isActive = false;
            state.type = '';
            state.details = null
        }
    }
})

export const { openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer;