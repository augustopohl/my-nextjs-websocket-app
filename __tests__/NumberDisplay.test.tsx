import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NumberDisplay from '@/components/NumberDisplay';
import { NumberType } from '@/redux/store';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
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

  it('should display "Waiting for data..." when both numbers are null', () => {
    setupComponent(null, null);
    expect(screen.getByText('Waiting for data...')).toBeInTheDocument();
  });

  it('should display the current number when both numbers are not null', () => {
    setupComponent(2016347, 2016348);

    expect(screen.getByText('2016347')).toBeInTheDocument();
  });

  it('should apply the "text-limegreen" class when the current number is greater than the previous number', () => {
    setupComponent(2016347, 2016346);

    const numberElement = screen.getByText('2016347');
    expect(numberElement).toHaveClass('text-limegreen');
  });

  it('should apply the "text-crimson" class when the current number is less than the previous number', () => {
    setupComponent(2016346, 2016347);

    const numberElement = screen.getByText('2016346');
    expect(numberElement).toHaveClass('text-crimson');
  });

  it('should apply the "text-white" class when numbers are equal', () => {
    setupComponent(2016347, 2016347);
    
    const numberElement = screen.getByText('2016347');
    expect(numberElement).toHaveClass('text-white');
  });
});
