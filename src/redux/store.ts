import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { WebSocketMiddleware } from './websocketMiddleWare';

export type NumberType = number | null;

export interface WebSocketState {
  number: NumberType;
  previousNumber: NumberType;
}

const initialState: WebSocketState = {
  number: null,
  previousNumber: null,
};

const webSocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setNumber: (state, action) => {
      state.previousNumber = state.number; 
      state.number = action.payload;
    },
  },
});

export const { setNumber } = webSocketSlice.actions;

const store = configureStore({
  reducer: {
    websocket: webSocketSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(WebSocketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
