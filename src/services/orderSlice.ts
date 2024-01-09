import { createSlice,PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { postOrderRequest, getSelectedOrder } from "../utils/api";
import { TOrder } from "../types/types";

export type TOrderData = {
    name: string;
    order: TOrder;
    success: boolean;
}

type TOrderSlice = {
    orderData: TOrderData | null;
    selectedOrder: TOrder | null;
    loading: boolean;
    error: string | null;
}

const initialState: TOrderSlice = {
    orderData: null,
    selectedOrder: null,
    loading: false,
    error: null
}

export const loadOrderData = createAsyncThunk(
    'order/loadOrderData',
    async (data: string[]) => {
        const response = await postOrderRequest(data)
        return response;
    }
);

export const loadSelectedOrder = createAsyncThunk(
    'order/loadSelectedOrder',
    async (data: string) => {
        const response = await getSelectedOrder(data)
        return response;
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadOrderData.fulfilled, (state, action) => {
                state.loading = false;
                state.orderData = action.payload;
            })
            .addCase(loadSelectedOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload.orders[0];
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action: PayloadAction<string>) => {
                    state.loading = true;
                    state.error = action.payload;
                })
    }
});

export default orderSlice.reducer;