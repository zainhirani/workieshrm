import { CSSObject, InputBase, Theme, alpha } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiBox, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Search = styled(MuiBox)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.borderRadius.radius1,
  // backgroundColor: theme.additionalColors?.lightGrey,
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  // background: theme.additionalColors?.grey,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled(MuiBox)(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  height: "100%",
  // position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.additionalColors?.searchIcon,
  // background: theme.additionalColors?.grey,
  zIndex: "999",
  "&:hover": {
    cursor: "pointer",
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    color: theme.palette.text.secondary,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "200px",
    },
  },
}));
