import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

interface TrendingComponentProps {
  tokens: any[];
}

const TrendingComponent: React.FC<TrendingComponentProps> = ({ tokens }) => {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <div className="bg-transparent text-white flex  justify-center items-center py-2 pt-4">
              {/* Title "Trending" */}
              <span className="text-white font-bold mx-4 text-xl mb-2">{t('trending')}</span>

      {/* Tokens container */}
      <div
        className="flex space-x-2 overflow-hidden md:items-center md:justify-center
        items-start justify-start max-w-[1440px]
        "
        style={{ maxWidth: "100%" }}
      >

        <div
          className="flex space-x-4 animate-instant-marquee lg:animate-none"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
          }}
        >
          {tokens.map((token, index) => (
            <div
              key={index}
              className="px-4 py-1 bg-[#4C4C4C] text-white rounded-md hover:bg-gray-600 border border-[#666666] cursor-pointer"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              onClick={() => router.replace(`/token/${token.id}`)}
            >
              #{index + 1}{" "}
              <span className="text-[#FBB215] underline underline-offset-1">
                {token?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingComponent;
