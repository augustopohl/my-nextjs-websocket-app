import { Middleware } from 'redux';
import { throttle } from 'lodash';
import { setNumber } from './store';

export const WebSocketMiddleware: Middleware<{}> = (
  store
) => (next) => (action) => {
  if (action.type === 'WEBSOCKET_CONNECT') {

    const socket = new WebSocket('ws://localhost:8080'); 

    socket.onmessage = throttle((event) => {
        const socketData = JSON.parse(event.data);

        store.dispatch(setNumber(socketData));
    }, 4000, { leading: true })

    return () => socket.close()
  }

  return next(action);
};
