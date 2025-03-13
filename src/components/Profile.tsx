"use client";

import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import GridComponent from "./HomeComponent/GridComponent";
import { GET_POOLS_PROFILES } from "@/apollo/queries/poolQuery";
import { parseTokensFromQuery } from "@/utils";
import { useAccount } from "wagmi";
import client from "@/apollo/apolloClient";
import { GET_TOKEN_OWNED } from "@/apollo/queries/tradesQuery";

const Profile: NextPage = () => {
  const { t, i18n } = useTranslation("common");
  const { language } = i18n;

  // Mock Data
  const [tokens, setTokens] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<"Owner" | "Created">("Owner");

  const account = useAccount();

  // Hàm gọi API
  const fetchPoolsProfiles = async (variables: any) => {
    try {
      const { data } = await client.query({
        query: GET_POOLS_PROFILES,
        variables,
      });
      return data;
    } catch (error) {
      console.error("Error fetching pools profiles:", error);
      return null;
    }
  };

  const fetchTokensOwned = async (variables: any) => {
    try {
      const { data } = await client.query({
        query: GET_TOKEN_OWNED,
        variables,
      });
      return data;
    } catch (error) {
      console.error("Error fetching pools profiles:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (account.address) {
        if (activeTab === "Created") {
          const variables = {
            first: 100,
            orderDirection: "desc",
            orderBy: "startTime",
            owner: account.address,
          };
          const data = await fetchPoolsProfiles(variables);
          if (data) {
            const parsedTokens = parseTokensFromQuery(data.pools);
            setTokens(parsedTokens);
          }
        } else {
          const variables = {
            first: 100,
            orderDirection: "desc",
            orderBy: "timestamp",
            account: account.address,
          };
          const data = await fetchTokensOwned(variables);
          if (data) {
            const seen = new Set();
            const uniquePools = data.trades
              .map((trade: any) => trade.pool)
              .filter((pool: any) => {
                if (!seen.has(pool.id)) {
                  seen.add(pool.id);
                  return true;
                }
                return false;
              });
            const parsedTokens = parseTokensFromQuery(uniquePools)
            setTokens(parsedTokens);
          }
        }
      }
    };
    fetchData();
  }, [account.address, activeTab]);

  return (
    <div className="min-h-screen">
      {/* <HeaderComponent /> */}

      <div className="container mx-auto py-8">
        {/* header */}
        <div className="flex justify-between items-center">
          <h1
            className="text-[64px] font-bold text-transparent bg-clip-text bg-gradient-orange mb-4
           text-center"
          >
            {t("Profile")}
          </h1>

          <div className="flex text-white mb-4 relative h-12 min-w-[540px]">
            <div className="flex w-full relative">
              {/* Container  button Buy */}
              <div
                className="w-1/2 relative"
                style={{
                  width: activeTab === "Owner" ? "80%" : "60%",
                  transition: "all 0.3s ease",
                }}
              >
                <button
                  className="w-full h-full bg-white text-black text-xl font-semibold relative"
                  onClick={() => setActiveTab("Owner")}
                  style={{
                    backgroundImage:
                      activeTab === "Owner"
                        ? "url('/images/icons/btn-sell-buy.png')"
                        : undefined,
                    backgroundPosition: "center",
                    backgroundSize: "100% 100%",
                    borderRadius: "12px 0 0 0",
                  }}
                >
                  <div className="absolute inset-0  flex items-center justify-center">
                    <span>Token owned</span>
                  </div>
                </button>
              </div>

              {/* Container  button Sell */}
              <div
                className="w-1/2 relative"
                style={{
                  width: activeTab === "Created" ? "80%" : "60%",
                  transition: "all 0.3s ease",
                }}
              >
                <button
                  className="w-full h-full bg-white text-black text-xl font-semibold relative"
                  onClick={() => setActiveTab("Created")}
                  style={{
                    backgroundImage:
                      activeTab === "Created"
                        ? "url('/images/icons/btn-buy-sell.png')"
                        : undefined,
                    backgroundPosition: "center",
                    backgroundSize: "100% 100%",
                    borderRadius: "0 12px 0 0",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span>Token created</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <GridComponent tokens={tokens} />
      </div>
    </div>
  );
};

export default Profile;
