import { id } from "ethers";
import { use } from "react";

export const getReceiptTranstion = async (provider: any, hash: string) => {
  try {
    if (provider) {
      let makeSureTxCompleted = await provider.getTransactionReceipt(hash);
      while (!makeSureTxCompleted) {
        makeSureTxCompleted = await provider.getTransactionReceipt(hash);
      }
    }
  } catch (error) {
    throw error;
  }
};

const optionsLocalString = {
  useGrouping: true,
  maximumFractionDigits: 3,
  minimumFractionDigits: 0,
  decimalSeparator: ".",
  groupingSeparator: ",",
};

export function formatNumber(
  unformatted: number | string | undefined,
  showDigits = 2
) {
  // get fraction digits for small number
  if (!unformatted) return 0;
  const absNumber = Math.abs(Number(unformatted));
  if (absNumber > 0) {
    const digits = Math.ceil(Math.log10(1 / absNumber));
    if (digits < 3) {
      // optionsLocalString fix error decimalSeparator = ',' on mobile
      return Number(unformatted).toLocaleString("en-US", optionsLocalString);
    }
    return Number(unformatted).toFixed(digits + showDigits);
  } else {
    return 0;
  }
}

export function formatNumberSmall(
  unformatted: number | string | undefined,
  showDigits = 2
) {
  if (!unformatted) return "0";

  const num = Number(unformatted);
  if (isNaN(num)) return "0";

  const absNumber = Math.abs(num);
  if (absNumber === 0) return "0";

  // Kiểm tra nếu số rất nhỏ (nhiều số 0 ở giữa)
  if (absNumber < 0.0001) {
    const exponent = Math.floor(Math.log10(absNumber));
    const coefficient = (num / Math.pow(10, exponent)).toFixed(showDigits);
    return `${coefficient} x10⁻${Math.abs(exponent)}`;
  }

  // Kiểm tra nếu số có nhiều số 0 ở cuối
  const digits = Math.ceil(Math.log10(1 / absNumber));
  if (digits < 3) {
    return num.toLocaleString("en-US", { maximumFractionDigits: showDigits });
  }

  const formatted = num.toFixed(digits + showDigits);
  return formatted.replace(/(0{4,})\d*$/, "..."); // Nếu có 4 số 0 liên tiếp trở lên, thay bằng "..."
}

export const getTimeInfo = (timestamp: number) => {
  const time = new Date(timestamp);
  const data: any = {
    s: time.getSeconds(),
    m: time.getMinutes(),
    h: time.getHours(),
    d: time.getDate(),
    mm: time.getMonth() + 1,
    y: time.getFullYear(),
  };

  const result: any = {};
  Object.keys(data).forEach((t: any) => {
    const value = data[t];
    result[t] = value < 10 ? `0${value}` : value;
  });
  return result;
};

export function shortenAddress(
  address: string,
  placeFirst = 4,
  placeSecond = 4
): string {
  if (!address) return "";
  return `${address.substring(0, placeFirst + 2)}...${address.substring(
    address.length - placeSecond
  )}`;
}

