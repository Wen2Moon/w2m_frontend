"use client";

import useGetHistory from "@/hooks/useGetHistory";
import FooterHistory from "@/layouts/FooterHistory";
import styles from "@/styles/Home.module.css";
import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";
import { StyledHistory } from "./Styles";
import TableHistory from "@/components/Table/TableHistory"


export default function History() {
  const { t } = useTranslation("common");
  const { address, chainId } = useAccount();
  const [page, setPage] = useState(1);
  const {data} = useGetHistory(address, chainId, page);

  return <StyledHistory>
    <Box
      maxWidth={"1366px"}
      paddingY={6}
      margin="0 auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <div className="title">
        <div className={styles.homeContentTitle}>{t("history_title")}</div>
      </div>
      {data && data.histories && data && data.histories.length ?
      <>
      <TableHistory histories={data && data.histories ? data.histories : []} page={page} />
      <div className="content-pagination">
        <Stack spacing={2}>
          <Pagination
            count={data ? data.totalPages: 0}
            page={page}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              setPage(value)
            }}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: () => <>{t('pre')}</>, next: () => <>{t('next')}</> }}
                {...item}
              />
            )}
          />
        </Stack>
      </div>
      </> : <div className="no-data">{t("no_data")}</div>}
    </Box> 
    <FooterHistory/>
  </StyledHistory>
}
