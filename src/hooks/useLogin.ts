import requestHttp from "@/api/config";
import { useQuery } from "@tanstack/react-query";

const useGetToken = (bodyParams: { address: string; signature: string; nonce: string } | undefined) => {
  return useQuery({
    queryKey: [bodyParams],
    queryFn: async () => {
      const res = await requestHttp({
        method: "post",
        url: `/auth/login`,
        data: {...bodyParams},
      });
      if (res.data.code !== "OK") return null;
      return res.data.data as any;
    },
    enabled: !!bodyParams,
    
  });
};

export default useGetToken;