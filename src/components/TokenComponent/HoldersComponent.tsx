"use client";

import { formatNumber, getScanUrl, shortenAddress } from "@/utils";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useChainId } from "wagmi";
import Pagination from "../Common/Pagination";

const NETWORK_URL_SCAN = process.env.NEXT_PUBLIC_NETWORK_TOKEN_SCAN;

const HoldersComponent: React.FC = ({
}) => {
  const params = useParams(); // Lấy params từ URL
  const addressToken = params.addressToken; // Tên phải trùng với tên folder `[address]`

  const itemsPerPage = 10;

  const [holders, setHolders] = useState<any>(null);

  const chainId = useChainId();

  const handleOpenScan = (address: string) => {
    const url = getScanUrl(address, chainId);
    window.open(url, "_blank");
  };

  // fetch holder
  useEffect(() => {
    const fetchData = async () => {
      if (addressToken) {
        try {
          const data = await axios.get(
            `${NETWORK_URL_SCAN}/${addressToken}/holders`
          );
          if (data) {
            setHolders(data.data?.items);
          }
        } catch (error) {
          console.log("🚀 ~ fetchData ~ error:", error);
        }
      }
    };
    fetchData();
  }, [addressToken]);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(holders?.length / itemsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentData = holders
    ? holders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  return (
    <div className="bg-[#252525] p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg">Holders ({holders?.length})</h3>
        <button
          className="text-sm text-white bg-gray-700 px-4 py-1 rounded-md hover:bg-gray-600"
          onClick={() => handleOpenScan(addressToken as string)}
        >
          Detail
        </button>
      </div>

      <div className="text-gray-300 mb-4">
        <div className="flex justify-between">
          <span>🏦 Bonding Curve</span>
          <span>100%</span>
        </div>
      </div>

      <div className="divide-y divide-gray-700">
        {currentData &&
          currentData.map((holder: any, index: number) => (
            <div key={index} className="flex justify-between py-2 items-center">
              <div className="text-sm flex items-center gap-2">
                <span
                  onClick={() => handleOpenScan(holder?.address?.hash)}
                  className="cursor-pointer hover:underline"
                >
                  {shortenAddress(holder?.address?.hash)}
                </span>
                <Image
                  src="/images/icons/copy.svg"
                  width={16}
                  height={16}
                  alt="Copy"
                  onClick={() =>
                    navigator.clipboard.writeText(holder?.address?.hash)
                  }
                  className="cursor-pointer"
                />
              </div>
              <div className="text-sm text-gray-400">
                {formatNumber(
                  (Number(holder?.value) / Number(holder?.token.total_supply)) *
                    100
                )}
                %
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default HoldersComponent;
