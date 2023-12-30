import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";

type TwsActions = {
  wsConnect: ActionCreatorWithPayload<any, string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<string>;
  wsSendMessage?: ActionCreatorWithPayload<string>;
}

export const socketMiddleware = (wsActions: TwsActions): Middleware => {
    return (store) => {
      let socket: WebSocket | null = null;
  
      return (next) => (action) => {
        const { dispatch } = store;
        const { type } = action;
        const {
          wsConnect,
          wsSendMessage,
          onOpen,
          onClose,
          onError,
          onMessage,
          wsConnecting,
          wsDisconnect,
        } = wsActions;

        if (type === wsConnect.type) {
          socket = new WebSocket(action.payload);
          dispatch(wsConnecting());
        }
        if (socket) {
          socket.onopen = () => {
            dispatch(onOpen());
          };
          socket.onerror = (event) => {
            dispatch(onError('Error'));
          };
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch(onMessage(parsedData));
          };
          socket.onclose = (event) => {
            dispatch(onClose());
          };
          if (wsSendMessage && type === wsSendMessage.type) {
            socket.send(JSON.stringify(action.payload));
          }
          if (wsDisconnect.type === type) {
            socket.close();
            socket = null;
          }
        }
        next(action);
      };
    };
  };