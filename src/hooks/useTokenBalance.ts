import { useAccount, useBalance, useReadContract } from "wagmi";
import { ERC20_ABI } from "@/config/smartcontract/abi";
import { formatUnits, zeroAddress } from "viem";

const zero = BigInt(0);

const useTokenBalance = (
  tokenAddress: any
): {
  balance: bigint;
  balanceFormated: string;
  decimals: number;
  symbol: any;
  refetchBalance: Function;
} => {
  const { address } = useAccount();

  // native
  const { data: nativeData, refetch: reFreshNative } = useBalance({ address });

  // erc20 token
  const { data: tokenBalance, refetch } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
    query: { enabled: !!address },
  });

  const { data: tokenDecimal } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "decimals",
    query: { enabled: !!address },
  });

  const { data: symbol } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "symbol",
    query: { enabled: !!address },
  });

  if (tokenAddress === zeroAddress) {
    return {
      balance: nativeData ? nativeData?.value : zero,
      balanceFormated: nativeData ? nativeData?.formatted : "0",
      decimals: nativeData ? nativeData.decimals : 0,
      symbol: nativeData ? nativeData.symbol : "",
      refetchBalance: reFreshNative,
    };
  }

  return {
    balance: tokenBalance ? (tokenBalance as bigint) : zero,
    balanceFormated: (() => {
      try {
        if (!tokenBalance) return "0";
        const balance = BigInt(tokenBalance.toString());
        const decimal = Number(tokenDecimal || 0);
        return formatUnits(balance, decimal);
      } catch (error) {
        console.error('Error formatting balance:', error);
        return "0";
      }
    })(),
    decimals: Number(tokenDecimal || 0),
    symbol: symbol || "",
    refetchBalance: refetch,
  };
};

export default useTokenBalance;
