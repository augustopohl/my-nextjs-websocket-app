import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { WebSocketMiddleware } from './websocketMiddleWare';
import { WebSocketState } from './types';

const initialState: WebSocketState = {
  number: null,
  previousNumber: null,
};

const webSocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setNumber: (state, action: { payload: number }) => {
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
