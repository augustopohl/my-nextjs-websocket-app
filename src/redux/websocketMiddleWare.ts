import { Middleware } from 'redux';
import { throttle } from 'lodash';
import { setNumber } from './store';
import { WebSocketAction, WebSocketActionTypes } from './types';

type WebSocketEvent = {
  data: string;
};

export const WebSocketMiddleware: Middleware<{}> = (
  store
) => (next) => (action: WebSocketAction) => {
  if (action.type === WebSocketActionTypes.WEBSOCKET_CONNECT) {

    const socket = new WebSocket('ws://localhost:8080'); 

    socket.onmessage = throttle((event: WebSocketEvent): void => {
        const socketData = JSON.parse(event.data);

        store.dispatch(setNumber(socketData));
    }, 4000, { leading: true })

    return () => socket.close()
  }

  return next(action);
};
