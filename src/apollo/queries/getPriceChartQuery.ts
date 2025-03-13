import { gql } from "@apollo/client";

export const GET_PRICE_CHART_ONE_MINUTE = gql`
  query poolDatas($first: Int!, $pool: String!) {
    poolOneMinuteDatas(first: $first, where: { pool: $pool }) {
      close
      high
      low
      minuteStartUnix
      open
    }
  }
`;

export const GET_PRICE_CHART_15_MINUTE = gql`
  query poolThirteenMinuteDatas($first: Int!, $pool: String!) {
    poolThirteenMinuteDatas(first: $first, where: { pool: $pool }) {
      close
      high
      low
      minuteStartUnix
      open
    }
  }
`;

export const GET_PRICE_CHART_ONE_HOUR = gql`
  query poolHourDatas($first: Int!, $pool: String!) {
    poolHourDatas(first: $first, where: { pool: $pool }) {
      baseReserve
      close
      high
      hourStartUnix
      hourlyTxns
      hourlyVolumeBaseToken
      hourlyVolumeQuoteToken
      low
      open
    }
  }
`;

export const GET_PRICE_CHART_4_HOUR = gql`
  query poolHourDatas($first: Int!, $pool: String!) {
    poolHourDatas(first: $first, where: { pool: $pool }) {
      baseReserve
      close
      high
      hourStartUnix
      hourlyTxns
      hourlyVolumeBaseToken
      hourlyVolumeQuoteToken
      low
      open
    }
  }
`;

export const GET_PRICE_CHART_DAYS = gql`
  query poolDayDatas($first: Int!, $pool: String!) {
    poolDayDatas(first: $first, where: { pool: $pool }) {
      close
      high
      low
      date
      open
    }
  }
`;
