import Image from "next/image";
import { useTranslation } from "react-i18next";
interface GuideStep {
  id: number;
  content: string;
  iconIndex: string;
}

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation("common");

  const steps: GuideStep[] = [
    {
      id: 1,
      content: t("guide_modal_title_1"),
      iconIndex: "/images/icons/stt-guide-1.png",
    },
    {
      id: 2,
      content: t("guide_modal_title_2"),
      iconIndex: "/images/icons/stt-guide-2.png",
    },
    {
      id: 3,
      content: t("guide_modal_title_3"),
      iconIndex: "/images/icons/stt-guide-3.png",
    },
    {
      id: 4,
      content: t("guide_modal_title_4"),
      iconIndex: "/images/icons/stt-guide-4.png",
    },
    {
      id: 5,
      content: t("guide_modal_title_5"),
      iconIndex: "/images/icons/stt-guide-5.png",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="relative max-w-[510px] w-full mx-4">
        {/* Main popup container với background image */}
        <div
          className="rounded-xl p-6 relative"
          style={{
            backgroundImage: `url('/images/bg-popup-guide.png')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-4 text-white hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Title */}
          <h2 className="text-[#FF8C3F] text-[40px] font-semibold mb-6 uppercase">
            {t("guide")}
          </h2>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="relative p-4 rounded-lg"
                style={{
                  backgroundImage: `url('/images/bg-item-guide.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={step.iconIndex}
                    alt={`Step ${step.id}`}
                    width={65}
                    height={47}
                    className="mt-1.5 w-[65px] h-[47px]"
                  />
                  <p className="text-white flex-1">{step.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6
              text-base font-semibold
              rounded-lg bg-[#4C4C4C] text-white hover:bg-[#3A3A3A] transition-colors
                         shadow-[0_2px_10px_0_rgba(102, 102, 102, 0.5)]
                  hover:shadow-[0_2px_15px_0_rgba(102, 102, 102, 0.65)]
              "
            >
              {t("explore_token")}
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 
                 bg-gradient-to-r 
                from-[#AF46FF] 
                  to-[#2E0BF1] 
                  rounded-md
               
                  transition-shadow
                  duration-300
                  text-black
                  w-full 
                  text-white
                  font-semibold
                "
            >
              {t("launch_your_token")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;
