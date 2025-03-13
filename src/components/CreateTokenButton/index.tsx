"use client";
import Image from "next/image";
import createIcon from "../../public/images/icons/create.svg";
import Link from "next/link";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const CreateTokenButton = ({ className }: any) => {
  const { open } = useWeb3Modal();

  return (
    <Link href={"/create-token"} className={className}>
      <Image src={createIcon} width={21} height={21} alt="logo" />
      <span>Create token</span>
    </Link>
  );
};

export default CreateTokenButton;
