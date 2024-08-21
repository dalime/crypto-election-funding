import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CandidateInfo from '../CandidateInfo';
import { CandidateDetails } from '@/types';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, ...props }: { icon: any }) => <svg {...props} />,
}));

jest.mock('@nextui-org/react', () => ({
  Image: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

jest.mock('../StanceOnCrypto', () => ({ stance, isMobile, expanded, toggleExpanded }: any) => (
  <div>
    <p>{isMobile && !expanded ? `${stance.substring(0, 100)}...` : stance}</p>
    <button onClick={toggleExpanded}>Toggle</button>
  </div>
));

describe('CandidateInfo Component', () => {
  const candidateDetails: CandidateDetails = {
    name: 'Donald Trump',
    age: 75,
    party: 'Republican',
    stanceOnCrypto: 'Pro-cryptocurrency, believes in the potential of digital assets.',
    image: 'trump.jpg',
    description: '',
  };

  it('Renders candidate information correctly', () => {
    render(<CandidateInfo details={candidateDetails} isMobile={false} isTablet={false} />);

    expect(screen.getByText('Republican')).toBeInTheDocument();
    expect(screen.getByText('Age: 75')).toBeInTheDocument();
    expect(screen.getByAltText('Donald Trump')).toBeInTheDocument();
  });
});