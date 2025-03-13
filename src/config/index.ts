import { defaultWagmiConfig } from '@web3modal/wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'

export const projectId = process.env['NEXT_PUBLIC_PROJECT_ID']

export const domain = process.env['NEXT_PUBLIC_APP_DOMAIN'] ?? ""

if (!projectId) {
  throw new Error('Project ID is not defined')
}
export const parthenon = {
  id: 281123,
  name: "Parthenon Testnet",
  network: "parthenon",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.parthenon.athenescan.io/bb18e1961abb4e44b452d97f3c86d40f",
      ],
    },
    public: {
      http: [
        "https://rpc.parthenon.athenescan.io/bb18e1961abb4e44b452d97f3c86d40f",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Parthenon Explorer",
      url: "https://parthenon.athenescan.io",
    },
  },
  testnet: true,
};
export const config = defaultWagmiConfig({
  projectId,
  chains: [bscTestnet],
  metadata: {
    name: 'W2M Meme',
    description: 'W2M Meme',
    url: `https://${domain}`,
    icons: [`https://${domain}/favicon.ico`]
  },
})

export const targetChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID)
export const includeTestnet = (process.env.NEXT_PUBLIC_INCLUDE_TESTNET ?? 'false') === 'true'