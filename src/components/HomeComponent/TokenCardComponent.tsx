import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export interface TokenCardProps {
  id: any;
  name: string;
  symbol: string;
  image: string;
  description: string;
  bondingCurveProgress: number;
  bondingCurve: number;
  crownedDate: string;
  links: { label: string; url: string }[];
}

const TokenCardComponent: React.FC<TokenCardProps> = ({
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
    <div className="p-4 bg-[#252525] text-white rounded-md shadow-sm">
      <div
        className="flex items-center justify-start gap-4 cursor-pointer"
        onClick={() => router.push(`/token/${id}`)}
      >
        <img src={image} alt={name} className="w-16 h-16 rounded-md" />
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-lg font-bold">
            {name} ({symbol})
          </h3>
          <p className="text-sm mt-2">{description}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-xs flex items-center justify-between">
          <span className=" text-[#FBB215] ">
            {t("bonding_curve_progress")}:
          </span>
          <span className="text-[#FBB215]">{bondingCurveProgress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
          <div
            className="bg-white h-2 rounded-full"
            style={{ width: `${bondingCurveProgress}%` }}
          ></div>
        </div>
      </div>
      <p className="mt-2 text-xs"> {crownedDate}</p>
      <div className="mt-4 flex gap-2 flex-wrap justify-between items-center w-full">
        {links?.map((link, index) => (
          <a
            key={index}
            href={link.url ? link.url : "/"}
            className="btn text-[#FBB215] underline underline-offset-2 text-sm"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TokenCardComponent;
