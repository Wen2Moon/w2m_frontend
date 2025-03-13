import { WindowProvider } from "wagmi"
import 'wagmi/window'
export function getTrustWalletProvider(): WindowProvider | undefined {
    const isTrustWallet = (ethereum: NonNullable<Window['ethereum']>) => {
      // Identify if Trust Wallet injected provider is present.
      const trustWallet = !!ethereum.isTrust
  
      return trustWallet
    }
  
    const injectedProviderExist = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
  
    // No injected providers exist.
    if (!injectedProviderExist) {
      return
    }
  
    // Trust Wallet was injected into window.ethereum.
    if (isTrustWallet(window.ethereum as NonNullable<Window['ethereum']>)) {
      return window.ethereum
    }
  
    // Trust Wallet provider might be replaced by another
    // injected provider, check the providers array.
    if (window.ethereum?.providers) {
      return window.ethereum.providers.find(isTrustWallet)
    }
  
    // In some cases injected providers can replace window.ethereum
    // without updating the providers array. In those instances the Trust Wallet
    // can be installed and its provider instance can be retrieved by
    // looking at the global `trustwallet` object.
    return window.trustwallet
  }