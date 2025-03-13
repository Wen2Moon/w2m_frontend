import Image from "next/image";
import CheckboxComponent from "../CheckboxComponent";

interface SearchComponentProps {
  onSearch: any;
  onFilterChange?: (filter: string) => void;
  onCheckboxChange?: (checked: boolean) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  onFilterChange,
  onCheckboxChange,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onFilterChange) onFilterChange(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckboxChange) onCheckboxChange(event.target.checked);
  };

  return (
    <div className="flex md:flex-row flex-col items-center justify-between p-4 bg-blacklight rounded-md my-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          className="w-full p-2 pl-10 bg-bgBtn border border-[#FFFFFF] text-white rounded-md placeholder-gray-500"
          placeholder="Type token symbol, address to find"
          onChange={handleSearch}
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

      {/* Dropdown */}
      <select
        className="ml-4 p-2 bg-bgBtn border border-[#FFFFFF] text-white rounded-md  text-sm appearance-none"
        onChange={handleFilterChange}
        style={{
          backgroundImage: "url(/images/icons/arrow-down.svg)",
          backgroundPosition: "right 10px center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "16px",
          paddingRight: "1.5rem",
        }}
      >
        <option value="launchedTime">Launched time</option>
        <option value="recentlyAdded">Recently added</option>
      </select>

      {/* Checkbox */}
      <CheckboxComponent
        id="atheneSwap"
        label="Listed on W2M swap"
        checked={false}
        onChange={(e: any) => handleCheckboxChange(e)}
      />
    </div>
  );
};

export default SearchComponent;
