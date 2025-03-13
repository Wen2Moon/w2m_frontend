// InitialBuyField.tsx
import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import Image from "next/image";

const optionsLocalString = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
};

const formatNumber = (value: string) => {
  if (!value) return "";
  const numberValue = parseFloat(value.replace(/,/g, ""));
  if (isNaN(numberValue)) return "";
  return numberValue.toLocaleString("en-US", optionsLocalString);
};

const parseNumber = (value: string) => {
  if (!value) return "";
  return value.replace(/,/g, "");
};

interface InitialBuyFieldProps {
  name: string;
  symbol: string;
  t: any;
  onValueChange?: (value: string) => void; // Thêm prop để emit giá trị
}

const InitialBuyField = ({
  name,
  symbol,
  t,
  onValueChange,
}: InitialBuyFieldProps) => {
  const { setFieldValue } = useFormikContext<any>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatNumber(rawValue);
    const parsedValue = parseNumber(formatted);

    // Cập nhật giá trị vào form
    setFieldValue(name, parsedValue);

    // Emit giá trị đã parse cho component cha
    if (onValueChange) {
      onValueChange(parsedValue);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-white text-base mb-2">
        {t("initial_buy")}
      </label>
      <div className="flex items-center bg-[#252525] text-white rounded-lg border border-white p-2">
        <div className="flex items-center px-2 border-r border-gray-600">
          <Image
            width={24}
            height={24}
            src="/images/icons/icons.svg"
            alt="W2M"
            className="w-5 h-5"
          />
          <span className="ml-2 text-sm">W2M</span>
        </div>
        <div className="flex-1">
          <Field name={name}>
            {({ field }: { field: any }) => (
              <input
                {...field}
                type="text"
                value={formatNumber(field.value)}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full bg-transparent text-white px-2 outline-none"
              />
            )}
          </Field>
        </div>
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default InitialBuyField;
