import {
  arbitrumGoerli,
  polygonZkEvm,
  polygonZkEvmTestnet,
  zkSync,
  zkSyncTestnet,
  linea,
  opBNBTestnet,
  opBNB,
  base,
  baseGoerli,
  scrollSepolia,
  arbitrumSepolia,
  baseSepolia,
  arbitrum,
} from "viem/chains";
import { sepolia } from "wagmi";
import { ChainId } from "../chainId";

export const getNodeRealUrl = (chainId: number, key?: string) => {
  let host: string | null = null;

  switch (chainId) {
    case ChainId.ETHEREUM:
      if (key) {
        host = `eth-mainnet.nodereal.io/v1/${key}`;
      }
      break;
    case ChainId.GOERLI:
      if (key) {
        host = `eth-goerli.nodereal.io/v1/${key}`;
      }
      break;
    case ChainId.BSC:
      if (key) {
        host = `bsc-mainnet.nodereal.io/v1/${key}`;
      }
      break;
    case ChainId.OPBNB:
      if (key) {
        host = `opbnb-mainnet.nodereal.io/v1/${key}`;
      }
      break;
    case ChainId.POLYGON_ZKEVM:
      if (key) {
        host = `open-platform.nodereal.io/${key}/polygon-zkevm-rpc`;
      }
      break;
    case ChainId.ARBITRUM_ONE:
      if (key) {
        host = `open-platform.nodereal.io/${key}/arbitrum-nitro`;
      }
      break;
    case ChainId.BASE:
      if (key) {
        host = `open-platform.nodereal.io/${key}/base`;
      }
      break;
    case ChainId.ZKSYNC:
      if (key) {
        host = `open-platform.nodereal.io/${key}/zksync`;
      }
      break;
    default:
      host = null;
  }

  if (!host) {
    return null;
  }

  const url = `https://${host}`;
  return url;
};

const pocketPrefix = {
  [ChainId.ARBITRUM_ONE]: "arbitrum-one",
  [ChainId.BASE]: "base-mainnet",
  [ChainId.BSC]: "bsc-mainnet",
  [ChainId.ETHEREUM]: "eth-mainnet",
  [ChainId.POLYGON_ZKEVM]: "polygon-zkevm-mainnet",
} as const;

export const getPoktUrl = (
  chainId: keyof typeof pocketPrefix,
  key?: string
) => {
  if (!key) {
    return null;
  }

  const url = `https://${pocketPrefix[chainId]}.gateway.pokt.network/v1/lb/${key}`;
  return url;
};

export const getGroveUrl = (
  chainId: keyof typeof pocketPrefix,
  key?: string
) => {
  if (!key) {
    return null;
  }

  const url = `https://${pocketPrefix[chainId]}.rpc.grove.city/v1/${key}`;
  return url;
};

