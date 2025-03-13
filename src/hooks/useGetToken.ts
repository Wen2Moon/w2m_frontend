import requestHttp from "@/api/config";
import { useQuery } from "@tanstack/react-query";

const useGetToken = (network: number | undefined) => {
  return useQuery({
    queryKey: [network],
    queryFn: async () => {
      const res = await requestHttp({
        method: "get",
        url: `/token?network=0x${network?.toString(16)}`,
      });
      if (res.data.code !== "OK") return null;
      return res.data.data as any;
    },
    enabled: !!network,
    
  });
};

export default useGetToken;