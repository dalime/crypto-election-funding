import { trumpDetails, kamalaDetails } from '../constants/candidateDetails';
import { CandidateDetails } from '../types';

/**
 * Custom hook to get candidate details
 * @param candidate 'Trump' | 'Kamala'
 * @returns CandidateDetails | null
 */
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