import { trumpDetails, kamalaDetails } from '@/constants/candidateDetails';
import { CandidateDetails } from '@/types';

export const useCandidateDetails = (candidate: 'Trump' | 'Kamala'): CandidateDetails | null => {
  switch (candidate) {
    case 'Trump':
      return trumpDetails;
    case 'Kamala':
      return kamalaDetails;
    default:
      return null;
  }
};