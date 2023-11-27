import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice";
import modalSlice from "./modalSlice";
import constructorSlice from "./constructorSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import { socketMiddleware } from "./middleware/socket-middleware";

import {
    connect as feedWsConnect,
    disconnect as feedWsDisconnect,
    wsConnecting as feedWsConnecting,
    wsOpen as feedWsOpen,
    wsClose as feedWsClose,
    wsError as feedWsError,
    wsMessage as feedWsMessage
} from "./feedSlice";

import profileOrdersSlice, {
    connect as ordersWsConnect,
    disconnect as ordersWsDisconnect,
    wsConnecting as ordersWsConnecting,
    wsOpen as ordersWsOpen,
    wsClose as ordersWsClose,
    wsError as ordersWsError,
    wsMessage as ordersWsMessage
} from "./profileOrdersSlice"

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
export default configureStore({
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