export enum WebSocketActionTypes {
    WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT',
}

export type WebSocketAction = {
    type: WebSocketActionTypes;
  };

export type NumberType = number | null;

export interface WebSocketState {
  number: NumberType;
  previousNumber: NumberType;
}