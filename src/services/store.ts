import { configureStore } from "@reduxjs/toolkit";
import constructorSlice from "./constructorSlice";
import feedSlice from "./feedSlice";
import ingredientsSlice from "./ingredientsSlice";
import { socketMiddleware } from "./middleware/socket-middleware";
import modalSlice from "./modalSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";

import {
    wsClose as feedWsClose,
    connect as feedWsConnect,
    wsConnecting as feedWsConnecting,
    disconnect as feedWsDisconnect,
    wsError as feedWsError,
    wsMessage as feedWsMessage,
    wsOpen as feedWsOpen
} from "./feedSlice";

import profileOrdersSlice, {
    wsClose as ordersWsClose,
    connect as ordersWsConnect,
    wsConnecting as ordersWsConnecting,
    disconnect as ordersWsDisconnect,
    wsError as ordersWsError,
    wsMessage as ordersWsMessage,
    wsOpen as ordersWsOpen
} from "./profileOrdersSlice";

const feedMiddleware = socketMiddleware({
    wsConnect: feedWsConnect,
    wsDisconnect: feedWsDisconnect,
    wsConnecting: feedWsConnecting,
    onOpen: feedWsOpen,
    onClose: feedWsClose,
    onError: feedWsError,
    onMessage: feedWsMessage,
  })

const ordersMiddleware = socketMiddleware({
    wsConnect: ordersWsConnect,
    wsDisconnect: ordersWsDisconnect,
    wsConnecting: ordersWsConnecting,
    onOpen: ordersWsOpen,
    onClose: ordersWsClose,
    onError: ordersWsError,
    onMessage: ordersWsMessage,
})
const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        constructorData: constructorSlice,
        modal: modalSlice,
        order: orderSlice,
        user: userSlice,
        feed: feedSlice,
        profileOrders: profileOrdersSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(feedMiddleware, ordersMiddleware)
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;