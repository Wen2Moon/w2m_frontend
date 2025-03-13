import { Chain } from 'wagmi';
import {
    arbitrum,
    arbitrumGoerli,
    arbitrumSepolia,
    base,
    baseGoerli,
    baseSepolia,
    bscTestnet,
    bsc as bsc_,
    goerli,
    linea,
    lineaTestnet,
    mainnet,
    opBNB,
    opBNBTestnet,
    polygonZkEvm,
    polygonZkEvmTestnet,
    scrollSepolia,
    sepolia,
    zkSync,
    zkSyncTestnet,
} from 'wagmi/chains'


const bsc = {
    ...bsc_,
    rpcUrls: {
        ...bsc_.rpcUrls,
        public: {
            ...bsc_.rpcUrls.public,
            http: ['https://bsc-dataseed.binance.org/'],
        },
        default: {
            ...bsc_.rpcUrls.default,
            http: ['https://bsc-dataseed.binance.org/'],
        },
    },
} satisfies Chain

export const listChains = [
    bsc,
    bscTestnet,
    mainnet,
    goerli,
    sepolia,
    polygonZkEvm,
    polygonZkEvmTestnet,
    zkSync,
    zkSyncTestnet,
    arbitrum,
    arbitrumGoerli,
    arbitrumSepolia,
    linea,
    lineaTestnet,
    base,
    baseGoerli,
    baseSepolia,
    opBNB,
    opBNBTestnet,
    scrollSepolia,
]
