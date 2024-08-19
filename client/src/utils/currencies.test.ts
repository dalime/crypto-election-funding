import { formatToUSD } from './currencies';

describe('formatToUSD utility function', () => {
  it('Should format the number with two decimal places and add USD suffix', () => {
    const result = formatToUSD(1234.56);
    expect(result).toBe('1,234.56 USD');
  });

  it('Should handle numbers without decimals correctly', () => {
    const result = formatToUSD(1000);
    expect(result).toBe('1,000.00 USD');
  });

  it('Should round numbers to two decimal places', () => {
    const result = formatToUSD(1234.5678);
    expect(result).toBe('1,234.57 USD');
  });

  it('Should handle large numbers correctly', () => {
    const result = formatToUSD(9876543210.12345);
    expect(result).toBe('9,876,543,210.12 USD');
  });

  it('Should handle very small numbers correctly', () => {
    const result = formatToUSD(0.123);
    expect(result).toBe('0.12 USD');
  });
});