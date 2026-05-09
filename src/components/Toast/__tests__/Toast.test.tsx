import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toast from '../Toast';

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('отображает сообщение', () => {
    render(<Toast message="Тест" onClose={() => {}} />);
    expect(screen.getByText('Тест')).toBeInTheDocument();
  });

  it('автоматически закрывается через duration без ошибок', async () => {
    const onCloseMock = jest.fn();
    render(<Toast message="Тост" duration={1000} onClose={onCloseMock} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});
