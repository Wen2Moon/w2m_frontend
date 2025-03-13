"use client";

import { Box } from "@mui/material";
import styles from "../styles/Home.module.css";
import { toast, ToastContainer } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import TickerComponent from "./TickerComponent";
import TrendingComponent from "./TrendingComponent";
import { useQuery } from "@apollo/client";
import {
  parseHashesFromQuery,
  parseHashesTrendingFromQuery,
  parseTokensFromQuery,
} from "@/utils";
import { GET_POOLS } from "@/apollo/queries/poolQuery";
import HeaderComponent from "./Header";
import Footer from "./Footer";
import { Trade } from "../../public/charting_library/charting_library";
import { GET_RECENT_ALL_TRADES } from "@/apollo/queries/tradesQuery";
import client from "@/apollo/apolloClient";

export interface PageLayoutProps {
  children: any;
}

const sevenDaysAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [dataTrades, setDataTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // State cho variables
  const variables = {
    first: 10,
    orderDirection: "asc",
    orderBy: "volumeBaseToken",
    createdAt_gte: sevenDaysAgo,
  };
  const { loading, error, data } = useQuery(GET_POOLS, {
    variables,
  });

  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const parsedTokens = parseTokensFromQuery(data.pools);
      setTokens(parsedTokens);
    }
  }, [data]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  //  fetch data with useCallback
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await client.query({
        query: GET_RECENT_ALL_TRADES,
        variables: {
          first: 20,
          orderDirection: "desc",
          orderBy: "timestamp",
        },
        fetchPolicy: "network-only", // Đảm bảo luôn lấy data mới nhất
      });
      const dataTemp = parseHashesTrendingFromQuery(data?.trades || []);
      setDataTrades(dataTemp || []);
    } catch (error) {
      console.error("Error fetching trades:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (!isClient) return <Loading />;

  return (
    <div className="">
      <div className={styles.mainWrapperBg}></div>
      <div className={styles.mainWrapper}>
        <div className="relative mb-[106px]">
          <HeaderComponent />
          {/* Fixed Ticker */}
          <div className="absolute top-[86px] left-0 right-0 z-50">
            <TickerComponent items={dataTrades} />
            <TrendingComponent
              tokens={tokens
                .map((token) => ({
                  name: token.name,
                  id: token.id,
                }))
                .slice(0, 9)}
            />
          </div>
        </div>
        <Box>{children}</Box>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Footer />
      </div>
    </div>
  );
};
export default PageLayout;
