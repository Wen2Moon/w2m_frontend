"use client";

import getExplorerUrl from "@/config/explorer";
import { IHistory } from "@/hooks/useGetHistory";
import { formatNumber, getTimeInfo, shortenAddress } from "@/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";
import pendingSvg from "../../../public/images/history/pending.svg";
import successSvg from "../../../public/images/history/success.svg";
import Image from "next/image";

export default function TableHistory({histories, page}: any) {
    const { t } = useTranslation("common");
    const { chainId } = useAccount();
    const headings = [
      t('column_id'),
      t('column_wallet_address'),
      t('column_token'),
      t('column_amount'),
      t('column_account'),
      t('column_transaction_hash'),
      t('column_status'),
      t('column_time'),
    ];
  
    return <div className="table-history">
    <table>
      <thead>
        <tr>
          {headings.map((heading: any, index: number) => (
            <th key={index}>
              <div className="th">
                <p style={{textAlign: index === headings.length -1 ? 'right': 'left'}}>{t(heading)}</p>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {histories ? histories.map((history: IHistory, index: number) => {
        const {s,m, h, d, mm, y} = getTimeInfo(history.createdAt)
        return (
          <tr key={index}>
            <td style={{paddingLeft: '25px'}}>
              <div className="td">{((page-1) * 10) + (index + 1)}</div>
            </td>
            <td>
              <div className="wallet">
                {shortenAddress(history.userWallet, 10, 10)}
              </div>
            </td>
            <td>
              <div className="token">
                <img
                  src={history?.logo}
                  alt="token"
                  width={22}
                  height={22}
                  loading="lazy"
                />
                <span>{history.symbol}</span>
              </div>
            </td>
            <td>
              <div>{formatNumber(history.amount)}</div>
            </td>
            <td>
              <div>{history.email}</div>
            </td>
            <td>
              <div style={{color: '#00FFD4'}}>
                <Link
                  href={`${getExplorerUrl(chainId)}/tx/${history.txHash}`}
                  target="_blank">
                    {shortenAddress(history.txHash, 15, 15)}
                </Link>
              </div>
            </td>
            <td>
              {history.isCalledHookSuccess ?
                  <Image
                    src={successSvg}
                    alt="status"
                    width={28}
                    height={28}
                    loading="lazy"
                  />
              :  <Image
                  src={pendingSvg}
                  alt="status"
                  width={28}
                  height={28}
                  loading="lazy"
                />
              }
            </td>
            <td style={{paddingRight: '25px'}}>
              <div style={{textAlign: 'right'}}>
                <p>{`${h}:${m}:${s}`}</p>
                <p>{`${d}/${mm}/${y}`}</p>
              </div>
            </td>
          </tr>
        );
      }): null}
      </tbody>
    </table>
  </div>
}