import { ChainId as Config } from "./chainId"

export default function getExplorerUrl(chainId: number | undefined): string {
    if (!chainId) return ""
    const urls: any = {
        [Config.BSC_TESTNET]: "https://testnet.bscscan.com",
        [Config.POLYGON_ZKEVM_TESTNET]: "https://mumbai.polygonscan.com",
        [Config.BSC]: "https://bscscan.com",
        [Config.ETHEREUM]: "https://etherscan.io",
        [Config.POLYGON_ZKEVM]: "https://polygonscan.com"
    }
    return urls[chainId] || ""
}