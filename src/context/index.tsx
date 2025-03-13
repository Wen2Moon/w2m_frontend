"use client";

import client from "@/apollo/apolloClient";
import { config, projectId } from "@/config";
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import React, { type ReactNode } from "react";
import { type State, WagmiProvider } from "wagmi";

// Tạo một query client cho react-query
const queryClient = new QueryClient();

// Kiểm tra project ID
if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Khởi tạo Web3Modal TRƯỚC khi component được render
createWeb3Modal({
  wagmiConfig: config,
  projectId,
});

// Component Web3ModalProvider riêng biệt
function Web3ModalProvider({ children, initialState }: { children: ReactNode, initialState: State | undefined }) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
}

// Component ContextProvider chính
function ContextProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: State | undefined;
}) {
  return (
    <Web3ModalProvider initialState={initialState}>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ApolloProvider>
    </Web3ModalProvider>
  );
}

export default ContextProvider;
