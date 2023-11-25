import { createSlice, createAction } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../utils/const';

export const connect = createAction('FEED_CONNECT')
export const disconnect = createAction('FEED_DISCONNECT');

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        status: WebsocketStatus.OFFLINE,
        orders: [],
        total: null,
        totalToday: null,
        error: null
    },
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