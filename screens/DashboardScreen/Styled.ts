import MuiBox, { BoxProps } from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const BoxWrapper = styled(MuiBox)<BoxProps>(
  ({ theme }) =>
    ({
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      padding: theme.spacing(3),
      justifyContent: "space-between",
      boxShadow: theme.shadow.boxShadow,
      borderRadius: theme.borderRadius.radius1,
    } as any),
) as (props: BoxProps) => JSX.Element;

export const IconWrapper = styled(MuiBox)<BoxProps>(
  ({ theme }) =>
    ({
      width: "48px",
      height: "48px",
      lineHeight: "55px",
      fontSize: "22px",
      fontWidth: "600",
      textAlign: "center",
      borderRadius: "100px",
      marginRight: "10px",
      boxShadow: theme.shadow.boxShadow,
    } as any),
) as (props: BoxProps) => JSX.Element;

export const ButtonWrapper = styled(Button)<ButtonProps>(
  ({ theme }) =>
    ({
      fontSize: "13px",
      fontWeight: "300",
      textTransform: "capitalize",
      borderRadius: theme.borderRadius.radius1,
      backgroundColor: theme.palette.primary.main,
    } as any),
) as (props: ButtonProps) => JSX.Element;
