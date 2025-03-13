"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChartComponent, { timeframeOptions } from "@/components/Chart";
import client from "@/apollo/apolloClient";
import {
  GET_PRICE_CHART_15_MINUTE,
  GET_PRICE_CHART_4_HOUR,
  GET_PRICE_CHART_DAYS,
  GET_PRICE_CHART_ONE_HOUR,
  GET_PRICE_CHART_ONE_MINUTE,
} from "@/apollo/queries/getPriceChartQuery";
import { useTranslation } from "react-i18next";

interface ChartDataItem {
  time: number;
  open_price: string;
  close_price: string;
}

interface ConvertedDataItem {
  time: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

interface IChartProps {
  poolAddress: string;
  tokenName?: string;
  marketCap?: string;
  owner?: string;
  baseTokenPrice: string;
  createdAt: number;
}

const Chart: React.FC<IChartProps> = ({
  poolAddress,
  tokenName = "PEPE/ETH",
  marketCap = "$64.339",
  owner = "8x213f...098d2x",
  baseTokenPrice,
  createdAt,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState("1m");
  const [convertedData, setConvertedData] = useState<ConvertedDataItem[]>([]);

  const { t } = useTranslation();

  // Định nghĩa thứ tự các timeframe từ nhỏ đến lớn
  const timeframeOrder = ["1m", "15m", "1h", "4h", "1D"];
  // Định nghĩa các timeframe tabs
  const timeframeTabs = [
    { key: "1m", label: "1m" },
    { key: "15m", label: "15m" },
    { key: "1h", label: "1h" },
    { key: "4h", label: "4h" },
    { key: "1D", label: "1D" },
  ];

  const timeframeQueries = {
    "1m": {
      query: GET_PRICE_CHART_ONE_MINUTE,
      dataKey: "poolOneMinuteDatas",
    },
    "15m": {
      query: GET_PRICE_CHART_15_MINUTE,
      dataKey: "poolThirteenMinuteDatas",
    },
    "1h": {
      query: GET_PRICE_CHART_ONE_HOUR,
      dataKey: "poolHourDatas",
    },
    "4h": {
      query: GET_PRICE_CHART_4_HOUR,
      dataKey: "poolFourHourDatas",
    },
    "1D": {
      query: GET_PRICE_CHART_DAYS,
      dataKey: "poolDayDatas",
    },
  };
  const fetchData = useCallback(
    async (timeframe: string = activeTimeframe) => {
      if (!poolAddress) return;
      setIsLoading(true);

      try {
        const selectedTimeframe =
          timeframeQueries[timeframe as keyof typeof timeframeQueries];

        const { data } = await client.query({
          query: selectedTimeframe.query,
          variables: {
            first: 100,
            pool: poolAddress,
          },
          fetchPolicy: "network-only",
        });

        const dataTemp = data[selectedTimeframe.dataKey].map((item: any) => ({
          time:
            timeframe === "1D"
              ? item.date // daily data
              : timeframe === "1h" || timeframe === "4h"
              ? item.hourStartUnix //  hourly data
              : item.minuteStartUnix, //  minute data
          open: parseFloat(item.open),
          close: parseFloat(item.close),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
        }));
        if (dataTemp.length === 0) {
          const dataDefault = {
            time: createdAt,
            open: Number(baseTokenPrice),
            close: Number(baseTokenPrice),
            high: Number(baseTokenPrice),
            low: Number(baseTokenPrice),
          };
          setConvertedData([dataDefault]);
          return;
        }
        setConvertedData(dataTemp);
      } catch (error) {
        console.error(`Error fetching ${timeframe} trades:`, error);
      } finally {
        setIsLoading(false);
      }
    },
    [poolAddress, baseTokenPrice, createdAt]
  );

  useEffect(() => {
    fetchData(activeTimeframe);
    let interval: NodeJS.Timeout | null = null;
    if (activeTimeframe === "1m") {
      interval = setInterval(() => fetchData("1m"), 20000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [fetchData, activeTimeframe]);

  const handleTimeframeChange = (timeframe: string) => {
    setActiveTimeframe(timeframe);
    fetchData(timeframe);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto bg-[#252525] rounded-xl overflow-hidden">
      {/* Header Section */}
      <div className="px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-white text-lg font-medium">{tokenName}</span>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400">{t("market_cap")}:</span>
              <span className="text-white">{marketCap}</span>
              <div className="relative group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="absolute bottom-full left-1/2 top-full transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                  Market capitalization
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400">{t("owner")}:</span>
              <span className="text-white">{owner}</span>
            </div>
          </div>

          {/* Timeframe Tabs */}
          <div className="flex space-x-1 bg-[#242424] rounded-md p-1">
            {timeframeTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTimeframeChange(tab.key)}
                className={`px-3 py-1 rounded-md transition-colors duration-200 text-sm font-medium
                  ${
                    activeTimeframe === tab.key
                      ? `bg-gradient-to-r 
                      from-[#FFB778] 
                      to-[#F1760B] 
                       text-white`
                      : "text-white hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[542px] relative px-1 py-3">
        {/* {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A] bg-opacity-50 z-10">
            <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
          </div>
        )} */}
        <ChartComponent
          data={convertedData}
          timeWindow={timeframeOptions.HOUR}
          symbol={tokenName}
        />
      </div>
    </div>
  );
};

export default React.memo(Chart);
