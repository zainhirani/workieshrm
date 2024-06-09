import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoaderProps {
  show: boolean;
}

const Loader: React.FC<LoaderProps> = ({ show }) => {
  return show ? (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bgcolor="rgba(255, 255, 255, 0.8)"
      zIndex={9999}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
    >
      <CircularProgress />
    </Box>
  ) : null;
};

export default Loader;
