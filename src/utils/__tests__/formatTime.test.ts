import { formatTime } from '../formatTime';

describe('formatTime', () => {
  it('конвертирует 65 секунд в 1:05', () => {
    expect(formatTime(65)).toBe('1:05');
  });

  it('конвертирует 120 секунд в 2:00', () => {
    expect(formatTime(120)).toBe('2:00');
  });

  it('конвертирует 0 секунд в 0:00', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('обрабатывает NaN и возвращает 0:00', () => {
    expect(formatTime(NaN)).toBe('0:00');
  });
});