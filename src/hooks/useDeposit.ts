import {
    useWriteContract,
    useWaitForTransactionReceipt
  } from "wagmi";
  import { DEPOSIT_ABI } from "@/config/smartcontract/abi";
import { parseEther, parseUnits, zeroAddress } from "viem";

export interface InputDeposit {
  tokenAddress: string;
  decimals: number;
  amount: string;
  account: string;
}

const useDeposit = (contractAddress: any) => {
    const { writeContract, data, isError, error } = useWriteContract();
    const { isLoading, isSuccess } = useWaitForTransactionReceipt({
        hash: data
    })

    const deposit = (input: InputDeposit) => {
        const {tokenAddress, decimals, amount, account} = input;

        let value = parseEther("0");
        const amountPost = parseUnits(amount, decimals)
        if (tokenAddress === zeroAddress) {
          value = amountPost
        }

        writeContract({
          address: contractAddress,
          abi: DEPOSIT_ABI,
          functionName: "deposit",
          args: [tokenAddress, amountPost, account.trim().toLowerCase()],
          value,
        });
    }

    return {
      isLoading,
      isSuccess,
      isError,
      error,
      deposit: deposit
    };
  };
  
  export default useDeposit;