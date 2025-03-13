import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { AbiMeme } from "@/config/smartcontract/meme.abi";
import { Address, parseUnits } from "viem";

export interface InputSellToken {
  token: Address;
  referrer: Address;
  amountIn: string | number;
  minAmountOut: string | number;
}



const useSellToken = (contractAddress: any, decimals: number = 18) => {
  const { writeContract, data, isError, error } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  });

  const sellToken = async (input: InputSellToken) => {
    try {
      const { token, referrer, amountIn, minAmountOut } = input;

      // Validate input
      if (!contractAddress) {
        throw new Error("Contract address is required");
      }

      if (!token || !referrer) {
        throw new Error("Token and referrer addresses are required");
      }

      // Parse amounts với decimals được truyền vào
      const parsedAmountIn = parseUnits(
        amountIn.toString(),
        decimals
      );

      const parsedMinAmountOut = parseUnits(
        minAmountOut.toString(),
        decimals
      );

      // Log để debug
      console.log("Selling token with params:", {
        token,
        referrer,
        amountIn: parsedAmountIn.toString(),
        minAmountOut: parsedMinAmountOut.toString(),
        decimals,
      });

      // Gọi contract
      const tx = await writeContract({
        address: contractAddress,
        abi: AbiMeme,
        functionName: "sell",
        args: [
          token,
          referrer,
          parsedAmountIn,
          parsedMinAmountOut,
        ],
      });

      return tx;
    } catch (error) {
      console.error("Error in sellToken:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to sell token: ${error.message}`);
      }
      throw new Error("An unknown error occurred while selling token");
    }
  };

  // Helper function để lấy trạng thái giao dịch
  const getTransactionStatus = () => {
    if (isLoading) return "PROCESSING";
    if (isSuccess) return "SUCCESS";
    if (isError) return "ERROR";
    return "IDLE";
  };

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    sellToken,
    transactionHash: data,
    status: getTransactionStatus(),
  };
};

export default useSellToken;
