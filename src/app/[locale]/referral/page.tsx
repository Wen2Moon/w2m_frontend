"use client";
// ReferralDashboard.tsx
import React, { useState } from "react";

interface ReferralStats {
  totalReferrals: number;
  totalEthEarned: number;
  totalUsdtEarned: number;
  totalAthEarned: number;
}

interface ReferralInfo {
  referralLink: string;
  referralCode: string;
}

const ReferralDashboard: React.FC = () => {
  const [inviterCode, setInviterCode] = useState<string>("");

  const stats: ReferralStats = {
    totalReferrals: 0,
    totalEthEarned: 0,
    totalUsdtEarned: 0,
    totalAthEarned: 0,
  };

  const referralInfo: ReferralInfo = {
    referralLink: "https://gra.fun/?ref=WAP189syVpkqY0Q00nrC8JLTMrS",
    referralCode: "WAP189syVpkqY0Q00nrC8JLTMrS",
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Có thể thêm toast notification ở đây
  };

  return (
    <div className="min-h-screen  text-white p-8">
      <div className="container mx-auto py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-yellow-400">
            Invite your friends and earn rewards!
          </h1>
          <p className="text-white  font-semibold">
            <span className="text-[#FBB215]">Earn 10%</span> from the platform
            fees from every trade your invited friends make,
            <br />
            <span className="text-[#FBB215]">plus 10%</span> of the W2M they
            accumulate through on-chain actions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 py-10 px-8 bg-blacklight  rounded-2xl">
          {[
            { label: "Total Referrals:", value: stats.totalReferrals },
            { label: "Total ETH earned:", value: stats.totalEthEarned },
            { label: "Total USDT earned:", value: stats.totalUsdtEarned },
            { label: "Total W2M Earned:", value: stats.totalAthEarned },
          ].map((stat, index) => (
            <div key={index} className="bg-[#252525] rounded-lg p-4 text-left">
              <p className="text-white font-bold text-[28px]">{stat.label}</p>
              <p className="text-[#FBB215] text-[28px] font-bold">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Inviter Code Input */}
        <div className=" px-8 py-8 space-y-2 bg-blacklight rounded-2xl">
          <label className="block text-gray-300">
            Who Invited Me (Please enter inviter{"'"}s referral code)
          </label>
          <input
            type="text"
            value={inviterCode}
            onChange={(e) => setInviterCode(e.target.value)}
            className="w-full p-2 pl-4 bg-bgBtn border border-[#FFFFFF] text-white rounded-md placeholder-gray-500"
            placeholder="Inviter's referral code"
          />
        </div>

        {/* Referral Link */}
        <div className=" px-8 py-12 space-y-6 bg-blacklight rounded-2xl">
          <label className="block text-gray-300">My Referral Link</label>
          <div className="flex gap-6 mt-6">
            <input
              type="text"
              readOnly
              value={referralInfo.referralLink}
              className="w-full p-2 pl-4 bg-bgBtn border border-[#FFFFFF] text-white rounded-md placeholder-gray-500"
            />
            <button
              onClick={() => handleCopy(referralInfo.referralLink)}
              className={`py-0.5 text-black rounded-md bg-gradient-orange px-4 flex items-center justify-center gap-2
                text-base font-semibold
                `}
            >
              Copy
            </button>
          </div>
          {/* Referral Code */}
          <div className="space-y-6 pt-8">
            <label className="block text-gray-300">My Referral Code</label>
            <div className="flex gap-6 mt-6">
              <input
                type="text"
                readOnly
                value={referralInfo.referralCode}
                className="w-full p-2 pl-4 bg-bgBtn border border-[#FFFFFF] text-white rounded-md placeholder-gray-500"
              />
              <button
                onClick={() => handleCopy(referralInfo.referralCode)}
                className={` py-0.5 text-black rounded-md bg-gradient-orange px-4 flex items-center justify-center gap-2
                    text-base font-semibold
                    `}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralDashboard;
