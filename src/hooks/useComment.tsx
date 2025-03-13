import requestHttp from "@/api/config";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface CommentListParams {
  page?: number;
  limit?: number;
}

interface PostCommentParams {
  content: string;
}

interface Comment {
  id: string;
  content: string;
  // Thêm các field khác tùy vào response API của bạn
}

const useComment = (poolAddress: string | undefined) => {
  const queryClient = useQueryClient();

  // Hàm helper để lấy token
  const getAuthToken = () => {
    const token = localStorage.getItem("access_token");
    return token ? `Bearer ${token}` : "";
  };

  // Get comments list
  const useGetComments = (params?: CommentListParams) => {
    return useQuery({
      queryKey: ["comments", poolAddress, params?.page, params?.limit],
      queryFn: async () => {
        if (!poolAddress) throw new Error("Pool address is required");

        const res = await requestHttp({
          method: "get",
          url: `/comments/pool/${poolAddress}?page=${params?.page || 1}&limit=${
            params?.limit || 5
          }`,
        });
        if (res.status !== 200) throw new Error(res.data.message);
        return res.data.comments as Comment[];
      },
      enabled: !!poolAddress,
    });
  };

  // Post comment mutation
  const postComment = useMutation({
    mutationFn: async (params: PostCommentParams) => {
      if (!poolAddress) throw new Error("Pool address is required");

      const token = getAuthToken();
      if (!token) throw new Error("Authentication required");

      const res = await requestHttp({
        method: "post",
        url: `/comments/pool/${poolAddress}`,
        data: {
          content: params.content,
        },
        headers: {
          Authorization: token,
        },
      });

      if (res.status !== 201) throw new Error(res.data.message);
      return res.data.data;
    },
    onSuccess: () => {
      // Invalidate và refetch comments cho pool address hiện tại
      queryClient.invalidateQueries({
        queryKey: ["comments", poolAddress],
      });
    },
  });

  return {
    useGetComments,
    postComment,
  };
};

export default useComment;
