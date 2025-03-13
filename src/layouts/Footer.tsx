"use client";

import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";
import styles from "../styles/Home.module.css";
import { useTranslation } from "react-i18next";
const socicalLinks = [
  {
    icon: "/images/icons/website.png",
    url: "",
    name: "Twitter",
    alt: "Twitter socical",
  },
  {
    icon: "/images/icons/x.png",
    url: "",
    name: "Twitter",
    alt: "Twitter socical",
  },
  {
    icon: "/images/icons/telegram.png",
    url: "",
    name: "Twitter",
    alt: "Twitter socical",
  },
  {
    icon: "/images/icons/youtube.png",
    url: "",
    name: "Telegram",
    alt: "Telegram socical",
  },
  {
    icon: "/images/icons/facebook.png",
    url: "",
    name: "youtube",
    alt: "Youtube socical",
  },
  {
    icon: "/images/icons/discord.png",
    url: "",
    name: "youtube",
    alt: "Youtube socical",
  },
];

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <Box className={styles.footerModule}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        maxWidth={"1440px"}
        margin={"0 auto"}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <div className={styles.footerTitle}>
          <span>Wen2Moon </span>
          <span className="text-[18px]">Fun with Meme</span>
        </div>
        <div className={styles.footerSocial}>
          {socicalLinks.map((socical: any, index: number) => (
            <Link
              key={index}
              href={socical.url}
              target="_blank"
              className="linkSocial"
            >
              <Image
                src={socical.icon}
                alt={socical.alt}
                width={60}
                height={60}
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </Box>
      <div className={styles.homeFooter}>
        2025 Wen2Moon Co LTD. | All rights reserved.
      </div>
    </Box>
  );
};
export default Footer;
