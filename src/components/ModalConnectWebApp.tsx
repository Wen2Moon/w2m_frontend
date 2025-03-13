"use client"

import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import styles from "../styles/ModalSmartContract.module.css";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import img4 from "../../public/images/metamask.svg";
import img5 from "../../public/images/trust.svg";
import { useSearchParams } from "next/navigation";

export default function ModalConnectWebApp({ isOpen, onCloseModal }: any) {
  const { t, i18n } = useTranslation("common");
  const { language } = i18n;

  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (searchParams && searchParams.get('email')) {
      setEmail(searchParams.get('email') ?? "")
    }
  }, [searchParams])

  const deeplink = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/${language}${email ? `?email=${email}` : ``}`
  
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isOpen}
        onClose={onCloseModal}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 900,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            backgroundColor: "#131D20",
            WebkitBoxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.50)",
            border: "none",
            color: "white",
            "@media (max-width: 600px)": {
              maxWidth: 350,
              maxHeight: 400,
            },
            "@media (max-width: 300px)": {
              maxWidth: 260,
              maxHeight: 400,
            },
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <div className="">
            <div className={styles.title_connect_app}>
              {t("connect_wallet_title")}
            </div>
            <div className={styles.item_connect_app_contaner}>
              <a
                className={styles.item_connect_app}
                href={`https://metamask.app.link/dapp/${deeplink}`}
              >
                <Image src={img4} alt="picture" layout="fixed" />
                <div className={styles.item_name_connect_app}>Metamask</div>
              </a>
            </div>
            <div className={styles.item_connect_app_contaner}>
              <a
                className={styles.item_connect_app1}
                href={`https://link.trustwallet.com/open_url?coin_id=9006&url=https://${deeplink}`}
              >
                <Image src={img5} alt="picture" layout="fixed" />
                <div className={styles.item_name_connect_app}>Trust Wallet</div>
              </a>
            </div>
          </div>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
