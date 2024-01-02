import { createSlice, createAction } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../utils/const';
import { TOrder } from '../types/types';

export const connect = createAction<string>('PROFILE_ORDERS_CONNECT')
export const disconnect = createAction('PROFILE_ORDERS_DISCONNECT');

type TFeedSlice = {
    status: WebsocketStatus;
    orders: TOrder[];
    total: number | null;
    totalToday: number | null;
    error: string | null;
}

const initialState: TFeedSlice = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    total: null,
    totalToday: null,
    error: null
}

const feedSlice = createSlice({
    name: 'profile/orders',
    initialState,
    reducers: {
        wsConnecting(state) {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen(state) {
            state.status = WebsocketStatus.ONLINE;
        },
        wsClose(state) {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError(state, action) {
            state.error = action.payload;
        },
        wsMessage(state, action) {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    }
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage} = feedSlice.actions;

export default feedSlice.reducer;