function isValidJSON(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

export function parseTokensFromQuery(data: any[]): any[] {
  return data.map((pool) => {
    // Parse poolDetails từ JSON string
    const poolDetails =
      pool?.poolDetails && isValidJSON(pool.poolDetails)
        ? JSON.parse(pool.poolDetails)
        : {};

    // Trả về đối tượng mới khớp với mock data
    return {
      id: pool?.id,
      name: pool?.baseToken?.name || "Unknown Token",
      symbol: pool?.baseToken?.symbol || "UNKNOWN",
      image: poolDetails?.mainImage || "/images/icons/pepe-icon.png",
      description: poolDetails?.description || "No description available.",
      bondingCurveProgress:
        Number(pool?.bondingCurve) > 1 ? 100 : Number(pool?.bondingCurve) * 100, // Nếu có logic tính toán khác, thay đổi ở đây
      crownedDate: new Date(Number(pool?.startTime) * 1000).toLocaleString(
        "en-US"
      ),
      marketCap: pool?.marketCap,
      owner: pool?.owner,
      baseTokenPrice: pool?.baseTokenPrice,
      createdAt: pool?.createdAt,
      startTime: pool?.startTime,
      links: [
        { label: "Website", url: poolDetails?.website || "#" },
        { label: "Telegram", url: poolDetails?.telegram || "#" },
        { label: "Discord", url: "#" }, // Không có trong dữ liệu => giá trị mặc định
        { label: "X-Twitter", url: "#" }, // Không có trong dữ liệu => giá trị mặc định
        { label: "Facebook", url: "#" }, // Không có trong dữ liệu => giá trị mặc định
      ],
    };
  });
}


function timeAgo(timestamp: number) {
  const now = Math.floor(Date.now() / 1000); // Get current timestamp
  const diff = now - timestamp; // Calculate time difference

  if (diff < 60) return `${diff} second${diff === 1 ? '' : 's'} ago`;
  if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }
  if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  if (diff < 2592000) {
      const days = Math.floor(diff / 86400);
      return `${days} day${days === 1 ? '' : 's'} ago`;
  }
  if (diff < 31536000) {
      const months = Math.floor(diff / 2592000);
      return `${months} month${months === 1 ? '' : 's'} ago`;
  }
  
  const years = Math.floor(diff / 31536000);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

export function parseHashesFromQuery(data: any[]): any[] {
  return data.map((pool) => {
    return {
      time: timeAgo(pool?.timestamp),
      type: pool?.isBuy ? "Buy" : "Sell",
      amountIn: pool?.isBuy ? formatNumberSmall(pool?.amountIn) : formatNumberSmall(pool?.amountOut),
      amountOut: pool?.isBuy ? formatNumberSmall(pool?.amountOut) : formatNumberSmall(pool?.amountIn),
      price: formatNumber(pool?.baseTokenPrice),
      user: shortenAddress(pool?.account),
      txn: pool?.id,
    };
  });
}

export function parseHashesTrendingFromQuery(data: any[]): any[] {
  return data.map((trade) => {
    return {
      type: trade?.isBuy ? "Bought" : "Sold",
      user: shortenAddress(trade?.account),
      amountIn: trade?.isBuy ? formatNumberSmall(trade?.amountIn) : formatNumberSmall(trade?.amountOut),
      amountOut: trade?.isBuy ? formatNumberSmall(trade?.amountOut) : formatNumberSmall(trade?.amountIn),
      id: trade?.pool?.id,
      createdAt: trade?.createdAt,
      symbol: trade?.pool?.baseToken?.symbol 
    };
  });
}


export function parseCommentFromQuery(data: any[]): any[] {
  return data.map((comment) => {
    return {
      time: timeAgo(Math.floor(comment?.createdAt / 1000)),
      content: comment?.content,
      user: shortenAddress(comment?.user?.address),
      avatar: "/images/icons/pepe-icon.png",
    };
  });
}


export const getScanUrl = (address: string, chainId?: number) => {
  if (!chainId) return '#';
  const scanUrls: any = {
    1: 'https://etherscan.io', // Ethereum Mainnet
    56: 'https://bscscan.com', // Binance Smart Chain
    137: 'https://polygonscan.com', // Polygon
    281123: 'https://parthenon.athenescan.io'
  };
  const baseUrl = scanUrls[chainId] || 'https://etherscan.io'; // Mặc định Ethereum
  return `${baseUrl}/address/${address}`;
};

export function calculateTimeDifference(delayTime: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - delayTime.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  return `${diffInHours} hours ago`;
}

export const formatEstOutput = (amountOutLessFee: bigint, decimals: number): string => {
  if (!amountOutLessFee) return "0";
  // Chuyển BigInt sang số thập phân với 18 số sau dấu phẩy (vì W2M token có 18 decimals)
  const rawNumber = Number(amountOutLessFee) / Math.pow(10, decimals);
  
  // Làm tròn đến 6 chữ số thập phân để dễ đọc
  const formattedNumber = rawNumber.toFixed(6);
  
  // Format số với dấu phẩy phân cách hàng nghìn
  return new Intl.NumberFormat('en-US').format(Number(formattedNumber));
}


// Hàm helper để lấy khoảng thời gian giữa các nến theo timeframe
export const getTimeInterval = (timeframe: string): number => {
  switch (timeframe) {
    case "1m":
      return 60; // 1 phút = 60 giây
    case "15m":
      return 15 * 60; // 15 phút = 900 giây
    case "1h":
      return 60 * 60; // 1 giờ = 3600 giây
    case "4h":
      return 4 * 60 * 60; // 4 giờ = 14400 giây
    case "1D":
      return 24 * 60 * 60; // 1 ngày = 86400 giây
    default:
      return 60;
  }
};