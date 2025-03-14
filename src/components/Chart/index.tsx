import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LocalLoader from "../LocalLoader";

// Styled components
const ChartContainer = styled.div<{ height: number; width: number }>`
  position: relative;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(15, 18, 17, 0.7);
`;

// Timeframe options
export const timeframeOptions = {
  MINUTE: "1",
  HOUR: "1h",
};

// Types for data and props
interface CandleStickData {
  time: number; // Unix timestamp in seconds
  open: number; // Open price
  high: number; // High price
  low: number; // Low price
  close: number; // Close price
}

interface CandleStickChartProps {
  data: CandleStickData[]; // Array of candlestick data
  width?: string | number; // Width of the chart
  height?: string | number; // Height of the chart
  timeWindow?: string; // Time window for the chart
  symbol?: string;
}

const CandleStickChart: React.FC<CandleStickChartProps> = ({
  data,
  width = "1280px",
  height = "650px",
  timeWindow = "1 hour",
  symbol,
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tvWidgetRef = useRef<any>(null); // Ref for the TradingView widget instance
  const [isLoading, setIsLoading] = React.useState<boolean>(true); // State for loading
  const [tvReady, setTvReady] = React.useState<boolean>(false); // State to track if TradingView library is loaded

  // Check if TradingView library is loaded
  useEffect(() => {
    const checkTradingViewLib = (): boolean => {
      if (
        typeof window !== "undefined" &&
        window.TradingView &&
        typeof window.TradingView.widget === "function"
      ) {
        setTvReady(true);
        return true;
      }
      return false;
    };

    // First check
    if (checkTradingViewLib()) {
      return;
    }

    // Dynamically load the TradingView script
    const script = document.createElement("script");
    script.src = "/charting_library/charting_library.js";
    script.defer = true;
    script.onload = () => {
      checkTradingViewLib();
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Datafeed adapter for the TradingView widget
  const getDatafeedAdapter = () => ({
    onReady: (callback: Function) => {
      setTimeout(() => {
        callback({
          supported_resolutions: ["60"], // Supported intervals
          supports_time: true,
          supports_marks: false,
          supports_timescale_marks: false,
        });
      }, 0);
    },
    searchSymbols: (
      userInput: string,
      exchange: string,
      symbolType: string,
      onResult: (symbols: any[]) => void
    ) => {
      onResult([]); // Empty search result
    },
    resolveSymbol: (
      symbolName: string,
      onSymbolResolvedCallback: Function,
      onResolveErrorCallback: Function
    ) => {
      setTimeout(() => {
        try {
          onSymbolResolvedCallback({
            name: symbolName,
            description: "",
            type: "crypto",
            session: "24x7",
            timezone: "Etc/UTC",
            exchange: "",
            minmov: 1,
            pricescale: 100000000,
            has_intraday: true,
            visible_plots_set: "ohlc",
            has_weekly_and_monthly: false,
            supported_resolutions: ["1", "5", "15", "60", "1D", "1W", "1M"],
            volume_precision: 8,
            data_status: "streaming",
            format: "price",
          });
        } catch (error) {
          onResolveErrorCallback("Error resolving symbol");
        }
      }, 0);
    },
    getBars: (
      symbolInfo: any,
      resolution: string,
      periodParams: { from: number; to: number },
      onHistoryCallback: Function,
      onErrorCallback: Function
    ) => {
      try {
        const { from, to } = periodParams;

        const validData = data.filter(
          (candle) =>
            candle &&
            typeof candle === "object" &&
            candle.time &&
            candle.open &&
            candle.high &&
            candle.low &&
            candle.close
        );

        const filteredData = validData.filter(
          (candle) => candle.time >= from && candle.time <= to
        );

        const formattedData = filteredData.map((candle) => ({
          time: candle.time * 1000, // Convert to milliseconds
          open: Number(candle.open),
          high: Number(candle.high),
          low: Number(candle.low),
          close: Number(candle.close),
        }));

        onHistoryCallback(formattedData, {
          noData: formattedData.length === 0,
        });
      } catch (error) {
        onErrorCallback(error);
      }
    },
    subscribeBars: () => {},
    unsubscribeBars: () => {},
    getServerTime: (callback: Function) => {
      callback(Math.floor(Date.now() / 1000)); // Return current time in seconds
    },
  });

  // Initialize TradingView widget
  useEffect(() => {
    if (!containerRef.current || !data?.length || !tvReady) return;

    const widgetOptions: any = {
      symbol: symbol || "ATH/USDT", // Default symbol
      interval: getIntervalFromTimeWindow(timeWindow),
      container: containerRef.current,
      library_path: "/charting_library/",
      locale: "en",
      datafeed: getDatafeedAdapter(),
      disabled_features: [
        "use_localstorage_for_settings",
        "timeframes_toolbar",
        "symbol_search_hot_key",
        "header_symbol_search",
        "header_compare",
        "header_screenshot",
        "display_market_status",
        "volume_force_overlay",
        "header_widget_dom_node",
        "header_saveload",
        "header_resolutions",
        "header_interval_dialog_button",
        "show_interval_dialog_on_key_press",
      ],
      fullscreen: false,
      autosize: true,
      theme: "Dark",
      custom_css_url: "/css/trading_view.css",
    };

    try {
      const tvWidget = new window.TradingView.widget(widgetOptions);
      tvWidgetRef.current = tvWidget;

      tvWidget.onChartReady(() => {
        setIsLoading(false);
      });
    } catch (error) {
      console.error("TradingView widget error:", error);
      setIsLoading(false);
    }

    return () => {
      if (tvWidgetRef.current) {
        try {
          tvWidgetRef.current.remove();
          tvWidgetRef.current = null;
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      }
    };
  }, [data, timeWindow, tvReady, symbol]);

  // Handle touch interactions
  useEffect(() => {
    if (!containerRef.current) return;

    const handleTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const isChartElement =
        target.closest(".chart-container") ||
        target.closest(".chart-markup-table") ||
        target.closest(".pane");

      if (isChartElement && e.cancelable) {
        e.preventDefault();
      }
    };

    const element = containerRef.current;

    const options: AddEventListenerOptions = { passive: false };
    element.addEventListener("touchstart", handleTouch, options);
    element.addEventListener("touchmove", handleTouch, options);

    return () => {
      element.removeEventListener("touchstart", handleTouch, options);
      element.removeEventListener("touchmove", handleTouch, options);
    };
  }, []);

  // Get interval based on the time window
  const getIntervalFromTimeWindow = (timeWindow: string): string => {
    switch (timeWindow) {
      case timeframeOptions.HOUR:
        return "15";
      case timeframeOptions.MINUTE:
        return timeframeOptions.MINUTE;
      default:
        return timeWindow;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height: width * 0.5 }); // Assuming you want height to be half of width
    }
  }, []);
  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {dimensions.width > 0 && (
        <ChartContainer
          width={dimensions.width}
          height={dimensions.height}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* {(isLoading || !tvReady) && (
            <LoadingWrapper>
              <LocalLoader />
            </LoadingWrapper>
          )} */}
        </ChartContainer>
      )}
    </div>
  );
};

export default React.memo(CandleStickChart);
