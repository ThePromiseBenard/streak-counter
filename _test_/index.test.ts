import { streakCounter } from '../src';
import { JSDOM } from 'jsdom';
import { formattedDate } from '../src/utils';

describe('streakCounter', () => {
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const mockJSDom = new JSDOM('', { url: 'https://localhost' });
    mockLocalStorage = mockJSDom.window.localStorage;
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it('should return a streak object with currentCounter, startDate and lastLoginDate', () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    expect(streak.hasOwnProperty('currentCount')).toBe(true);
    expect(streak.hasOwnProperty('startDate')).toBe(true);
    expect(streak.hasOwnProperty('lastLoginDate')).toBe(true);
  });

  it('', () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    formattedDate(date);
    const dateFormatted = formattedDate(date);
    expect(streak.currentCount).toBe(1);
    expect(streak.lastLoginDate).toBe(dateFormatted);
  });

  it('', () => {
    const date = new Date();
    const key = 'streak';
    streakCounter(mockLocalStorage, date);

    const streakAsString = mockLocalStorage.getItem(key);
    expect(streakAsString).not.toBeNull();
  });
  describe('with a pre-populated streak', () => {
    let mockLocalStorage: Storage;
    beforeEach(() => {
      const mockJSDom = new JSDOM('', { url: 'https://localhost' });

      mockLocalStorage = mockJSDom.window.localStorage;

      // Use date in past so it’s always the same
      const date = new Date('12/12/2021');

      const streak = {
        currentCount: 1,
        startDate: formattedDate(date),
        lastLoginDate: formattedDate(date),
      };

      mockLocalStorage.setItem('streak', JSON.stringify(streak));
    });
    afterEach(() => {
      mockLocalStorage.clear();
    });
    it('should return the streak from localStorage', () => {
      const date = new Date();
      const streak = streakCounter(mockLocalStorage, date);

      // Should match the dates used to set up the tests
      expect(streak.startDate).toBe('12/12/2021');
    });
  });
});
