import * as React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import AppBarComponent from "./AppBar";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import { DrawerHeader } from "./DrawerContent/Styled";
interface Props {
  children?: JSX.Element;
}

const PageLayout = (props: Props) => {
  const primaryDrawerWidth = 260;
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const isSmScreen = useMediaQuery("(max-width:600px)");
  React.useEffect(() => {
    if (isSmScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmScreen]);
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: open ? primaryDrawerWidth : 50,
        }}
        component="nav"
      >
        <Drawer
          open={open}
          width={open ? primaryDrawerWidth : 50}
          onClose={handleDrawerClose}
        >
          <DrawerContent clickHandler={handleDrawerClose} open={open} />
        </Drawer>
      </Box>

      <AppBarComponent open={open} clickHandler={handleDrawerOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: "20px 20px 0 20px",
          width: { sm: `calc(100% - ${primaryDrawerWidth}px )` },
          marginTop: 7,
        }}
      >
        {props.children ? props.children : null}
        <Box sx={{ display: "flex", justifyContent: "center", my: 3}}>
          <Typography fontWeight={600}>
            Copyrights © 2023, All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PageLayout;
