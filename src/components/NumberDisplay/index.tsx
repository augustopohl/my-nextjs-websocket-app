"use client"

import React from 'react';
import { RootState, WebSocketState } from '@/redux/store';
import { useSelector } from 'react-redux';

const NumberDisplay: React.FC = () => {
  const { number, previousNumber }: WebSocketState = useSelector(
    (state: RootState) => state.websocket 
  );

  const getColor = () => {
    return number === null || previousNumber === null
      ? 'text-white'
      : number > previousNumber
      ? 'text-limegreen'
      : number < previousNumber
      ? 'text-crimson'
      : 'text-white';
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        <div className="text-white text-4xl text-center font-bold mt-4 mb-4">
          Quadra test
        </div>
        <div className="bg-gray-300 rounded-lg p-4 justify-center flex">
          <div className={`text-2xl font-bold transition-color duration-200 ease-in-out ${getColor()}`}>
            {number !== null ? number : 'Waiting for data...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberDisplay;
