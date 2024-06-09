import CardHeader, { CardHeaderProps } from "@mui/material/CardHeader";
import InputLabel, { InputLabelProps } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import MuiBox, { BoxProps } from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import {
  FormControlLabel,
  FormControlLabelProps,
  IconButton,
  IconButtonProps,
  Radio,
  RadioGroup,
  useRadioGroup,
} from "@mui/material";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";

export const CardHeaderWrapper = styled(CardHeader)<CardHeaderProps>(
  ({ theme }) =>
    ({
      color: theme.palette.primary.main,
      fontSize: "24px",
      paddingBottom: 0,
      textAlign:"center",
    } as any),
) as (props: CardHeaderProps) => JSX.Element;

export const InputLabelWrapper = styled(InputLabel)<InputLabelProps>(
  ({ theme }) =>
    ({
      marginBottom: theme.spacing(1),
      color: theme.palette.text.primary,
      fontSize: "14px",
    } as any),
) as (props: InputLabelProps) => JSX.Element;

export const BoxWrapper = styled(MuiBox)<BoxProps>(
  ({ theme }) =>
    ({
      display: "flex",
      padding: theme.spacing(15, 0),
      alignItems: "center",
      flexDirection: "row",
      height: "100vh", //theme.height.barHeight
      justifyContent: "center",
    } as any),
) as (props: BoxProps) => JSX.Element;

export const ButtonWrapper = styled(Button)<ButtonProps>(
  ({ theme }) =>
    ({
      display: "inline-block",
      fontSize: "16px",
      fontWeight: "400",
      height: "50px",
      lineHeight: "50px",
      textAlign: "center",
      padding: "0 50px",
      position: "relative",
      zIndex: "1",
      overflow: "hidden",
      color: theme.palette.primary.light,
      borderRadius: theme.borderRadius.radius1,
      textTransform: "capitalize",
      width: "100%",
    } as any),
) as (props: ButtonProps) => JSX.Element;

export const LoadingButtonWrapper = styled(LoadingButton)<LoadingButtonProps>(
  ({ theme }) =>
    ({
      display: "inline-block",
      fontSize: "16px",
      fontWeight: "400",
      height: "50px",
      lineHeight: "50px",
      textAlign: "center",
      padding: "0 50px",
      position: "relative",
      zIndex: "1",
      overflow: "hidden",
      // color: theme.palette.primary.light,
      color: "#fff",
      background:theme.palette.primary.main,
      borderRadius: theme.borderRadius.radius1,
      textTransform: "capitalize",
      width: "50%",
    } as any),
) as (props: LoadingButtonProps) => JSX.Element;

export const IconButtonWrapper = styled(IconButton)<IconButtonProps>(
  ({ theme }) => ({
    padding: 0,
    margin: 0,
    height: "12px",
    color: theme.palette.primary.main,
  }),
) as (props: IconButtonProps) => JSX.Element;
