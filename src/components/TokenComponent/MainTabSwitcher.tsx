import React, { useEffect, useState } from "react";
import CommentsComponent from "./CommentsComponent";
import RecentTradesComponent from "./RecentTradesComponent";
import TabsComponent from "./TabsComponent";
import { parseCommentFromQuery } from "@/utils";
import { useAccount } from "wagmi";
import MyTradesComponent from "./MyTradesComponent";
import useComment from "@/hooks/useComment";
import { useParams } from "next/navigation";
import useTokenBalance from "@/hooks/useTokenBalance";
import { getContractsByChainId } from "@/config/smartcontract/contractAddress";
import { useTranslation } from "react-i18next";

const MainTabSwitcher = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("Comments");

  const params = useParams();
  const { addressToken } = params;

  const { chainId } = useAccount();

  const { balance, balanceFormated, refetchBalance, decimals, symbol } =
    useTokenBalance(getContractsByChainId(chainId).AtheneToken || "");

  const {
    balance: balanceMeme,
    balanceFormated: balanceFormatedMeme,
    refetchBalance: refetchBalanceMeme,
    decimals: decimalsMeme,
    symbol: symbolMeme,
  } = useTokenBalance(addressToken);
  const [dataComments, setDataComments] = useState<any[]>([]);
  const { useGetComments, postComment } = useComment(addressToken as string);

  const {
    data: comments,
    isLoading,
    error: commentsError,
    isFetching,
    refetch: refetchComments, // Thêm refetch vào đây
  } = useGetComments({
    page: 1,
    limit: 50,
  });

  useEffect(() => {
    if (comments) {
      const dataTemp = parseCommentFromQuery(comments);
      setDataComments(dataTemp);
    }
  }, [comments, isFetching]);

  // Xử lý post comment
  const handlePostComment = async (content: string) => {
    try {
      await postComment.mutateAsync({ content });
      // Refetch comments sau khi post thành công
      await refetchComments();
    } catch (error) {
      // Handle error - hiển thị thông báo lỗi
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="bg-[#252525] rounded-xl p-3 shadow-md">
      <TabsComponent
        tabs={[
          {
            name: "Comments",
            label: t("comments"),
            icon: "/images/icons/comment.svg",
            activeIcon: "/images/icons/comment-active.svg",
          },
          {
            name: "Recent trades",
            icon: "/images/icons/recent.svg",
            label: t("recent_trades"),
            activeIcon: "/images/icons/recent-active.svg",
          },
          {
            name: "My trades",
            icon: "/images/icons/my-trade.svg",
            label: t("my_trades"),
            activeIcon: "/images/icons/my-trade-active.svg",
          },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === "Comments" && (
        <CommentsComponent
          comments={dataComments}
          itemsPerPage={5}
          handlePostComment={handlePostComment}
          t={t}
        />
      )}
      {activeTab === "Recent trades" && (
        <RecentTradesComponent
          itemsPerPage={13}
          tokenSymbolIn={symbol}
          tokenSymbolOut={symbolMeme}
          poolAddress={addressToken as string}
        />
      )}
      {activeTab === "My trades" && (
        <MyTradesComponent
          itemsPerPage={13}
          tokenSymbolIn={symbol}
          tokenSymbolOut={symbolMeme}
          poolAddress={addressToken as string}
        />
      )}
    </div>
  );
};

export default MainTabSwitcher;
