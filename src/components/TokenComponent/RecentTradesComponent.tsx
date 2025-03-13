"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "../Common/Pagination";
import Image from "next/image";
import client from "@/apollo/apolloClient";
import { GET_MY_TRADES, GET_RECENT_TRADES } from "@/apollo/queries/tradesQuery";
import { parseHashesFromQuery } from "@/utils";
import { useAccount } from "wagmi";
interface Trade {
  time: string;
  type: "Buy" | "Sell";
  amountIn: string;
  amountOut: string;
  price: string;
  user: string;
  txn: string;
}

interface RecentTradesComponentProps {
  tokenSymbolIn: string;
  tokenSymbolOut: string;
  itemsPerPage?: number;
  poolAddress: string;
}

const RecentTradesComponent: React.FC<RecentTradesComponentProps> = ({
  tokenSymbolIn = "W2M",
  tokenSymbolOut = "PEPE",
  itemsPerPage = 20,
  poolAddress,
}) => {
  const { address } = useAccount();
  const [dataMyTrades, setDataMyTrades] = useState<Trade[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Tối ưu fetch data với useCallback
  const fetchData = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    try {
      const { data } = await client.query({
        query: GET_RECENT_TRADES,
        variables: {
          first: 100,
          orderDirection: "desc",
          orderBy: "timestamp",
          pool: poolAddress,
        },
        fetchPolicy: "network-only", // Đảm bảo luôn lấy data mới nhất
      });
      const dataTemp = parseHashesFromQuery(data?.trades || []);
      setDataMyTrades(dataTemp || []);
    } catch (error) {
      console.error("Error fetching trades:", error);
    } finally {
      setIsLoading(false);
    }
  }, [address, poolAddress]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Tính toán số trang
  const totalPages = useMemo(
    () => Math.ceil(dataMyTrades.length / itemsPerPage),
    [dataMyTrades.length, itemsPerPage]
  );

  // Lấy data cho trang hiện tại
  const currentData = useMemo(
    () =>
      dataMyTrades.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [dataMyTrades, currentPage, itemsPerPage]
  );

  // Render loading state
  if (isLoading && dataMyTrades.length === 0) {
    return (
      <div className="w-full text-center py-8 text-white">
        Loading trades...
      </div>
    );
  }

  // Render empty state
  if (!isLoading && dataMyTrades.length === 0) {
    return (
      <div className="w-full text-center py-8 text-white">No trades found</div>
    );
  }

  const handleTxnClick = (txn: string) => {
    window.open(txn, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="shadow-md overflow-x-auto">
      <table className="w-full text-sm text-left text-white">
        <thead className="text-xs uppercase bg-[#C76033] text-white font-bold sticky top-0">
          <tr>
            <th className="py-3 px-6">Time</th>
            <th className="py-3 px-6">Type</th>
            <th className="py-3 px-6">{tokenSymbolIn}</th>
            <th className="py-3 px-6">{tokenSymbolOut}</th>
            <th className="py-3 px-6 md:table-cell hidden">Price</th>
            <th className="py-3 px-6 md:table-cell hidden">User</th>
            <th className="py-3 px-6">TXN</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((trade, index) => (
            <tr
              key={`${trade.txn}-${index}`}
              className={`hover:bg-gray-700 text-white font-normal transition-colors
                ${index % 2 === 1 ? "bg-bgTd" : ""}
              `}
            >
              <td className="py-3 px-6">{trade.time}</td>
              <td
                className={`py-3 px-6 ${
                  trade.type === "Buy" ? "text-green-500" : "text-red-500"
                }`}
              >
                {trade.type}
              </td>
              <td className="py-3 px-6">{trade.amountIn}</td>
              <td className="py-3 px-6">{trade.amountOut}</td>
              <td className="py-3 px-6 md:table-cell hidden">{trade.price}</td>
              <td className="py-3 px-6 md:table-cell hidden">{trade.user}</td>
              <td className="py-3 px-6">
                <button
                  onClick={() => handleTxnClick(trade.txn)}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/images/icons/icon-txn.svg"
                    alt="Etherscan"
                    width={24}
                    height={24}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default RecentTradesComponent;
