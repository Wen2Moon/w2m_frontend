"use client";

import { Box } from "@mui/material";
import Footer from "@/layouts/FooterComponent";
import FormDeposit from "@/components/FormDeposit"
import Profile from "@/components/Profile";

export default function ProfilePage () {

  return (
    <main>
      <Box  
        display="flex"
        justifyContent="center"
        marginY={6}
        flexDirection="column"
      >
        {/* <FormDeposit /> */}
        <Profile />
      </Box>
      {/* <Footer /> */}
    </main>
  );
};
