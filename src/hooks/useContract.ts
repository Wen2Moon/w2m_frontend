import { ChainId } from "@/config/chainId";
import {
  Abi,
  Address,
  PublicClient,
  WalletClient,
  getContract as viemGetContract,
} from "viem";
import { useMemo } from "react";
import { viemClients } from "@/utils/viem";
import { useActiveChainId } from "./useActiveChainId";
import { targetChainId } from "@/config";
import { useWalletClient } from "wagmi";

export const getContract = <
  TAbi extends Abi | unknown[],
  TWalletClient extends WalletClient
>({
  abi,
  address,
  chainId = ChainId.BSC,
  publicClient,
  signer,
}: {
  abi: TAbi;
  address: Address;
  chainId?: ChainId;
  signer?: TWalletClient;
  publicClient?: PublicClient;
}) => {
  console.log('signer :>> ', signer);
  const c = viemGetContract({
    abi,
    address,
    // TODO: Fix viem
    // @ts-ignore
    publicClient: publicClient ?? viemClients[chainId],
    // TODO: Fix viem
    // @ts-ignore
    walletClient: signer || undefined,
  });
  return {
    ...c,
    account: signer?.account,
    chain: signer?.chain,
  };
};

// Code below migrated from Exchange useContract.ts

type UseContractOptions = {
  chainId?: ChainId;
};

// returns null on errors
export function useContract<TAbi extends Abi>(
  addressOrAddressMap?: Address | { [chainId: number]: Address },
  abi?: TAbi,
  options?: UseContractOptions
) {
  // const { chainId: currentChainId } = useActiveChainId();
  const chainId = targetChainId;
  const { data: walletClient } = useWalletClient();
  // const walletClient  = null

  return useMemo(() => {
    if (!addressOrAddressMap || !abi || !chainId) return null;
    let address: Address | undefined;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract({
        abi,
        address,
        chainId: chainId,
        signer: walletClient ?? undefined,
      });
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [addressOrAddressMap, abi, chainId, walletClient]);
}
