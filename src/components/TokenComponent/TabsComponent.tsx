import React from "react";
import Image from "next/image";

interface TabItem {
  name: string;
  icon: string;
  label: string;
  activeIcon: string;
}

interface TabsComponentProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="grid grid-cols-2 md:flex justify-start mb-4 gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`px-2 md:py-2 py-4 
            flex items-center justify-center gap-2
            ${
              activeTab === tab.name
                ? `
                  bg-gradient-to-r 
              from-[#AF46FF] 
                  to-[#2E0BF1] 
                  rounded-md
                  font-medium
               
                  transition-shadow
                  duration-300
                   text-white
                `
                : "bg-[#4C4C4C] text-white hover:bg-gray-700 rounded-md"
            }`}
          onClick={() => onTabChange(tab.name)}
        >
          <Image
            src={activeTab === tab.name ? tab.activeIcon : tab.icon}
            alt={tab.name}
            width={24}
            height={24}
          />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabsComponent;
