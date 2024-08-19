import { roundTo6Decimals, calculateAge } from '../numbers'

describe('roundTo6Decimals utility function', () => {
  test('Should round number to 6 decimal places', () => {
    expect(roundTo6Decimals(0.123456789)).toBe(0.123457);
    expect(roundTo6Decimals(1.987654321)).toBe(1.987654);
    expect(roundTo6Decimals(0.000001234567)).toBe(0.000001);
  });

  test('Should handle rounding up', () => {
    expect(roundTo6Decimals(0.0000002)).toBe(0);
    expect(roundTo6Decimals(1.0000005)).toBe(1.000001);
  });

  test('Should return the same number if already 6 decimal places or less', () => {
    expect(roundTo6Decimals(1.123456)).toBe(1.123456);
    expect(roundTo6Decimals(2)).toBe(2);
  });
});

describe('calculateAge utility function', () => {
  test('Should calculate the correct age for a past date in the current year', () => {
    const birthdate = '2000-01-01';
    const expectedAge = new Date().getFullYear() - 2000;
    expect(calculateAge(birthdate)).toBe(expectedAge);
  });

  test('Should calculate the correct age if the birthday is today', () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(calculateAge(today)).toBe(0);
  });

  test('Should calculate the correct age for a birthdate that has not occurred yet this year', () => {
    const birthdate = '2000-12-31';
    const expectedAge = new Date().getFullYear() - 2000 - 1;
    expect(calculateAge(birthdate)).toBe(expectedAge);
  });

  test('Should calculate the correct age for a birthdate that occurred this year', () => {
    const birthdate = '2000-01-01';
    const expectedAge = new Date().getFullYear() - 2000;
    expect(calculateAge(birthdate)).toBe(expectedAge);
  });
});