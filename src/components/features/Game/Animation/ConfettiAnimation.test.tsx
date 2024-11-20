// src/components/features/Game/Animation/ConfettiAnimation.test.tsx
import React from 'react';
import { render, act } from '@testing-library/react';
import ConfettiAnimation from './ConfettiAnimation';

// Мокаем canvas-confetti
jest.mock('canvas-confetti', () => jest.fn());

describe('ConfettiAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<ConfettiAnimation isRunning={false} />);
    expect(getByTestId('confetti-animation')).toBeInTheDocument();
  });

  it('starts animation when isRunning is true', () => {
    const confetti = require('canvas-confetti');
    render(<ConfettiAnimation isRunning={true} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(confetti).toHaveBeenCalled();
  });

  it('stops animation when isRunning becomes false', () => {
    const confetti = require('canvas-confetti');
    const { rerender } = render(<ConfettiAnimation isRunning={true} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    rerender(<ConfettiAnimation isRunning={false} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const callCount = confetti.mock.calls.length;
    expect(callCount).toBe(2); // По два вызова за одну анимацию
  });

  it('cleans up interval on unmount', () => {
    const confetti = require('canvas-confetti');
    const { unmount } = render(<ConfettiAnimation isRunning={true} />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(confetti).not.toHaveBeenCalled();
  });
});