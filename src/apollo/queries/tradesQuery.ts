import { gql } from "@apollo/client";

export const GET_MY_TRADES = gql`
  query trades(
    $first: Int!
    $orderDirection: String!
    $orderBy: String!
    $account: String!
    $pool: String!
  ) {
    trades(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      where: { account: $account, pool: $pool }
    ) {
      id
      account
      pool {
        id
      }
      isBuy
      amountOut
      amountIn
      timestamp
      baseTokenPrice
    }
  }
`;

export const GET_RECENT_TRADES = gql`
  query trades(
    $first: Int!
    $orderDirection: String!
    $orderBy: String!
    $pool: String!
  ) {
    trades(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      where: { pool: $pool }
    ) {
      id
      account
      pool {
        id
      }
      isBuy
      amountOut
      amountIn
      timestamp
      baseTokenPrice
    }
  }
`;

export const GET_TOKEN_OWNED = gql`
  query trades(
    $first: Int!
    $orderDirection: String!
    $orderBy: String!
    $account: String!
  ) {
    trades(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      where: { account: $account }
    ) {
      pool {
        id
        marketCap
        createdAt
        listedAt
        owner
        startTime
        pairAddress
        poolDetails
        bondingCurve
        baseToken {
          decimals
          id
          name
          symbol
          totalSupply
        }
      }
    }
  }
`;

export const GET_RECENT_ALL_TRADES = gql`
  query trades($first: Int!, $orderDirection: String!, $orderBy: String!) {
    trades(first: $first, orderDirection: $orderDirection, orderBy: $orderBy) {
      id
      account
      pool {
        id
      }
      isBuy
      amountOut
      amountIn
      timestamp
      baseTokenPrice
      pool {
        baseToken {
          symbol
          name
          decimals
        }
      }
    }
  }
`;
