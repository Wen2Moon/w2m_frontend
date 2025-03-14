import { useContractRead } from 'wagmi'
import { Address, parseEther, parseUnits } from 'viem'
import { AbiMeme } from '@/config/smartcontract/meme.abi'

interface GetAmountOutParams {
  token: Address | any
  amountIn: any
  isBuy: boolean
  contractAddress: Address | any
  slippage?: number // thêm slippage để tính minAmountOut, mặc định là 0.5%
  enabled?: boolean
  decimals: number
}

interface GetAmountOutResult {
  amountOut: any
  amountOutLessFee: any
  totalFee: any
  platformFee: any
  tradeFee: any
  minAmountOut: any // thêm minAmountOut đã được tính
  decimals: number
}

export function useGetAmountOut({
  token,
  amountIn,
  isBuy,
  contractAddress,
  slippage = 0.5, // 0.5%
  enabled = true,
  decimals = 9
}: GetAmountOutParams) {

  const parsedMinAmountOut = parseUnits(
    amountIn.toString(),
    decimals 
  );

  const { data, isError, isLoading, ...rest } = useContractRead({
    address: contractAddress,
    abi: AbiMeme,
    functionName: 'getAmountOut',
    args: [token, parsedMinAmountOut, isBuy],
    enabled,
  })

  // Tính toán minAmountOut dựa trên amountOutLessFee và slippage
  const processedData: GetAmountOutResult | any = data
    ? {
        amountOut: data[0],
        amountOutLessFee: data[1],
        totalFee: data[2],
        platformFee: data[3],
        tradeFee: data[4],
        minAmountOut: data[1] ?parsedMinAmountOut : 0
      }
    : undefined

  return {
    data: processedData,
    isError,
    isLoading,
    ...rest
  }
}