const ARBITRUM_NODES = [
  ...arbitrum.rpcUrls.public.http,
  "https://arbitrum-one.publicnode.com",
  "https://arbitrum.llamarpc.com",
].filter(Boolean);
export const PUBLIC_NODES = {
  [ChainId.BSC]: [
    process.env.NEXT_PUBLIC_NODE_PRODUCTION || "",
    getNodeRealUrl(ChainId.BSC, process.env.NEXT_PUBLIC_NODE_REAL_API_ETH) ||
      "",
    process.env.NEXT_PUBLIC_NODIES_BSC || "",
    getGroveUrl(ChainId.BSC, process.env.NEXT_PUBLIC_GROVE_API_KEY) || "",
    "https://bsc.publicnode.com",
    "https://binance.llamarpc.com",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed1.binance.org",
  ].filter(Boolean),
  [ChainId.BSC_TESTNET]: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  [ChainId.ETHEREUM]: [
    getNodeRealUrl(
      ChainId.ETHEREUM,
      process.env.NEXT_PUBLIC_NODE_REAL_API_ETH
    ) || "",
    process.env.NEXT_PUBLIC_NODIES_ETH || "",
    getGroveUrl(ChainId.ETHEREUM, process.env.NEXT_PUBLIC_GROVE_API_KEY) || "",
    "https://ethereum.publicnode.com",
    "https://eth.llamarpc.com",
    "https://cloudflare-eth.com",
  ].filter(Boolean),
  [ChainId.GOERLI]: [
    getNodeRealUrl(
      ChainId.GOERLI,
      process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI
    ) || "",
    "https://eth-goerli.public.blastapi.io",
  ].filter(Boolean),
  [ChainId.ARBITRUM_ONE]: [
    ...ARBITRUM_NODES,
    process.env.NEXT_PUBLIC_NODIES_ARB || "",
    getNodeRealUrl(
      ChainId.ARBITRUM_ONE,
      process.env.NEXT_PUBLIC_NODE_REAL_API_ETH
    ) || "",
    getGroveUrl(ChainId.ARBITRUM_ONE, process.env.NEXT_PUBLIC_GROVE_API_KEY) ||
      "",
  ].filter(Boolean),
  [ChainId.ARBITRUM_GOERLI]: arbitrumGoerli.rpcUrls.public.http,
  [ChainId.POLYGON_ZKEVM]: [
    process.env.NEXT_PUBLIC_NODIES_POLYGON_ZKEVM || "",
    ...polygonZkEvm.rpcUrls.public.http,
    "https://f2562de09abc5efbd21eefa083ff5326.zkevm-rpc.com/",
    getGroveUrl(ChainId.POLYGON_ZKEVM, process.env.NEXT_PUBLIC_GROVE_API_KEY) ||
      "",
  ].filter(Boolean),
  [ChainId.POLYGON_ZKEVM_TESTNET]: [
    ...polygonZkEvmTestnet.rpcUrls.public.http,
    "https://polygon-zkevm-testnet.rpc.thirdweb.com",
  ],
  [ChainId.ZKSYNC]: [
    ...zkSync.rpcUrls.public.http,
    getNodeRealUrl(ChainId.ZKSYNC, process.env.NEXT_PUBLIC_NODE_REAL_API_ETH) ||
      "",
  ],
  [ChainId.ZKSYNC_TESTNET]: zkSyncTestnet.rpcUrls.public.http,
  [ChainId.LINEA]: linea.rpcUrls.public.http,
  [ChainId.LINEA_TESTNET]: [
    "https://rpc.goerli.linea.build",
    "https://linea-testnet.rpc.thirdweb.com",
    "https://consensys-zkevm-goerli-prealpha.infura.io/v3/93e8a17747e34ec0ac9a554c1b403965",
  ],
  [ChainId.OPBNB_TESTNET]: opBNBTestnet.rpcUrls.public.http,
  [ChainId.OPBNB]: [
    ...opBNB.rpcUrls.public.http,
    getNodeRealUrl(ChainId.OPBNB, process.env.NEXT_PUBLIC_NODE_REAL_API_ETH) ||
      "",
    "https://opbnb.publicnode.com",
  ],
  [ChainId.BASE]: [
    "https://base.publicnode.com",
    process.env.NEXT_PUBLIC_NODIES_BASE || "",
    getGroveUrl(ChainId.BASE, process.env.NEXT_PUBLIC_GROVE_API_KEY) || "",
    // process.env.NEXT_PUBLIC_NODE_REAL_BASE_PRODUCTION,
    ...base.rpcUrls.public.http,
  ].filter(Boolean),
  [ChainId.BASE_TESTNET]: baseGoerli.rpcUrls.public.http,
  [ChainId.SCROLL_SEPOLIA]: scrollSepolia.rpcUrls.public.http,
  [ChainId.SEPOLIA]: sepolia.rpcUrls.public.http,
  [ChainId.ARBITRUM_SEPOLIA]: arbitrumSepolia.rpcUrls.public.http,
  [ChainId.BASE_SEPOLIA]: baseSepolia.rpcUrls.public.http,
} satisfies Record<ChainId, readonly string[]>;
