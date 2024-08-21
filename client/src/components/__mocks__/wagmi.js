// __mocks__/wagmi.js

export const useAccount = jest.fn(() => ({
  address: '0xMockAddress',
  isConnected: true,
}));

export const useChainId = jest.fn(() => 1);

export const useDisconnect = jest.fn(() => ({
  disconnect: jest.fn(),
}));

export const useEnsName = jest.fn(() => ({
  data: 'mock.ens',
}));

export const useConnect = jest.fn(() => ({
  connectors: [{ id: 'mockConnector', name: 'Mock Connector' }],
  connect: jest.fn(),
}));

export const WagmiProvider = ({ children }) => <div>{children}</div>;