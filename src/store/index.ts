import { create } from "zustand";

type Store = {
  tokenClaimAvailable: string;
  claimProof: any;
  isClaimed: boolean;
  updateTokenClaimAvailable: any;
  updateIsClaimed: any;
  isCountdown: boolean;
  updateIsCountdown: any;
};

type StoreShowFeature = {
  featureShow: any;
  updateFeatureShow: any;
};

export const useStore = create<Store>()((set) => ({
  tokenClaimAvailable: "",
  isClaimed: false,
  isCountdown: true,
  claimProof: [],
  updateTokenClaimAvailable: (claimResponse: any) =>
    set({
      tokenClaimAvailable: claimResponse.amount,
      claimProof: claimResponse.claimProof && typeof claimResponse.claimProof === 'string'
        ? claimResponse.claimProof
        : "",
    }),
  updateIsClaimed: (status: any) => set({ isClaimed: status }),
  updateIsCountdown: (status: any) => set({ isCountdown: status }),
}));

export const useStoreShowFeature = create<StoreShowFeature>((set) => ({
  featureShow: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false
  },
  updateFeatureShow: (feature: any) => set({ featureShow: feature }),
}));
