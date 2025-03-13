"use client";
import client from "@/apollo/apolloClient";
import { GET_POOL_DETAIL } from "@/apollo/queries/poolQuery";
import TokenCardComponent from "@/components/HomeComponent/TokenCardComponent";
import BuySellComponent from "@/components/TokenComponent/BuySellComponent";
import ChartComponent from "@/components/TokenComponent/ChartComponent";
import HoldersComponent from "@/components/TokenComponent/HoldersComponent";
import MainTabSwitcher from "@/components/TokenComponent/MainTabSwitcher";
import { formatNumber, parseTokensFromQuery, shortenAddress } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [token, setToken] = useState<any>(null);

  const params = useParams();
  const addressToken = params.addressToken;

  const fetchPoolsProfiles = async (variables: any) => {
    try {
      const { data } = await client.query({
        query: GET_POOL_DETAIL,
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
      if (addressToken) {
        const variables = {
          id: addressToken,
        };
        const data = await fetchPoolsProfiles(variables);
        if (data) {
          const parsedTokens = parseTokensFromQuery([data.pool]);
          setToken(parsedTokens[0]);
        }
      }
    };
    fetchData();
  }, [addressToken]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="col-span-2">
        <div className="space-y-4">
          <ChartComponent
            poolAddress={addressToken as string}
            tokenName={`ATH/${token?.symbol}`}
            marketCap={formatNumber(token?.marketCap) as string}
            owner={shortenAddress(token?.owner)}
            baseTokenPrice={token?.baseTokenPrice}
            createdAt={Number(token?.startTime)}
          />
          <MainTabSwitcher />
        </div>
      </div>
      {/* Right Section */}
      <div className="space-y-4">
        <BuySellComponent />
        <TokenCardComponent {...(token as any)} />
        <HoldersComponent />
      </div>
    </div>
  );
};

export default MainPage;
