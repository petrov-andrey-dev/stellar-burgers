import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postOrderRequest, getSelectedOrder } from "../utils/api";

export const loadOrderData = createAsyncThunk(
    'order/loadOrderData',
    async (data) => {
        const response = postOrderRequest(data)
        return response;
    }
);

export const loadSelectedOrder = createAsyncThunk(
    'order/loadSelectedOrder',
    async (data) => {
        const response = getSelectedOrder(data)
        return response;
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderData: null,
        selectedOrder: null,
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
                state.orderData = null
            })
            .addCase(loadOrderData.fulfilled, (state, action) => {
                state.loading = false;
                state.orderData = action.payload;
            })
            .addCase(loadSelectedOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadSelectedOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.orderData = null
            })
            .addCase(loadSelectedOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload;
            })
    }
});

export default orderSlice.reducer;