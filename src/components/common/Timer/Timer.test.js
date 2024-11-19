import { render, act, fireEvent } from '@testing-library/react';
import Timer from './Timer';

describe('Timer', () => {
  jest.useFakeTimers();

  it('counts down correctly', () => {
    const onEnd = jest.fn();
    const { getByRole } = render(
      <Timer duration={60} onEnd={onEnd} onForceStop={() => {}} />
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByRole('timer')).toHaveAttribute('aria-label', '0:59 залишилось');
  });

  it('handles force stop', () => {
    const onForceStop = jest.fn();
    const { getByLabelText } = render(
      <Timer duration={60} onEnd={() => {}} onForceStop={onForceStop} />
    );

    fireEvent.click(getByLabelText('Зупинити таймер'));
    expect(onForceStop).toHaveBeenCalled();
  });
});