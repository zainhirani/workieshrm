import React from "react";
import { Avatar, Badge, IconButton } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { green } from "@mui/material/colors";
import ThemeSwitcher from "components/ThemeSwitch";

const RightMenu = () => {
  return (
    <>
      <ThemeSwitcher />
      <IconButton>
        <Badge color="success">
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-2%",
              right: 0,
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: green[500],
              border: (theme) => `2px solid ${theme.palette.background.paper}`,
            },
          }}
          alt="John"
          src="user.png"
        />
      </IconButton>
    </>
  );
};

export default RightMenu;
