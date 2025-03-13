"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

interface TickerComponentProps {
  items: any[];
}

const TickerComponent: React.FC<TickerComponentProps> = ({ items }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <div className="bg-bgBtn text-white overflow-hidden py-2">
      <div className="whitespace-nowrap flex animate-instant-marquee">
        {items.map((item, index) => (
          <span
            key={index}
            className="mx-2 border-r border-[#595959] last:border-r-0 pr-4 text-base"
          >
            <span className="mr-2">{item.user}</span>
            <span className="mr-2">{item.type}</span>
            <span className="mr-2">{item.amountIn}</span>
            <span className="mr-2">
              {item.type === "Bought" ? (
                "W2M"
              ) : (
                <span
                  className="text-[#FBB215] text-base font-semibold underline underline-offset-2 cursor-pointer"
                  onClick={() => router.replace(`/token/${item.id}`)}
                >
                  ${item.symbol}
                </span>
              )}
            </span>
            <span>
              {"for "}{" "}
              {item.type === "Bought" ? (
                <span
                  className="text-[#FBB215] text-base font-semibold underline underline-offset-2 cursor-pointer"
                  onClick={() => router.replace(`/token/${item.id}`)}
                >
                  ${item.symbol}
                </span>
              ) : (
                "W2M"
              )}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TickerComponent;
