"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logomb from "../../public/images/logomb.svg";
import logoIcon from "../../public/images/logo.png";
import SelectLangues from "@/components/SelectLangues";
import { usePathname } from "next/navigation";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import Sidebar from "@/components/SidebarMobile";
import ModalConnectWebApp from "@/components/ModalConnectWebApp";
import Web3Login from "@/components/Web3Login"; // Import Web3Login
import { useState } from "react";
import { defaultLocale } from "@/config/constants/language";
import createIcon from "../../public/images/icons/create.svg";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation("common");
  const pathname = usePathname();
  const currentLocale = i18n.language;

  const [openSideBar, setSideBar] = useState(false);
  const [openModalConnect, setModalOpenConnect] = useState(false);

  const menus = [
    { path: `/${currentLocale}/`, title: t("home") },
    { path: `/${currentLocale}/referral/`, title: t("referral") },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.header} w-full`}>
      <div className={`${styles.navbar} w-full`}>
        <div className={styles.logo}>
          <Link href="/">
            <Image className={styles.logoIconPre} src={logoIcon} alt="logo" />
          </Link>
        </div>
        <div className={styles.logomb}>
          <div
            className={`${styles.logombTwo} flex items-center justify-between w-full`}
          >
            <Link href="/">
              <Image
                src={logoIcon}
                alt="logo mobile"
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </Link>
            <div className="flex items-center justify-center gap-4">
              <div className={styles.connectMobile}>
                <div className={styles.itemRightMenu}>
                  <Web3Login />
                </div>
              </div>
              <div className={styles.naviIcon} onClick={() => setSideBar(true)}>
                <MenuSharpIcon />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.menu}>
          {menus.map((menu) => {
            const menuPath =
              currentLocale === defaultLocale
                ? menu.path.replace(`/${currentLocale}`, "")
                : menu.path;
            const isActive = menuPath === pathname ? styles.menuActive : "";
            return (
              <Link
                key={menuPath}
                href={menu.isPopup ? "#" : menuPath}
                className={isActive}
                onClick={() => {
                  if (menu.isPopup) {
                    setIsOpen(true);
                  }
                }}
              >
                {menu.title}
              </Link>
            );
          })}
        </div>
      </div>
      <div className={styles.actionBtnSelect}>
        <Link
          href={"/create-token"}
          className={` w-full py-0.5 text-black rounded-md bg-gradient-orange px-4 flex items-center justify-center gap-2
        text-white font-semibold min-w-[170px]
        `}
        >
          <Image src={createIcon} width={21} height={21} alt="logo" />
          <span>Create token</span>
        </Link>
        <div className={styles.itemRightMenu}>
          <Web3Login />
        </div>
        <div className={styles.itemRightMenu}>
          <SelectLangues />
        </div>
      </div>
      {/* <div className={styles.connectMobile}>
        <div className={styles.itemRightMenu}>
          <Web3Login />
        </div>
      </div> */}
      <ModalConnectWebApp
        isOpen={openModalConnect}
        onCloseModal={() => setModalOpenConnect(false)}
      />
      <Sidebar
        isOpen={openSideBar}
        toggleSidebar={() => setSideBar(!openSideBar)}
      />
    </div>
  );
};

export default Header;
