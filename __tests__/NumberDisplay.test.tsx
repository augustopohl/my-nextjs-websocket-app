import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NumberDisplay from '@/components/NumberDisplay';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('NumberDisplay', () => {
  const mockUseSelector = jest.fn();

  it('should display "Waiting for data..." when both numbers are null', () => {
    mockUseSelector.mockReturnValue({
      number: null,
      previousNumber: null,
    });

    jest.spyOn(require('react-redux'), 'useSelector').mockImplementation(mockUseSelector);

    render(<NumberDisplay />);

    expect(screen.getByText('Waiting for data...')).toBeInTheDocument();
  });

  it('should display the current number when both numbers are not null', () => {
    mockUseSelector.mockReturnValue({
      number: 2016347,
      previousNumber: 2016348,
    });

    jest.spyOn(require('react-redux'), 'useSelector').mockImplementation(mockUseSelector);

    render(<NumberDisplay />);

    expect(screen.getByText('2016347')).toBeInTheDocument();
  });

  it('should apply the "text-limegreen" class when the current number is greater than the previous number', () => {
    mockUseSelector.mockReturnValue({
      number: 2016347,
      previousNumber: 2016346,
    });

    jest.spyOn(require('react-redux'), 'useSelector').mockImplementation(mockUseSelector);

    render(<NumberDisplay />);

    const numberElement = screen.getByText('2016347');
    expect(numberElement).toHaveClass('text-limegreen');
  });

  it('should apply the "text-crimson" class when the current number is less than the previous number', () => {
    mockUseSelector.mockReturnValue({
      number: 2016346,
      previousNumber: 2016347,
    });

    jest.spyOn(require('react-redux'), 'useSelector').mockImplementation(mockUseSelector);

    render(<NumberDisplay />);

    const numberElement = screen.getByText('2016346');
    expect(numberElement).toHaveClass('text-crimson');
  });

  it('should apply the "text-white" class when numbers are equal', () => {
    mockUseSelector.mockReturnValue({
      number: 2016347,
      previousNumber: 2016347,
    });

    jest.spyOn(require('react-redux'), 'useSelector').mockImplementation(mockUseSelector);

    render(<NumberDisplay />);

    const numberElement = screen.getByText('2016347');
    expect(numberElement).toHaveClass('text-white');
  });
});
