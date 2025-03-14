"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { formatNumber } from "@/utils";
import InitialBuyField from "./Common/InitialBuyField";
import useCreateToken from "@/hooks/useMemeContract";
import axios from "axios";
import { getContractsByChainId } from "@/config/smartcontract/contractAddress";
import { useAccount } from "wagmi";
import { useTranslation } from "react-i18next";
import { targetChainId } from "@/config";
import useApprovalToken from "@/hooks/useApproveToken";
import { toast } from "react-toastify";
import Web3Login from "./Web3Login";
import BigNumber from "bignumber.js";
import { parseUnits } from "ethers";
import useTokenBalance from "@/hooks/useTokenBalance";
import { showToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
const PINATA_API_KEY = "5cc964bebb31cc4254eb";
const PINATA_API_SECRET =
  "cf98da7f27d48a6588360273bd09a1c4df7a21f71d20a47be2a4538bff589656";
const PINATA_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0YjdmMDcxNy0yNTgxLTQ4YTAtODQ2MC1lMjQ4ZGIyMDNmNWEiLCJlbWFpbCI6InNvbnRtLmFzZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNWNjOTY0YmViYjMxY2M0MjU0ZWIiLCJzY29wZWRLZXlTZWNyZXQiOiJjZjk4ZGE3ZjI3ZDQ4YTY1ODgzNjAyNzNiZDA5YTFjNGRmN2EyMWY3MWQyMGE0N2JlMmE0NTM4YmZmNTg5NjU2IiwiZXhwIjoxNzczNDc0MjYxfQ.QnOm7mCIe62TaUsoJWXGtffDfbydBp-NDv4lqu2MsL0";

const CreateTokenForm = () => {
  const uploadToPinata = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer ${PINATA_JWT}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error("Pinata upload failed:", error);
      return null;
    }
  };
  const { address, isConnected, isConnecting, chainId } = useAccount();

  const { t } = useTranslation();

  // Di chuyển validationSchema vào trong component
  const validationSchema = Yup.object({
    tokenName: Yup.string().required(t("token_name_required")),
    tokenSymbol: Yup.string().required(t("token_symbol_required")),
    // tokenImage: Yup.mixed().required(t("token_image_required")),
    description: Yup.string(),
    initialBuyAmount: Yup.string().required(t("initial_buy_amount_required")),
    buybackBuy: Yup.number()
      .required(t("buyback_buy_required"))
      .positive(t("value_must_be_positive")),
    buybackSell: Yup.number()
      .required(t("buyback_sell_required"))
      .positive(t("value_must_be_positive")),
    website: Yup.string().url(t("invalid_url")),
    telegram: Yup.string(),
    discord: Yup.string(),
    twitter: Yup.string(),
    facebook: Yup.string(),
  });

  const isWrongNetwork = chainId !== targetChainId;

  const { createToken, isLoading, isSuccess, isError, error } = useCreateToken(
    getContractsByChainId(chainId).AtheneFacet || ""
  );

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success(t("token_created_successfully"));
      const timer = setTimeout(() => {
        router.push("/");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isLoading]);

  const {
    isLoading: isLoadingApprove,
    allowance,
    isSuccess: approveSuccess,
    approve,
    error: approveError,
    isError: isApproveError,
    refetch: refetchAllowance,
  } = useApprovalToken(
    getContractsByChainId(chainId).AtheneToken,
    getContractsByChainId(chainId).AtheneFacet
  );

  const { balance, balanceFormated, refetchBalance, decimals, symbol } =
    useTokenBalance(getContractsByChainId(chainId).AtheneToken);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initialValues = {
    tokenName: "",
    tokenSymbol: "",
    description: "",
    tokenImage: "",
    settingInitialBuy: true,
    initialBuyAmount: 0,
    buybackSetting: true,
    buybackBuy: 0,
    buybackSell: 0,
    additionalInfo: false,
    website: "",
    telegram: "",
    discord: "",
    twitter: "",
    facebook: "",
  };

  const [submitting, setSubmitting] = useState(false);

  const [currentAmount, setCurrentAmount] = useState<string>("");

  const checkApproveToken = useMemo(() => {
    if (Number(currentAmount) > 0) {
      try {
        const requiredAmount = parseUnits(currentAmount, decimals).toString();
        const currentAllowance = new BigNumber(allowance.toString());

        return currentAllowance.lt(requiredAmount);
      } catch (error) {
        console.error("Error in checkApproveToken:", error);
        return false;
      }
    }
    return false;
  }, [currentAmount, allowance, decimals]);

  const handleAmountChange = (value: string) => {
    setCurrentAmount(value);
  };

  const handleSubmit = async (values: any) => {
    if (isWrongNetwork) {
      toast.error(t("wrong_network"));
      return;
    }

    setSubmitting(true);

    try {
      if (checkApproveToken) {
        await approve(Number(values.initialBuyAmount).toString(), decimals);
        setSubmitting(false);
        return;
      }

      // Upload image to Pinata
      const imageUrl = await uploadToPinata(values.tokenImage);
      if (!imageUrl) throw new Error("Image upload failed");

      setUploadedImageUrl(imageUrl);

      const poolDetails = JSON.stringify({
        mainImage: imageUrl,
        website: values.website || "",
        description: values.description || "",
        telegram: values.telegram || "",
        subImage: imageUrl,
        status: "visible",
      });

      const payload = {
        name: values.tokenName,
        symbol: values.tokenSymbol,
        poolDetails,
        configIndex: 1,
        router: getContractsByChainId(chainId).router,
        startTime: Math.floor(Date.now() / 1000),
        buyFeeRate: values.buybackBuy,
        sellFeeRate: values.buybackSell,
        maxBuyAmount: 0,
        delayBuyTime: 0,
        merkleRoot:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        initialBuyAmount: Number(values.initialBuyAmount),
      };

      await createToken(payload);
      setSubmitting(false);
      console.log("Payload sent to contract:", payload);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form className="bg-[#252525] p-6 rounded-lg shadow-md space-y-4">
          {/* Token Information */}
          <div>
            <h3 className="text-white font-bold mb-4">
              {t("token_information")}
            </h3>
            <div className="flex items-start mb-6 md:flex-row flex-col">
              {/* Hình ảnh */}
              {/* Hình ảnh hiển thị */}
              <div className="w-[180px] h-[180px] md:mr-4 mx-auto">
                <Image
                  width={180}
                  height={180}
                  src={
                    previewImage ||
                    uploadedImageUrl ||
                    "/images/no-photo-upload.png"
                  }
                  alt="Token Preview"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  onClick={() => fileInputRef.current?.click()} // Kích hoạt input file khi click
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }} // Ẩn input
                  ref={fileInputRef} // Ref để kích hoạt input
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      setFieldValue("tokenImage", file);
                      const previewUrl = URL.createObjectURL(file); // Tạo URL preview
                      setPreviewImage(previewUrl); // Cập nhật preview
                    }
                  }}
                />
                <ErrorMessage
                  name="tokenImage"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {/* Input Fields */}
              <div className="flex-1 space-y-4 w-full md:mt-0 mt-4">
                <div>
                  <label className="block text-white text-base font-no mb-2">
                    {t("token_name")} *
                  </label>
                  <Field
                    name="tokenName"
                    className="w-full p-2 bg-[#252525] text-white rounded-lg border border-white"
                    placeholder={t("enter_token_name")}
                  />
                  <ErrorMessage
                    name="tokenName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white text-base font-no mb-2">
                    {t("token_symbol")} *
                  </label>
                  <Field
                    name="tokenSymbol"
                    className="w-full p-2 bg-[#252525] text-white rounded-lg border border-white"
                    placeholder={t("enter_token_symbol")}
                  />
                  <ErrorMessage
                    name="tokenSymbol"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Token Description */}
            <div>
              <label className="block text-white text-base font-no mb-2">
                {t("token_description")} *
              </label>
              <Field
                name="description"
                className="w-full p-2 bg-[#252525] text-white rounded-lg border border-white"
                as="textarea"
                rows={5}
                placeholder={t("enter_token_description")}
              />
            </div>
          </div>
          {/* Initial Buy Settings */}
          <div>
            <label className="flex items-center text-white mb-2">
              <Field
                type="checkbox"
                name="settingInitialBuy"
                className="checkbox w-5 h-5  border-2 border-gray-500 bg-transparent rounded-md
                accent-gray-800
                 focus:outline-none  focus:ring-0 mr-2"
                onChange={(e: { target: { checked: any } }) =>
                  setFieldValue("settingInitialBuy", e.target.checked)
                }
              />
              {t("setting_initial_buy_amount")}
            </label>
            {values.settingInitialBuy && (
              <InitialBuyField
                name="initialBuyAmount"
                symbol={values.tokenSymbol}
                t={t}
                onValueChange={handleAmountChange}
              />
            )}
          </div>

          {/* Buyback Tax Settings */}
          <div>
            <label className="flex items-center text-white mb-2">
              <Field
                type="checkbox"
                name="buybackSetting"
                className="checkbox w-5 h-5  border-2 border-gray-500 bg-transparent rounded-md
                accent-gray-800
                 focus:outline-none  focus:ring-0 mr-2"
                onChange={(e: { target: { checked: any } }) =>
                  setFieldValue("buybackSetting", e.target.checked)
                }
              />
              {t("buyback_tax_setting")}
            </label>
            {values.buybackSetting && (
              <>
                <div className="mb-4">
                  <label className="block text-white text-base font-no mb-2">
                    {t("buyback_on_buy")} % (W2M)
                  </label>
                  <Field
                    name="buybackBuy"
                    type="number"
                    className="w-full p-2 bg-[#252525] text-white rounded-lg border border-white  outline-none appearance-none"
                  />
                  <ErrorMessage
                    name="buybackBuy"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                  <p className="text-transparent bg-clip-text bg-gradient-orange text-sm mt-2">
                    {t("description_buyback_on_buy", {
                      amount: `5%`,
                    })}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-white text-base font-no mb-2">
                    {t("buyback_on_sell")} % (W2M)
                  </label>
                  <Field
                    name="buybackSell"
                    type="number"
                    className="w-full p-2 bg-[#252525] text-white rounded-lg border border-white  outline-none appearance-none"
                  />
                  <ErrorMessage
                    name="buybackSell"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                  <p className="text-transparent bg-clip-text bg-gradient-orange text-sm mt-2">
                    {t("description_buyback_on_sell", {
                      amount: `15%`,
                    })}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Additional Information */}
          <div>
            <label className="flex items-center text-white mb-2">
              <Field
                type="checkbox"
                name="additionalInfo"
                className="checkbox w-5 h-5  border-2 border-gray-500 bg-transparent rounded-md
                accent-gray-800
                 focus:outline-none  focus:ring-0 mr-2"
                onChange={(e: { target: { checked: any } }) =>
                  setFieldValue("additionalInfo", e.target.checked)
                }
              />
              {t("additional_info")} (website, telegram, ...)
            </label>
            {values.additionalInfo && (
              <div className="grid grid-cols-2 md:gap-x-8 gap-x-4">
                <div className="mb-4">
                  <label className="block text-white text-base font-no mb-2">
                    Website
                  </label>
                  <Field
                    name="website"
                    type="text"
                    className="w-full p-2 bg-[#252525] text-white rounded-lg border border-white"
                  />
                  <ErrorMessage
                    name="website"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-base font-no mb-2">
                    Telegram
                  </label>
                  <Field
                    name="telegram"
                    type="text"
                    className="w-full p-2 bg-[#252525] text-white rounded-lg border border-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-base font-no mb-2">
                    Discord
                  </label>
                  <Field
                    name="discord"
                    type="text"
                    className="w-full p-2 bg-[#252525] text-white rounded-lg border border-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-base font-no mb-2">
                    X-Twitter
                  </label>
                  <Field
                    name="twitter"
                    type="text"
                    className="w-full p-2 bg-[#252525] text-white rounded-lg border border-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-base font-no mb-2">
                    Facebook page
                  </label>
                  <Field
                    name="facebook"
                    type="text"
                    className="w-full p-2 bg-[#252525] text-white rounded-lg border border-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full text-center">
            {!isConnected ? (
              <div
                className="w-[65%] mx-auto 
              bg-gradient-orange !text-black hover:opacity-90
              p-3 rounded-lg
              "
              >
                <Web3Login />
              </div>
            ) : (
              <button
                type="submit"
                disabled={
                  isWrongNetwork || isLoading || isLoadingApprove || submitting
                }
                className={`w-[65%] mx-auto py-4 text-base font-bold rounded-md capitalize
                ${
                  isWrongNetwork || isLoading || isLoadingApprove || submitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-orange text-black hover:opacity-90"
                }
              `}
              >
                {isWrongNetwork
                  ? t("wrong_network")
                  : isLoadingApprove
                  ? t("approving")
                  : isLoading
                  ? t("creating_token")
                  : checkApproveToken
                  ? t("approve")
                  : t("create_token")}
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTokenForm;
