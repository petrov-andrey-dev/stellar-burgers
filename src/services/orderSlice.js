import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postOrderRequest } from "../utils/api";

export const loadOrderData = createAsyncThunk(
    'order/loadOrderData',
    async (data) => {
        const response = postOrderRequest(data)
        return response
    })

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderData: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrderData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadOrderData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loadOrderData.fulfilled, (state,action) =>{
                state.loading = false;
                state.orderData = action.payload;
            })
    }
})

export default orderSlice.reducer;