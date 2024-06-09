import React from "react";
import { BottomNavigationActionTypeMap, IconButton } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import RightMenu from "./RightMenu";
import SearchField from "./Search Field";
import { AppBar, BoxWrapper, Toolbar } from "./Styled";

interface BarComponentProps {
  open?: boolean;
  clickHandler?: any;
}

const AppBarComponent: React.FC<BarComponentProps> = ({
  open,
  clickHandler,
}) => {
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <BoxWrapper>
            <IconButton
              onClick={clickHandler}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <KeyboardArrowRightOutlinedIcon
                sx={{ color: "rgba(76,78,100,0.68)", marginRight: "-18px" }}
              />
              <KeyboardArrowRightOutlinedIcon
                sx={{ color: "rgba(76,78,100,0.38)" }}
              />
            </IconButton>
            <SearchField />
          </BoxWrapper>
          <BoxWrapper>
            <RightMenu />
          </BoxWrapper>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppBarComponent;
