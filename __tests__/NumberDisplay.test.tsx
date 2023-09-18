import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NumberDisplay from '@/components/NumberDisplay';
import { NumberType } from '@/redux/types';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('NumberDisplay', () => {
  const mockUseSelector = jest.fn();

  const setupComponent = (number: NumberType, previousNumber: NumberType) => {
    mockUseSelector.mockReturnValue({
      number,
      previousNumber,
    });
    
    jest.spyOn(require('react-redux'), 'useSelector').mockImplementation(mockUseSelector);

    render(<NumberDisplay />);
  };

  it('should display a message when both numbers are not defined yet', () => {
    setupComponent(null, null);
    expect(screen.getByText('Waiting for data...')).toBeInTheDocument();
  });

  it('should display the current value when both numbers are defined', () => {
    setupComponent(2016347, 2016348);

    expect(screen.getByText('2016347')).toBeInTheDocument();
  });

  it('should apply the green color when the current value is greater than the previous one', () => {
    setupComponent(2016347, 2016346);

    const numberElement = screen.getByText('2016347');
    expect(numberElement).toHaveClass('text-limegreen');
  });

  it('should apply the red color when the current value is less than the previous one', () => {
    setupComponent(2016346, 2016347);

    const numberElement = screen.getByText('2016346');
    expect(numberElement).toHaveClass('text-crimson');
  });

  it('should apply the white color when the values are equal', () => {
    setupComponent(2016347, 2016347);
    
    const numberElement = screen.getByText('2016347');
    expect(numberElement).toHaveClass('text-white');
  });
});
