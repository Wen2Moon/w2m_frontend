"use client";

import HomeGeneral from "@/components/HomeGeneral";
import { Box } from "@mui/material";
import Footer from "@/layouts/FooterComponent";
import FormDeposit from "@/components/FormDeposit"

export default function Home () {

  return (
    <main>
      <Box  
        display="flex"
        justifyContent="center"
        marginY={6}
        flexDirection="column"
      >
        {/* <FormDeposit /> */}
        <HomeGeneral />
      </Box>
    
    </main>
  );
};
