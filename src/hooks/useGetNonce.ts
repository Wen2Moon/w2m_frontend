import requestHttp from "@/api/config";
import { useQuery } from "@tanstack/react-query";

const useGetToken = (nonce: any | undefined) => {
  return useQuery({
    queryKey: [nonce],
    queryFn: async () => {
      const res = await requestHttp({
        method: "get",
        url: `/auth/get-nonce?user=${nonce}`,
      });
      if (res.data.code !== "OK") return null;
      return res.data.data as any;
    },
    enabled: !!nonce,
    
  });
};

export default useGetToken;