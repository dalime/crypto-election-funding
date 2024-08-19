import { shortenAddress, copyAddress } from './ethereum';

describe('Ethereum Utils', () => {
  describe('shortenAddress utility function', () => {
    it('Should shorten the Ethereum address to default 4 characters on both sides', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const result = shortenAddress(address);
      expect(result).toBe('0x1234...5678');
    });

    it('Should shorten the Ethereum address to specified characters on both sides', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const result = shortenAddress(address, 6);
      expect(result).toBe('0x123456...345678');
    });

    it('Should return the entire address if chars is greater than half the address length', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const result = shortenAddress(address, 20);
      expect(result).toBe('0x1234567890abcdef1234...567890abcdef12345678');
    });
  });

  describe('copyAddress utility function', () => {
    it('Should copy the Ethereum address to the clipboard', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      // Mock clipboard.writeText
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn(),
        },
      });

      copyAddress(address);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(address);
    });
  });
});