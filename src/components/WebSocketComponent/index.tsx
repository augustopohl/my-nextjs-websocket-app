"use client"

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const WebSocketComponent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'WEBSOCKET_CONNECT' });
  }, [dispatch])

  return null;
};

export default WebSocketComponent;
