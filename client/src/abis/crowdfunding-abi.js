export const abi = [
  {
    type: 'function',
    name: 'readDetails',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        internalType: 'uint256',
        name: 'trumpAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'trumpNum',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'kamalaAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'kamalaNum',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'support',
    stateMutability: 'payable',
    inputs: [
      {
        internalType: 'string',
        name: 'candidateName',
        type: 'string',
      },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'readWalletAddress',
    stateMutability: 'view',
    inputs: [
      {
        internalType: 'string',
        name: 'candidateName',
        type: 'string',
      },
    ],
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    type: 'function',
    name: 'updateWalletAddress',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'string',
        name: 'candidateName',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'newWalletAddress',
        type: 'address',
      },
    ],
    outputs: [],
  },
];
