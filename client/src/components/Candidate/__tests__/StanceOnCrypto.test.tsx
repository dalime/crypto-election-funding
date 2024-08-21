import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import StanceOnCrypto from '../StanceOnCrypto';

describe('StanceOnCrypto Component', () => {
  const defaultProps = {
    stance: "Kamala Harris has not taken a definitive public stance on cryptocurrency. However, recent developments suggest a possible shift in her position. As the U.S. Vice President and Democratic presidential nominee, Harris has shown signs of openness towards engaging with the cryptocurrency community. Her campaign has started reaching out to crypto representatives, indicating a willingness to explore the sector's potential and policy implications.",
    isMobile: false,
    expanded: false,
    toggleExpanded: jest.fn(),
  };

  it('Should render the stance on crypto', () => {
    render(<StanceOnCrypto {...defaultProps} />);
    const stanceOnCryptoText = screen.getByTestId('stance-on-crypto-text');
    expect(stanceOnCryptoText.textContent).toBe(`Stance on Crypto: ${defaultProps.stance}`);
  });

  it('Should render a shortened stance on mobile when not expanded', () => {
    render(<StanceOnCrypto {...defaultProps} isMobile={true} />);
    const stanceOnCryptoText = screen.getByTestId('stance-on-crypto-text');
    expect(stanceOnCryptoText.textContent).toBe('Stance on Crypto: Kamala Harris has not taken a definitive public stance on cryptocurrency. However, recent developmen...');
  });

  it('Should render the full stance on mobile when expanded', () => {
    render(<StanceOnCrypto {...defaultProps} isMobile={true} expanded={true} />);
    const stanceOnCryptoText = screen.getByTestId('stance-on-crypto-text');
    expect(stanceOnCryptoText.textContent).toBe(`Stance on Crypto: ${defaultProps.stance}`);
  });

  it('Should call toggleExpanded when the button is clicked', () => {
    render(<StanceOnCrypto {...defaultProps} isMobile={true} />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.toggleExpanded).toHaveBeenCalled();
  });
});