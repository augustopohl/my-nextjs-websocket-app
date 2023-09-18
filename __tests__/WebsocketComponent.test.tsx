import React from 'react';
import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import WebSocketComponent from '@/components/WebSocketComponent';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('WebSocketComponent', () => {
  it('should dispatch the WEBSOCKET_CONNECT action on mount', () => {
    const mockDispatch = jest.fn();
    
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    render(<WebSocketComponent />);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'WEBSOCKET_CONNECT' });
  });
});
