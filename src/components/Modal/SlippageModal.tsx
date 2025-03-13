import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { Sheet } from "@mui/joy";

interface SlippageModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (slippage: number) => void;
  defaultSlippage?: number;
  t: any;
}

const SlippageModal: React.FC<SlippageModalProps> = ({
  open,
  onClose,
  onSave,
  defaultSlippage = 50,
  t,
}) => {
  const [slippage, setSlippage] = useState<string>(defaultSlippage.toString());

  const handleSave = () => {
    const slippageValue = parseFloat(slippage);
    if (!isNaN(slippageValue)) {
      onSave(slippageValue);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        zIndex: 999999,
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: "370px",
          borderRadius: "md",
          p: 2,
          boxShadow: "lg",
          backgroundColor: "#252525",
          border: "none",
        }}
      >
        <div className="relative">
          {/* Header */}
          <p className="!text-white text-xl font-normal my-2">
            {t("set_slippage")} (%)
          </p>

          <ModalClose
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              color: "white",
              ":hover": {
                background: "transparent",
              },
              svg: {
                color: "white",
              },
            }}
          />

          {/* Input */}
          <input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(e.target.value)}
            className="w-full bg-[#252525] !text-white p-2 rounded-md mb-2 
                       outline-none border border-[#FFFFFF] focus:border-gray-400"
          />

          {/* Description */}
          <p className="!text-white text-xs mb-2">
            {t("setting_slippage")}
          </p>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-gradient-orange 
                     !text-white font-medium py-2 px-4 rounded-md
                     transition duration-200"
          >
            {t("save_setting")}
          </button>
        </div>
      </Sheet>
    </Modal>
  );
};

export default SlippageModal;
