import { useRouter } from "next/navigation";
import { TokenCardProps } from "./TokenCardComponent";
import { useTranslation } from "react-i18next";

const TokenDetailComponent: React.FC<TokenCardProps> = ({
  id,
  name,
  symbol,
  image,
  description,
  bondingCurveProgress,
  crownedDate,
  links,
}) => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <div
      className="p-6 bg-[#252525] text-white rounded-md shadow-lg"
      style={{ maxWidth: "581px", margin: "0 auto" }}
    >
      {/* Token Info */}
      <div
        className="flex items-start cursor-pointer"
        onClick={() => router.replace(`/token/${id}`)}
      >
        <img src={image} alt={name} className="w-24 h-24 rounded-md mr-4" />
        <div>
          <h2 className="text-xl font-bold ">
            {name} ({symbol})
          </h2>
          <p className="text-sm mt-2">{description}</p>
        </div>
      </div>

      {/* Bonding Curve Progress */}
      <div className="mt-4">
        <div className="text-sm font-medium text-[#FBB215] flex justify-between items-center">
          <span>{t("bonding_curve_progress")}:</span>
          <span className="text-[#FBB215] ">{bondingCurveProgress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
          <div
            className="h-2 rounded-full bg-white  "
            style={{ width: `${bondingCurveProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Crowned Info */}
      <p className="mt-4 text-sm flex items-center">
        <span role="img" aria-label="crown" className="mr-2">
          👑
        </span>
        {t("crowned_date_value")} {crownedDate}
      </p>

      {/* Links */}
      <div className="mt-4 flex gap-2 flex-wrap justify-between">
        {links &&
          links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              className="text-sm px-4 py-2 rounded-mdransition
            text-white
            "
            >
              {link.label}
            </a>
          ))}
      </div>

      {/* Buy Button */}
      <button
        className="
           bg-gradient-to-r 
                  from-[#AF46FF] 
                  to-[#2E0BF1] 
                  rounded-md
                  transition-shadow
                  duration-300
                  text-black
                  w-full py-3 px-8
                  text-white
                  font-semibold
                  mt-2 
      "
        onClick={() => router.replace(`/token/${id}`)}
      >
        {t("buy_now")}
      </button>
    </div>
  );
};

export default TokenDetailComponent;
