export const AbiMeme = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Finalize",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ReadyToList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseReserve",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteReserve",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "poolDetails",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "buyFeeRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sellFeeRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "maxBuyAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "delayBuyTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "merkleRoot",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "maxListingQuoteAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "listingFee",
        type: "uint256",
      },
    ],
    name: "TokenCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isBuy",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseReserve",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteReserve",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Trade",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "addLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minAmountOut",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "poolDetails",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "configIndex",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "router",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "buyFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sellFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxBuyAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "delayBuyTime",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "merkleRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "initialBuyAmount",
            type: "uint256",
          },
        ],
        internalType: "struct AtheneFacet.CreatePoolParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isBuy",
        type: "bool",
      },
    ],
    name: "getAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutLessFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "platformFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tradeFee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minAmountOut",
        type: "uint256",
      },
    ],
    name: "sell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "delay",
        type: "uint256",
      },
    ],
    name: "PoolDelayBuyTimeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "details",
        type: "string",
      },
    ],
    name: "PoolDetailsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "buyFeeRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sellFeeRate",
        type: "uint256",
      },
    ],
    name: "PoolFeeRateUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "maxBuyAmount",
        type: "uint256",
      },
    ],
    name: "PoolMaxBuyAmountUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "state",
        type: "uint8",
      },
    ],
    name: "PoolStateUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "whitelist",
        type: "bytes32",
      },
    ],
    name: "PoolWhitelistUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "getAllPoolConfigs",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialVirtualBaseReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialVirtualQuoteReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSellingBaseAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxListingBaseAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxListingQuoteAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "defaultListingRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "listingFee",
            type: "uint256",
          },
        ],
        internalType: "struct AthenePoolConfig[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMasterConfig",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "feeBps",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "feeReceiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "refBps",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "poolToken",
            type: "address",
          },
          {
            internalType: "bool",
            name: "paused",
            type: "bool",
          },
        ],
        internalType: "struct AtheneMasterConfig",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOperators",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getPoolAt",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "router",
            type: "address",
          },
          {
            internalType: "string",
            name: "poolDetails",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "virtualBaseReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "virtualQuoteReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minBaseReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minQuoteReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxListingBaseAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxListingQuoteAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "defaultListingRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "listingFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "listedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "buyFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sellFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxBuyAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "delayBuyTime",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "whitelistMerkleRoot",
            type: "bytes32",
          },
        ],
        internalType: "struct AthenePoolInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getPoolConfig",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialVirtualBaseReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialVirtualQuoteReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSellingBaseAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxListingBaseAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxListingQuoteAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "defaultListingRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "listingFee",
            type: "uint256",
          },
        ],
        internalType: "struct AthenePoolConfig",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "getPoolInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "router",
            type: "address",
          },
          {
            internalType: "string",
            name: "poolDetails",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "virtualBaseReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "virtualQuoteReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minBaseReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minQuoteReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxListingBaseAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxListingQuoteAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "defaultListingRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "listingFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "listedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "buyFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sellFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxBuyAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "delayBuyTime",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "whitelistMerkleRoot",
            type: "bytes32",
          },
        ],
        internalType: "struct AthenePoolInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRouters",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserLastBuyTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "removePoolConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "delay",
        type: "uint256",
      },
    ],
    name: "setDelayBuyTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "buyFeeRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sellFeeRate",
        type: "uint256",
      },
    ],
    name: "setFeeRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "feeReceiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "feeBps",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "refBps",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "poolToken",
        type: "address",
      },
    ],
    name: "setMasterConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maxBuy",
        type: "uint256",
      },
    ],
    name: "setMaxBuyAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "operators",
        type: "address[]",
      },
      {
        internalType: "bool",
        name: "add",
        type: "bool",
      },
    ],
    name: "setOperators",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "paused",
        type: "bool",
      },
    ],
    name: "setPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialVirtualBaseReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialVirtualQuoteReserve",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSellingBaseAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxListingBaseAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxListingQuoteAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "defaultListingRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "listingFee",
            type: "uint256",
          },
        ],
        internalType: "struct AthenePoolConfig",
        name: "poolConfig",
        type: "tuple",
      },
    ],
    name: "setPoolConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "string",
        name: "details",
        type: "string",
      },
    ],
    name: "setPoolDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "state",
        type: "uint8",
      },
    ],
    name: "setPoolState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
    ],
    name: "setWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "routers",
        type: "address[]",
      },
      {
        internalType: "bool",
        name: "add",
        type: "bool",
      },
    ],
    name: "setWhitelistedRouters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
