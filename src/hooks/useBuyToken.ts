import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { AbiMeme } from "@/config/smartcontract/meme.abi";
import { Address, parseUnits } from "viem";

export interface InputBuyToken {
  token: Address;
  referrer: Address;
  amountIn: string | number; // Thay đổi type để linh hoạt hơn
  minAmountOut: any;
  proof: Address[];
}

const useBuyToken = (contractAddress: any, decimals: number) => {
  const { writeContract, data, isError, error } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  });

  const buyToken = async (input: InputBuyToken) => {
    try {
      const { token, referrer, amountIn, minAmountOut, proof } = input;

      // Kiểm tra địa chỉ contract
      if (!contractAddress) {
        throw new Error("Contract address is required");
      }

      const parsedAmountIn = parseUnits(
        amountIn.toString(),
        decimals 
      );


      // Log để debug
      console.log("Parsed values:", {
        parsedAmountIn: parsedAmountIn.toString(),
        parsedMinAmountOut: minAmountOut,
      });

      // Gọi contract
      const tx = await writeContract({
        address: contractAddress,
        abi: AbiMeme,
        functionName: "buy",
        args: [
          token,
          referrer,
          parsedAmountIn,
          minAmountOut,
          proof,
        ],
      });

      return tx;
    } catch (error) {
      console.error("Error in buyToken:", error);
      // Xử lý các loại lỗi cụ thể
      if (error instanceof Error) {
        throw new Error(`Failed to buy token: ${error.message}`);
      }
      throw new Error("An unknown error occurred while buying token");
    }
  };

  // Thêm một số helper functions
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
    buyToken,
    transactionHash: data,
    status: getTransactionStatus(),
  };
};

export default useBuyToken;
