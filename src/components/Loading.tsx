"use client";

import styles from "@/styles/Home.module.css";
import Image from "next/image";

export default function Loading() {
  return (
    <div className={styles.appLoading}>
      <div className={styles.appLoadingWrap}>
        <div className={styles.ldsEllipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
