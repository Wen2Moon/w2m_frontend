"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { formatNumber, shortenAddress } from "@/utils";
import requestHttp from "@/api/config";
import { Copy, ChevronUp, ChevronDown, LogOut } from "lucide-react"; // Import icons
import useTokenBalance from "@/hooks/useTokenBalance";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { getContractsByChainId } from "@/config/smartcontract/contractAddress";
import { toast } from "react-toastify";

const Web3Login: React.FC<{ onLogin?: (address: string) => void }> = ({
  onLogin,
}) => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { open } = useWeb3Modal();

  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null); // Add ref for dropdown

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { chainId } = useAccount();

  // token W2M
  const { balance, balanceFormated, refetchBalance, decimals, symbol } =
    useTokenBalance(getContractsByChainId(chainId).AtheneToken || "");

  const [hasLoggedIn, setHasLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  ); // Kiểm tra access_token khi khởi tạo

  const handleLogin = useCallback(async () => {
    if (hasLoggedIn || !isConnected || !address) return; // Nếu đã đăng nhập hoặc chưa kết nối, không làm gì cả

    setLoading(true);
    try {
      // Gọi API để lấy nonce
      const res = await requestHttp({
        method: "get",
        url: `/auth/get-nonce?user=${address}`,
      });
      if (!res.data.data) return;

      // Ký nonce
      const signature = await signMessageAsync({
        message: `Sign this message to authenticate your wallet on Athene Network. Nonce: ${res.data.data}`,
      });

      if (!signature) return;
      const { data } = await requestHttp({
        method: "post",
        url: ref ? `/auth/login?ref=${ref}` : `/auth/login`,
        data: {
          address,
          signature,
          nonce: res.data.data,
        },
      });
      const accessToken = data.data.accessToken;
      if (!accessToken) return;

      const { data: userInfo } = await requestHttp({
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: `/users/${address}`,
      });
      console.log("🚀 ~ handleLogin ~ userInfo:", userInfo);

      // Lưu access_token
      localStorage.setItem("access_token", data.data.accessToken);

      // Đặt trạng thái đã login thành công
      setHasLoggedIn(true);

      // Gọi callback nếu có
      onLogin?.(address);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  }, [isConnected, address, hasLoggedIn, onLogin, signMessageAsync]);

  const handleConnect = useCallback(async () => {
    try {
      if (!isConnected) {
        open();
      } else {
        localStorage.removeItem("access_token");
      }
    } catch (error) {
      console.log("🚀 ~ handleConnect ~ error:", error);
    }
  }, [isConnected, open]);

  useEffect(() => {
    if (localStorage) {
      const hasToken = localStorage.getItem("access_token");
      if (isConnected && address && !hasToken) {
        handleLogin();
      } else if (!isConnected && !address) {
        // localStorage.removeItem("access_token");
        setHasLoggedIn(false);
      }
    }
  }, [isConnected, address, hasLoggedIn]);

  const handleCopyAddress = () => {
    console.log("🚀 ~ handleCopyAddress ~ address:", address);

    if (address) {
      navigator.clipboard.writeText(address);
      // Có thể thêm toast notification ở đây
    }
  };

  const handleDisconnect = async () => {
    localStorage.removeItem("access_token");
    setHasLoggedIn(false);
    await disconnect();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isConnected || !address) {
    return (
      <button
        onClick={() => handleConnect()}
        className="text-white hover:opacity-80 transition-opacity px-4 min-w-[180px]"
      >
        {loading ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 bg-[#4C4C4C] rounded-lg px-4 py-2 text-white hover:bg-[#3A3A3A] transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-start text-sm text-white">
            <span className="font-normal">{shortenAddress(address)}</span>
            <span className="font-semibold">
              {formatNumber(balanceFormated)}
              {symbol}
            </span>
          </div>
        </div>
        {isDropdownOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-full min-w-[200px] bg-[#2A2A2A] rounded-lg shadow-lg overflow-hidden z-[1000]">
          <button
            onClick={() => router.push("/profile")}
            className="w-full flex items-center gap-2 px-4 py-3 text-white hover:bg-[#3A3A3A] transition-colors"
          >
            <Image
              src={"/images/icons/account.svg"}
              alt="logo"
              className="w-4 h-4"
              width={16}
              height={16}
            />
            <span>Profile</span>
          </button>
          <button
            onClick={handleCopyAddress}
            className="w-full flex items-center gap-2 px-4 py-3 text-white hover:bg-[#3A3A3A] transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>Copy address</span>
          </button>

          <button
            onClick={handleDisconnect}
            className="w-full flex items-center gap-2 px-4 py-3 text-white hover:bg-[#3A3A3A] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Disconnect</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Web3Login;
