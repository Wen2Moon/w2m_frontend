import { gql } from "@apollo/client";

export const GET_POOLS = gql`
  query pools($first: Int!, $orderDirection: String!, $orderBy: String!) {
    pools(first: $first, orderDirection: $orderDirection, orderBy: $orderBy) {
      id
      marketCap
      createdAt
      listedAt
      owner
      startTime
      baseToken {
        decimals
        id
        name
        symbol
        totalSupply
      }
      pairAddress
      poolDetails
      bondingCurve
    }
  }
`;

export const GET_POOLS_HOME = gql`
  query pools(
    $first: Int!
    $orderDirection: String!
    $orderBy: String!
    $where: Pool_filter
  ) {
    pools(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      where: $where
    ) {
      id
      marketCap
      createdAt
      listedAt
      owner
      startTime
      baseToken {
        decimals
        id
        name
        symbol
        totalSupply
      }
      pairAddress
      poolDetails
      bondingCurve
    }
  }
`;

export const GET_POOLS_TREND = gql`
  query pools(
    $first: Int!
    $orderDirection: String!
    $orderBy: String!
    $createdAt_gte: Int!
  ) {
    pools(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      where: { createdAt_gte: $createdAt_gte }
    ) {
      id
      marketCap
      createdAt
      listedAt
      owner
      startTime
      baseToken {
        decimals
        id
        name
        symbol
        totalSupply
      }
      pairAddress
      poolDetails
    }
  }
`;

export const GET_POOLS_PROFILES = gql`
  query pools(
    $first: Int!
    $orderDirection: String!
    $orderBy: String!
    $owner: String!
  ) {
    pools(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      where: { owner: $owner }
    ) {
      id
      marketCap
      createdAt
      listedAt
      owner
      startTime
      baseToken {
        decimals
        id
        name
        symbol
        totalSupply
      }
      pairAddress
      poolDetails
      bondingCurve
    }
  }
`;

export const GET_POOL_DETAIL = gql`
  query pool($id: String!) {
    pool(id: $id) {
      id
      marketCap
      createdAt
      listedAt
      owner
      startTime
      baseTokenPrice
      createdAt
      baseToken {
        decimals
        id
        name
        symbol
        totalSupply
      }
      bondingCurve
      pairAddress
      poolDetails
    }
  }
`;


export const GET_POOL_TRADE = gql`
  query pool($id: String!) {
    pool(id: $id) {
    buyFeeRate
    delayBuyTime
    }
  }
`;
