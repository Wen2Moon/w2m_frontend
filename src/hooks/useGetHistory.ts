import requestHttp from "@/api/config";
import { useQuery } from "@tanstack/react-query";

export interface IHistory {
    userWallet: string;
    symbol: string;
    tokenAddress: string;
    amount: number
    email : string;
    createdAt: number;
    isCalledHookSuccess: string;
    txHash: string;
    logo: string;
}

const useGetHistory = (address: string | undefined, network: number | undefined, page: number) => {
  return useQuery({
    queryKey: [address, page],
    queryFn: async () => {
      const res = await requestHttp({
        method: "get",
        url: `/deposit-history?network=0x${network?.toString(16)}&wallet=${address}&pageSize=10&page=${page}`,
      });
      if (res.data.code !== "OK") return null;
      return res.data.data as any;
    },
    enabled: !!address,
    
  });
};

export default useGetHistory;