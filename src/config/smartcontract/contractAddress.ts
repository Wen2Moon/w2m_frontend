const CONTRACTS = {
  parthenon: {
    router: "0x5271979ce62d68FBC2b45144A7E160E12faA19ba",
    AtheneFacet: "0x09C95fC0304ACC9b4A148914D8Ab577dF60EB068",
    AtheneToken: "0xcfCd46d9a339B678D6B96069ec20aE194017b4De",
  },
  bscTestnet: {
    router: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
    AtheneFacet: "0x2734CD070EED1C59dAeB000c8909ABBa2E284C57",
    AtheneToken: "0x3E935c1e65163D0E52d1fFBb384A4dCc8bBEAd99",
  },
};

export const getContractsByChainId = (chainId: number | undefined) => {
  switch (chainId) {
    case 281123: // Parthenon chain ID
      return CONTRACTS.parthenon;
    case 97: // BSC chain ID
      return CONTRACTS.bscTestnet;
    default:
      return CONTRACTS.bscTestnet;
  }
};
