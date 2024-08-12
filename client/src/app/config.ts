import { http, createConfig } from 'wagmi'
import { base, mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const config = createConfig({
  chains: [mainnet, base, sepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask({ infuraAPIKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
})