"use client";

import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import HeaderComponent from "./HomeComponent/HeaderComponent";
import TokenDetailComponent from "./HomeComponent/TokenDetailComponent";
import GridComponent from "./HomeComponent/GridComponent";
import { useQuery } from "@apollo/client";
import { parseTokensFromQuery } from "@/utils";
import { GET_POOLS_HOME } from "@/apollo/queries/poolQuery";
import Image from "next/image";
import CheckboxComponent from "./CheckboxComponent";
import createIcon from "../../public/images/icons/create.svg";
import Link from "next/link";

const HomeGeneral: NextPage = () => {
  const { t, i18n } = useTranslation("common");
  const { language } = i18n;
  const [tokens, setTokens] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isListedOnly, setIsListedOnly] = useState(false);

  // State cho variables
  const [variables, setVariables] = useState({
    first: 100,
    orderDirection: "desc",
    orderBy: "startTime",
    where: {} as any,
  });

  // Gọi query với state variables
  const { loading, error, data } = useQuery(GET_POOLS_HOME, {
    variables,
  });

  // Hàm thay đổi variables
  const updateVariables = (newVariables: Partial<typeof variables>) => {
    setVariables((prev) => ({ ...prev, ...newVariables }));
  };

  // Hàm xử lý search
  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);

    if (!searchValue) {
      // search, reset where condition
      updateVariables({ where: {} });
      return;
    }

    const isAddress = searchValue.startsWith("0x");

    const whereCondition = isAddress
      ? {
          // search by address
          or: [{ id: searchValue }],
        }
      : {
          // saerch symbol, name
          or: [
            { baseToken_: { symbol_contains_nocase: searchValue } },
            { baseToken_: { name_contains_nocase: searchValue } },
          ],
        };

    updateVariables({ where: whereCondition });
  };

  // Hàm xử lý sort theo thời gian
  const handleTimeSort = (value: string) => {
    updateVariables({ orderBy: value });
  };

  // Hàm xử lý filter theo listing status
  const handleListingFilter = (isListed: boolean) => {
    let whereCondition: any;
    if (isListed) {
      whereCondition = {
        listedAt_gt: 0,
      };
    } else {
      whereCondition = {
        listedAt: 0,
      };
    }
    updateVariables({
      where: whereCondition,
    });
  };

  useEffect(() => {
    if (data) {
      const parsedTokens = parseTokensFromQuery(data.pools);
      setTokens(parsedTokens);
    }
  }, [data]);

  return (
    <div className="min-h-screen">
      <HeaderComponent />
      <div className="container mx-auto py-8">
        <TokenDetailComponent {...tokens[0]} />
        <div className="p-4 w-full">
          <Link
            href={"/create-token"}
            className={`  mx-auto  text-black rounded-md bg-gradient-orange px-4 flex items-center justify-center gap-2
        text-base font-semibold  md:hidden  p-3
        `}
          >
            <Image src={createIcon} width={21} height={21} alt="logo" />
            <span>{t("create_token")}</span>
          </Link>
        </div>
        <div
          className="flex md:flex-row flex-col md:items-center md:justify-between items-start justify-start
          gap-4 p-4 pt-0.5
        bg-transparent md:bg-blacklight rounded-md "
        >
          <div className="relative flex-1 w-full font-normal">
            <input
              type="text"
              placeholder={t("search_token")}
              className="w-full p-2 pl-10 bg-bgBtn border border-[#FFFFFF] text-white rounded-md text-sm
              placeholder:text-white
              "
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-500">
              <Image
                src="/images/icons/search.svg"
                alt="Search"
                width={20}
                height={20}
              />
            </span>
          </div>
          <select
            onChange={(e) => handleTimeSort(e.target.value)}
            className="p-2 bg-bgBtn border border-[#FFFFFF] text-white rounded-md  text-sm appearance-none"
            style={{
              backgroundImage: "url(/images/icons/arrow-down.svg)",
              backgroundPosition: "right 10px center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "16px",
              paddingRight: "1.5rem",
            }}
          >
            <option value="startTime">{t("launched_time")}</option>
            <option value="createdAt">{t("created_time")}</option>
            <option value="listedAt">{t("listed_time")}</option>
          </select>

          {/* Checkbox */}
          <CheckboxComponent
            id="atheneSwap"
            label={t("listed_on_athene_swap")}
            checked={isListedOnly}
            onChange={(checked) => {
              setIsListedOnly(checked);
              handleListingFilter(checked);
            }}
          />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <GridComponent tokens={tokens} />
        )}
      </div>
      <div className="text-sm font-normal p-4 text-center md:px-[12%] px-4">
        {t("disclaimer_note")}
      </div>
    </div>
  );
};

export default HomeGeneral;
