import { renderHook } from '@testing-library/react';
import { useCandidateDetails } from './useCandidateDetails';
import { trumpDetails, kamalaDetails } from '../constants/candidateDetails';

describe('useCandidateDetails hook', () => {
  it('Returns Trump details when candidate is "Trump"', () => {
    const { result } = renderHook(() => useCandidateDetails('Trump'));
    expect(result.current).toEqual(trumpDetails);
  });

  it('Returns Kamala details when candidate is "Kamala"', () => {
    const { result } = renderHook(() => useCandidateDetails('Kamala'));
    expect(result.current).toEqual(kamalaDetails);
  });

  it('Returns null for an invalid candidate', () => {
    const { result } = renderHook(() => useCandidateDetails('Invalid' as 'Trump' | 'Kamala'));
    expect(result.current).toBeNull();
  });
});