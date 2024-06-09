import { CSSObject, InputBase, Theme, alpha } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiBox, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const drawerWidth = 260;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  zIndex: 4,
  // backgroundColor: theme.palette.background.paper,
  background: theme.palette.background.default,
  border: "none",
  // boxShadow: theme.shadow.boxShadow,
  backgroundImage: "none",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
export const Toolbar = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  height: "65px",
  alignItems: "center",
  padding: "20px",
}));

export const BoxWrapper = styled(MuiBox)<BoxProps>(
  ({ theme }) =>
    ({
      display: "flex",
      padding: "0",
      alignItems: "center",
      flexDirection: "row",
      height: theme.height.barHeight,
      justifyContent: "space-between",
    } as any),
) as (props: BoxProps) => JSX.Element;
