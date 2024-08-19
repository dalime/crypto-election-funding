import { renderHook, act } from '@testing-library/react';
import { useSupportCandidate } from './useSupportCandidate';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

jest.mock('wagmi', () => ({
  useWriteContract: jest.fn(),
  useWaitForTransactionReceipt: jest.fn(),
}));

describe('useSupportCandidate hook', () => {
  const mockUpdateCandidateDetails = jest.fn();
  const mockWriteContract = jest.fn();
  const mockContractAddress = '0xYourContractAddress'; // Add your contract address here

  beforeEach(() => {
    jest.clearAllMocks();
    (useWriteContract as jest.Mock).mockReturnValue({
      data: '0xTransactionHash',
      error: null,
      writeContract: mockWriteContract,
      isPending: false,
    });
    (useWaitForTransactionReceipt as jest.Mock).mockReturnValue({
      isLoading: false,
      isSuccess: false,
    });
  });

  it('Should initialize with correct default values', () => {
    const { result } = renderHook(() =>
      useSupportCandidate('Trump', mockUpdateCandidateDetails, mockContractAddress)
    );

    expect(result.current.amount).toBeUndefined();
    expect(result.current.isPending).toBe(false);
    expect(result.current.isConfirming).toBe(false);
    expect(result.current.isConfirmed).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('Should handle a successful support transaction', async () => {
    const mockWaitForTransactionReceipt = jest.fn().mockReturnValue({
      isSuccess: true,
      isLoading: false,
    });

    (useWriteContract as jest.Mock).mockReturnValue({
      data: '0xTransactionHash',
      error: null,
      writeContract: mockWriteContract,
      isPending: false,
    });

    (useWaitForTransactionReceipt as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useSupportCandidate('Trump', jest.fn(), mockContractAddress)
    );

    act(() => {
      result.current.setAmount('1.5');
    });

    await act(async () => {
      await result.current.handleSupport({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockWriteContract).toHaveBeenCalledTimes(1);
    expect(mockWriteContract).toHaveBeenCalledWith({
      abi: expect.any(Array),
      address: mockContractAddress,
      args: ['Trump'],
      functionName: 'support',
      value: BigInt('1500000000000000000'),
    });

    expect(result.current.isConfirmed).toBe(true);
  });

  it('Should handle contract write errors', async () => {
    const error = new Error('Mock error');
    (useWriteContract as jest.Mock).mockReturnValue({
      data: null,
      error,
      writeContract: mockWriteContract,
      isPending: false,
    });

    const { result } = renderHook(() =>
      useSupportCandidate('Trump', mockUpdateCandidateDetails, mockContractAddress)
    );

    act(() => {
      result.current.setAmount('1.5');
    });

    await act(async () => {
      await result.current.handleSupport({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.isConfirmed).toBe(false);
  });

  it('Should clear the state correctly', () => {
    const { result } = renderHook(() =>
      useSupportCandidate('Trump', mockUpdateCandidateDetails, mockContractAddress)
    );

    act(() => {
      result.current.setAmount('1.5');
    });

    act(() => {
      result.current.clearState();
    });

    expect(result.current.amount).toBeUndefined();
    expect(result.current.cleared).toBe(true);
  });
});