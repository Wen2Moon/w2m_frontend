import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { AbiMeme } from "@/config/smartcontract/meme.abi";
import { Address } from "viem";

export interface InputCreateToken {
  name: string; // Tên token, ví dụ: "Doge token"
  symbol: string; // Ký hiệu token, ví dụ: "DOGE"
  poolDetails: string; // Mô tả pool
  configIndex: any; // Chỉ số cấu hình
  router: any; // Địa chỉ router
  startTime: any; // Thời gian bắt đầu (timestamp)
  buyFeeRate: any; // Phí mua
  sellFeeRate: any; // Phí bán
  maxBuyAmount: any; // Số lượng mua tối đa
  delayBuyTime: any; // Thời gian trễ để mua
  merkleRoot: any; // Merkle Root (hash)
  initialBuyAmount: any; // Số lượng mua ban đầu
}

const useCreateToken = (contractAddress: string) => {
  const { writeContract, data, isError, error } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  });

  const createToken = (input: InputCreateToken) => {
    const {
      name,
      symbol,
      configIndex,
      router,
      poolDetails,
      startTime,
      buyFeeRate,
      sellFeeRate,
      maxBuyAmount,
      delayBuyTime,
      merkleRoot,
      initialBuyAmount,
    } = input;

    writeContract({
      address: contractAddress as Address,
      abi: AbiMeme,
      functionName: "createPool",
      args: [
        {
          name,
          symbol,
          poolDetails,
          configIndex,
          router,
          startTime,
          buyFeeRate,
          sellFeeRate,
          maxBuyAmount,
          delayBuyTime,
          merkleRoot,
          initialBuyAmount,
        },
      ],
    });
  };

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    createToken,
  };
};

export default useCreateToken;
