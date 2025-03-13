import {
    useAccount,
    useReadContract,
    useWriteContract,
    useWaitForTransactionReceipt
  } from "wagmi";
  import { ERC20_ABI } from "@/config/smartcontract/abi";
import { maxInt256, parseUnits } from "viem";
import { useEffect } from "react";

const useApprovalToken = (tokenAddress: any, contractAddress: string):
  {isLoading: boolean, isSuccess: boolean, isError: boolean, error: any,allowance: bigint, approve: Function, refetch: Function} => {
    const { address } = useAccount();
    const { writeContract, data, isError, error} = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash: data
    })

    useEffect(() => {
        refetch()
    }, [isConfirming])

    const { data: allowance, refetch } = useReadContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "allowance",
      args: [address, contractAddress],
      query: {enabled: !!address}
    });

    const approve = (amount: string, decimals: number) => {
      console.log(amount, decimals);
      
        writeContract({
          address: tokenAddress,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [contractAddress, parseUnits(amount, decimals)],
        });
    }

    return {
      isLoading: isConfirming,
      isSuccess,
      isError,
      error,
      allowance:  allowance ? allowance as bigint:  BigInt(0),
      approve: approve,
      refetch
    };
  };
  
  export default useApprovalToken;