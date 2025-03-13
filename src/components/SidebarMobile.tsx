import { useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Sidebar.module.css";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/images/logopc.svg";
import close from "../../public/images/Close.png";
import SelectLangues from "./SelectLangues";
import { useTranslation } from "react-i18next";
import { defaultLocale } from "@/config/constants/language";

const Sidebar = ({ isOpen, toggleSidebar }: any) => {
  const { t, i18n } = useTranslation("common");
  const pathname = usePathname();
  useEffect(() => {}, [isOpen, toggleSidebar]);
  const router = useRouter();
  const handleLinkClick = () => {
    toggleSidebar();
  };
  const currentLocale = i18n.language;

  const menus = [
    {path: `/${currentLocale}/`, title: t('home')},
    {path: `/${currentLocale}/histories/`, title: t('history')},
]

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebar_btn}>
          <Link href="/">
            <Image
              onClick={handleLinkClick}
              src={logo}
              alt="picture"
              layout="fixed"
              loading="lazy"
            />
          </Link>
          <div>
            <Image
              className={styles.toggleButton}
              src={close}
              alt="picture"
              layout="fixed"
              onClick={toggleSidebar}
              loading="lazy"
            />
          </div>
        </div>
        <ul className={styles.sidebarUl}>
          {menus.map((menu) => {
              const menuPath = currentLocale === defaultLocale ?  menu.path.replace(`/${currentLocale}`, "") :  menu.path
              const isActive = menuPath === pathname ? styles.activeTab : styles.sidebara
              return <li key={menu.path} className={styles.sidebarli}>
              <Link
                onClick={handleLinkClick}
                href={menuPath}
                className={isActive}
              >
                  {menu.title}
              </Link>
              </li>
          })}
          <li className={styles.sidebarli}>
            <div className={styles.sidebara}>{t("language")}</div>
            <div className={styles.sidebaraLang}>
              <SelectLangues />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
