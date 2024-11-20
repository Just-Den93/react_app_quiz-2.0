// src/components/common/Timer/Timer.test.tsx
import React from 'react';
import { render, act, fireEvent, screen } from '@testing-library/react';
import Timer from './Timer';
import { testUtils } from './timerUtils';

describe('Timer Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    testUtils.cleanup();
    jest.clearAllTimers();
  });

  it('renders correctly with initial time', () => {
    const onEnd = jest.fn();
    const onForceStop = jest.fn();
    
    render(
      <Timer 
        duration={60} 
        onEnd={onEnd} 
        onForceStop={onForceStop}
      />
    );

    expect(screen.getByRole('timer')).toHaveAttribute(
      'aria-label',
      '01:00 залишилось'
    );
  });

  it('updates time correctly', () => {
    const onEnd = jest.fn();
    const onForceStop = jest.fn();
    
    render(
      <Timer 
        duration={60} 
        onEnd={onEnd} 
        onForceStop={onForceStop}
      />
    );

    act(() => {
      testUtils.advanceTimer(1000);
    });

    expect(screen.getByRole('timer')).toHaveAttribute(
      'aria-label',
      '00:59 залишилось'
    );
  });

  it('calls onEnd when timer reaches zero', () => {
    const onEnd = jest.fn();
    const onForceStop = jest.fn();
    
    render(
      <Timer 
        duration={2} 
        onEnd={onEnd} 
        onForceStop={onForceStop}
      />
    );

    act(() => {
      testUtils.advanceTimer(2000);
    });

    expect(onEnd).toHaveBeenCalled();
  });

  it('shows force stop button on hover', () => {
    const onEnd = jest.fn();
    const onForceStop = jest.fn();
    
    render(
      <Timer 
        duration={60} 
        onEnd={onEnd} 
        onForceStop={onForceStop}
      />
    );

    fireEvent.mouseEnter(screen.getByRole('timer'));
    
    expect(screen.getByRole('button', { 
      name: 'Зупинити таймер' 
    })).toBeInTheDocument();
  });

  it('calls onForceStop when force stop button clicked', () => {
    const onEnd = jest.fn();
    const onForceStop = jest.fn();
    
    render(
      <Timer 
        duration={60} 
        onEnd={onEnd} 
        onForceStop={onForceStop}
      />
    );

    fireEvent.mouseEnter(screen.getByRole('timer'));
    fireEvent.click(screen.getByRole('button', { 
      name: 'Зупинити таймер' 
    }));
    
    expect(onForceStop).toHaveBeenCalled();
  });
});