import React, { useEffect, useMemo, useState } from "react";
import ModalConnectWebApp from "../ModalConnectWebApp";
import { useTranslation } from "react-i18next";
import { useAccount, useSwitchChain } from "wagmi";
import useTokenBalance from "@/hooks/useTokenBalance";
import useBuyToken from "@/hooks/useBuyToken";
import useApprovalToken from "@/hooks/useApproveToken";
import { useParams } from "next/navigation";
import useSellToken from "@/hooks/useSellToken";
import { targetChainId } from "@/config";
import { CircularProgress } from "@mui/material";
import BigNumber from "bignumber.js";
import { Address, parseUnits, zeroAddress } from "viem";
import Web3Login from "../Web3Login";
import { GET_POOL_TRADE } from "@/apollo/queries/poolQuery";
import { useQuery } from "@apollo/client";
import {
  calculateTimeDifference,
  formatEstOutput,
  formatNumber,
} from "@/utils";
import SlippageModal from "../Modal/SlippageModal";
import { useGetAmountOut } from "@/hooks/useGetAmountOut";
import { getContractsByChainId } from "@/config/smartcontract/contractAddress";

const BuySellComponent: React.FC = ({}) => {
  const [activeTab, setActiveTab] = useState<"Buy" | "Sell">("Buy");
  const [inputAmount, setInputAmount] = useState<number>(0);

  const [displayAmount, setDisplayAmount] = useState<string>("0");

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [estimatedOutput, setEstimatedOutput] = useState("0");

  const [slippage, setSlippage] = useState(0.5);

  const [openModalSlippage, setOpenModalSlippage] = useState<boolean>(false);

  const params = useParams();
  const addressToken = params.addressToken;
  const [openModalConnect, setModalOpenConnect] = useState(false);

  const { t } = useTranslation("common");

  const { address, isConnected, isConnecting, chainId } = useAccount();
  const { switchChain, isSuccess: swithSuccess } = useSwitchChain();

  // get data pool trade

  const {
    loading,
    error: errorPool,
    data: dataPool,
  } = useQuery(GET_POOL_TRADE, {
    variables: {
      id: addressToken,
    },
  });

  const { balance, balanceFormated, refetchBalance, decimals, symbol } =
    useTokenBalance(getContractsByChainId(chainId).AtheneToken);

  const {
    balance: balanceMeme,
    balanceFormated: balanceFormatedMeme,
    refetchBalance: refetchBalanceMeme,
    decimals: decimalsMeme,
    symbol: symbolMeme,
  } = useTokenBalance(addressToken);

  const symbolDisplay = useMemo(() => {
    if (!symbol || !symbolMeme) return "";
    return activeTab === "Buy" ? symbol : symbolMeme;
  }, [symbol, symbolMeme, activeTab]);

  const {
    isLoading: isLoadingApprove,
    allowance,
    isSuccess: approveSuccess,
    approve,
    error: approveError,
    isError: isApproveError,
    refetch: refetchAllowance, // Thêm refetch function nếu có
  } = useApprovalToken(
    getContractsByChainId(chainId).AtheneToken,
    getContractsByChainId(chainId).AtheneFacet
  );

  const {
    isLoading: isLoadingApproveMeme,
    allowance: allowanceMeme,
    isSuccess: approveSuccessMeme,
    approve: approveMeme,
    error: approveErrorMeme,
    isError: isApproveErrorMeme,
    refetch: refetchAllowanceMeme,
  } = useApprovalToken(
    addressToken,
    getContractsByChainId(chainId).AtheneFacet
  );

  const { isLoading, isSuccess, isError, error, buyToken } = useBuyToken(
    getContractsByChainId(chainId).AtheneFacet,
    decimals
  );

  const {
    isLoading: isLoadingSell,
    isSuccess: isSuccessSell,
    isError: isErrorSell,
    error: errorSell,
    sellToken,
  } = useSellToken(
    getContractsByChainId(chainId).AtheneFacet || "",
    decimalsMeme
  );

  const { data: dataAmountOut, isLoading: isLoadingAmountOut } =
    useGetAmountOut({
      token: addressToken as `0x${string}`,
      amountIn: Number(inputAmount),
      isBuy: activeTab === "Buy",
      contractAddress: getContractsByChainId(chainId).AtheneFacet,
      slippage: slippage, // 1% slippage
      decimals,
    });

  const allowanceUseToTrade = useMemo(() => {
    if (activeTab === "Buy") return allowance;
    return allowanceMeme;
  }, [activeTab, allowance, allowanceMeme, approveSuccess, approveSuccessMeme]);

  const apporoveToTrade = useMemo(() => {
    if (activeTab === "Buy") return approve;
    return approveMeme;
  }, [activeTab, approve, approveMeme]);

  const balanceUseToTrade = useMemo(() => {
    if (activeTab === "Buy") return balanceFormated;
    return balanceFormatedMeme;
  }, [
    activeTab,
    balanceFormated,
    balanceFormatedMeme,
    isSuccessSell,
    isSuccess,
    isRefreshing,
  ]);

  const symbolOutput = useMemo(() => {
    if (!symbol || !symbolMeme) return "";
    return activeTab === "Buy" ? symbolMeme : symbol;
  }, [symbol, symbolMeme, activeTab, slippage]);

  const handlePercentageClick = (percentage: number) => {
    const calculatedAmount = (Number(balanceUseToTrade) * percentage) / 100;
    setInputAmount(calculatedAmount);
    setDisplayAmount(calculatedAmount.toLocaleString("en-US"));
  };
  // function handle approve
  const handleApprove = async (amount: string, decimalsToUse: number) => {
    try {
      setIsRefreshing(true);
      await apporoveToTrade(amount, decimalsToUse);

      // wait transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Refetch allowance
      if (activeTab === "Buy") {
        await refetchAllowance?.();
      } else {
        await refetchAllowanceMeme?.();
      }
    } catch (error) {
      console.error("Approve error:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // function refresh
  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetchBalanceMeme(), refetchBalance()]);
    } catch (error) {
      console.error("Refresh error:", error);
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (isSuccess || isSuccessSell) refreshData();
  }, [isSuccess, isSuccessSell]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && !isLoadingSell) {
        refreshData();
      }
    }, 20000); // Refresh every 20s

    return () => clearInterval(interval);
  }, [isLoading, isLoadingSell]);

  useEffect(() => {
    const checkApprovalSuccess = async () => {
      if (approveSuccess || approveSuccessMeme) {
        // Đợi một chút để transaction được confirm
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Refetch allowance
        if (activeTab === "Buy") {
          await refetchAllowance?.();
        } else {
          await refetchAllowanceMeme?.();
        }
      }
    };

    checkApprovalSuccess();
  }, [approveSuccess, approveSuccessMeme, activeTab]);

  // Thêm hàm để parse chuỗi đã format về số
  const parseFormattedNumber = (value: string): number => {
    // Loại bỏ tất cả dấu phẩy và khoảng trắng
    return Number(value.replace(/[,\s]/g, "")) || 0;
  };

  // Sửa lại hàm handleInputChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Chỉ cho phép nhập số và dấu phẩy
    if (!/^[\d,]*$/.test(value) && value !== "") {
      return;
    }

    // Chuyển đổi giá trị nhập vào thành số (loại bỏ dấu phẩy)
    const numericValue = parseFormattedNumber(value);

    // Cập nhật giá trị thực (number) cho các tính toán
    setInputAmount(numericValue);

    // Cập nhật giá trị hiển thị (string đã format)
    if (value === "") {
      setDisplayAmount("");
    } else {
      // Format số với dấu phẩy
      setDisplayAmount(numericValue.toLocaleString("en-US"));
    }
  };

  const renderButton = () => {
    const isWrongNetwork = chainId !== targetChainId;
    if (!isConnected)
      return (
        <div
          className="w-[100%] mx-auto 
    bg-gradient-orange !text-black hover:opacity-90
    p-3 rounded-lg text-center my-2
    "
        >
          <Web3Login />
        </div>
      );
    // check network
    if (isWrongNetwork)
      return (
        <button
          className="btn_deposit"
          onClick={() => {
            switchChain({ chainId: targetChainId });
          }}
        >
          {t("switch_network")}
        </button>
      );

    if (isConnecting)
      return (
        <button
          disabled
          className="w-full mt-4 bg-orange-500 text-black py-2 rounded-lg font-bold"
        >
          <CircularProgress
            color="inherit"
            style={{ width: "15px", height: "15px", marginRight: "5px" }}
          />
          {t("loading")}...
        </button>
      );

    // check balance
    if (new BigNumber(balanceUseToTrade).lt(inputAmount ?? "0"))
      return (
        <button
          disabled
          className="bg-gradient-to-r 
                 from-[#AF46FF] 
                  to-[#2E0BF1]
                  rounded-md
                  font-semibold
                  transition-shadow
                  duration-300 w-full my-1
                  text-white cursor-pointer py-[10px] px-2"
        >
          {t("insufficient_balance")}
        </button>
      );

    // Thêm loading states
    if (isLoading || isLoadingSell) {
      return (
        <button
          disabled
          className="w-full mt-4 bg-gray-500 text-black py-2 rounded-lg font-bold flex items-center justify-center gap-2"
        >
          <CircularProgress size={20} />
          {t("processing_transaction")}...
        </button>
      );
    }

    // check approve if type token
    if (
      addressToken !== zeroAddress &&
      (new BigNumber(allowanceUseToTrade.toString()).lt(
        parseUnits(inputAmount.toString() ?? "0", decimals).toString()
      ) ||
        allowanceUseToTrade === BigInt(0))
    ) {
      return (
        <button
          disabled={+inputAmount <= 0 || addressToken === "" || isRefreshing}
          className="    bg-gradient-to-r 
                 from-[#AF46FF] 
                  to-[#2E0BF1]
                  rounded-md
                  font-semibold
                 
                  transition-shadow
                  duration-300
                   text-white cursor-pointer  py-[10px] px-2 w-full mt-2"
          onClick={() => handleApprove(inputAmount.toString(), decimals)}
        >
          {isLoadingApprove || isRefreshing || isLoadingApproveMeme ? (
            <CircularProgress size={20} />
          ) : (
            t("approve_token")
          )}
        </button>
      );
    }

    // Sửa lại nút Buy
    if (activeTab === "Buy") {
      return (
        <button
          className="    bg-gradient-to-r 
                 from-[#AF46FF] 
                  to-[#2E0BF1]
                  rounded-md
                  font-semibold
                  
                  transition-shadow
                  duration-300
                   text-white cursor-pointer  py-[10px] px-2 w-full mt-2"
          disabled={+inputAmount <= 0 || isRefreshing || isLoading}
          onClick={async () => {
            try {
              setIsRefreshing(true);
              await buyToken({
                token: addressToken as any,
                amountIn: inputAmount.toString(),
                referrer: zeroAddress,
                minAmountOut: dataAmountOut?.minAmountOut,
                proof: [],
              });
              // const b = await refreshData();
            } catch (error) {
              console.error("Buy error:", error);
              setIsRefreshing(false);
            }
          }}
        >
          {isLoading || isRefreshing ? (
            <CircularProgress size={20} />
          ) : (
            t("buy")
          )}
        </button>
      );
    }

    // Sửa lại nút Sell tương tự
    return (
      <button
        className="    bg-gradient-to-r 
                  from-[#AF46FF] 
                  to-[#2E0BF1]
                  rounded-md
                  font-semibold
                  
                  transition-shadow
                  duration-300
                   text-white cursor-pointer  py-[10px] px-2 w-full mt-2"
        disabled={+inputAmount <= 0 || isRefreshing || isLoadingSell}
        onClick={async () => {
          try {
            setIsRefreshing(true);
            await sellToken({
              token: addressToken as any,
              amountIn: inputAmount.toString(),
              referrer: zeroAddress,
              minAmountOut: "0",
            });
            // await refreshData();
          } catch (error) {
            console.error("Sell error:", error);
            setIsRefreshing(false);
          }
        }}
      >
        {isLoadingSell || isRefreshing ? (
          <CircularProgress size={20} />
        ) : (
          t("Sell")
        )}
      </button>
    );
  };

  return (
    <div className="bg-[#252525] rounded-lg shadow-md">
      {/* Tabs */}
      <div className="flex text-white mb-4 relative h-12">
        <div className="flex w-full relative">
          {/* Container  button Buy */}
          <div
            className="w-1/2 relative"
            style={{
              width: activeTab === "Buy" ? "80%" : "60%",
              transition: "all 0.3s ease",
            }}
          >
            <button
              className="w-full h-full bg-white text-black text-xl font-semibold relative"
              onClick={() => setActiveTab("Buy")}
              style={{
                backgroundImage:
                  activeTab === "Buy"
                    ? "url('/images/icons/btn-sell-buy.png')"
                    : undefined,
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
                borderRadius: "12px 0 0 0",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span>{t("buy")}</span>
              </div>
            </button>
          </div>

          {/* Container  button Sell */}
          <div
            className="w-1/2 relative"
            style={{
              width: activeTab === "Sell" ? "80%" : "60%",
              transition: "all 0.3s ease",
            }}
          >
            <button
              className="w-full h-full bg-white text-black text-xl font-semibold relative"
              onClick={() => setActiveTab("Sell")}
              style={{
                backgroundImage:
                  activeTab === "Sell"
                    ? "url('/images/icons/btn-buy-sell.png')"
                    : undefined,
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
                borderRadius: "0 12px 0 0",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span>{t("Sell")}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 mb-4">
        {/* Slippage */}
        <div className="flex items-end justify-end">
          <div
            className="max-w-[178px] mb-4 bg-transparent
         text-white border border-[#999999]
         text-center font-normal cursor-pointer
          py-1 px-4 rounded-lg hover:bg-gray-700"
            onClick={() => setOpenModalSlippage(true)}
          >
            {t("slippage")}: {slippage}
            {"%"}
          </div>
        </div>

        {/* Balance */}
        <div className="text-gray-300 text-sm mb-2 flex justify-between items-center">
          {t("balance")}
          <span>
            {formatNumber(balanceUseToTrade)} {symbolDisplay}
          </span>
        </div>
        <div className="flex items-center bg-black p-2 rounded-lg border border-gray-700 text-white">
          <input
            type="text"
            value={displayAmount}
            onChange={handleInputChange}
            className="bg-transparent flex-grow text-white text-lg outline-none"
            placeholder="0"
          />
          <span className="ml-2 text-gray-400">{symbolDisplay}</span>
        </div>

        {/* Percentage Buttons */}
        <div className="flex justify-start items-center gap-2 mt-4">
          <button
            className=" text-white py-1"
            onClick={() => handlePercentageClick(0)}
          >
            {t("reset")}
          </button>
          {[25, 50, 75, 100].map((percentage) => (
            <button
              key={percentage}
              className="bg-transparent text-white border border-[#999999] py-1 px-4 rounded-lg hover:bg-gray-700"
              onClick={() => handlePercentageClick(percentage)}
            >
              {percentage}%
            </button>
          ))}
        </div>

        {/* Transaction Details */}
        <div className="text-gray-400 text-sm mt-4">
          <p>
            {t("est_output")}:{" "}
            {isLoadingAmountOut ? (
              <CircularProgress size={15} />
            ) : (
              <span className="text-white">
                {formatEstOutput(dataAmountOut?.minAmountOut, decimals) || 0}{" "}
                {symbolOutput}
              </span>
            )}
          </p>
          <p>
            {t("buy_tax")}:{" "}
            <span className="text-white">
              {dataPool?.pool?.buyFeeRate || 0}%{" "}
            </span>
          </p>
          <p>
            {t("delay_between_buy")}:{" "}
            <span className="text-white">{dataPool?.pool?.delayBuyTime}s</span>
          </p>
        </div>

        {/* Submit Button */}
        {/* <button
          className="w-full mt-4 bg-orange-500 text-black py-2 rounded-lg font-bold"
        >
          {actionButton}
        </button> */}
        <div className="cursor-pointer">{renderButton()}</div>
      </div>
      <ModalConnectWebApp
        isOpen={openModalConnect}
        onCloseModal={() => setModalOpenConnect(false)}
      />

      <SlippageModal
        open={openModalSlippage}
        onClose={() => setOpenModalSlippage(false)}
        onSave={setSlippage}
        defaultSlippage={slippage}
        t={t}
      />
    </div>
  );
};

export default BuySellComponent;
