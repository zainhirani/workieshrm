import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie"
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormattedMessage, { useFormattedMessage } from "theme/FormattedMessage";
import messages from "./messages";
import { ButtonWrapper } from "./Styled";
import { useRouter } from "next/router";
import Loader from "components/Loader/Loader";
import { useSnackbar } from "notistack";
import { useAuthContext } from "contexts/AuthContext";
import { Close } from "@mui/icons-material";
import { useCeoLogin, useMainLogin, useMe } from "providers/Login";

const validationSchema = Yup.object().shape({
  Email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const LoginForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuthContext();
  // const login = useCeoLogin();
  const login = useMainLogin();
  const me = useMe({})

  const onSubmit = useCallback(async (data: any) => {
    if (!loading) {
      setLoading(true);
    }
    const resp: any = await login.mutate({ UserId: data.Email, password: data.password })
    // const resp: any = await login.mutate({ Email: data.Email, password: data.password })
    // ("credentials", {
    //   ...data,
    // //   redirect: false
    // // });
    // console.log(resp,"resp")
    // try {
    //   setLoading(true);
    //   if (!resp?.ok) {
    //     setLoading(false);
    //     throw new Error("Request failed");
    //   }
    //   if (!resp.error) {
    //     setLoading(false);
    //     router.push("/settings");
    //     enqueueSnackbar("Logged in Successfully!", {
    //       variant: "success",
    //       action: (key) => (
    //         <IconButton onClick={() => closeSnackbar(key)} size="small">
    //           <Close sx={{ color: "#fff" }} />
    //         </IconButton>
    //       ),
    //     });
    //     // localStorage.setItem(TOKEN, resp?.data.token);
    //   }
    // } catch (error: any) {
    //   if (resp.error) {
    //     setLoading(false);
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     enqueueSnackbar("Invalid Email or Password", {
    //       variant: "error",
    //       action: (key) => (
    //         <IconButton onClick={() => closeSnackbar(key)} size="small">
    //           <Close sx={{ color: "#fff" }} />
    //         </IconButton>
    //       ),
    //     });
    //   }
    // }
    // console.log(resp, "resp");
  }, []);

  useEffect(() => {
    if (login.isSuccess) {
      enqueueSnackbar("Logged in Successfully!", {
        variant: "success",
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <Close sx={{ color: "#fff" }} />
          </IconButton>
        ),
      });
      setLoading(false);
      Cookies.set("token", login.data.token)
      //@ts-ignore
      me?.data?.data?.Type == "Employee" ? router.push("/") : router.push("/settings")
      // localStorage.setItem(TOKEN, createOrganization?.data.token);
    }
  }, [login.isSuccess]);

  useEffect(() => {
    if (login.isError) {
      const errorMessage = login.error.message;
      enqueueSnackbar(errorMessage, {
        variant: "error",
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <Close sx={{ color: "#fff" }} />
          </IconButton>
        ),
      });
      setLoading(false);
    }
  }, [login.isError]);

  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { Email: "", password: "" },
      validationSchema,
      onSubmit,
    });
  const handleSignupClick = () => {
    router.push("/register");
    setLoading(true);
  }

  // handleResetPass
  const handleResetPass = (email: string) => { };

  const emailPlaceholder = useFormattedMessage(messages.emailPlaceholder);
  const passwordPlaceholder = useFormattedMessage(messages.passwordPlaceholder);

  return (
    <><Loader show={loading} /><form onSubmit={handleSubmit}>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <TextField
            id="Email"
            label={<FormattedMessage {...messages.emailLabel} />}
            value={values.Email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder={emailPlaceholder}
            error={touched.Email && Boolean(errors.Email)}
            helperText={touched.Email && errors.Email}
            autoComplete="off"
            sx={{ ".MuiOutlinedInput-notchedOutline": { color: "rgba(76, 78, 100, 0.68)" }, "fieldset": { borderColor: "rgba(76, 78, 100, 0.68)" }, ".MuiInputBase-input": { color: "rgba(76, 78, 100, 0.68)" }, ".MuiFormLabel-root,.MuiInputLabel-root": { color: "rgba(76, 78, 100, 0.68)" } }} />
        </Grid>

        <Grid item>
          <TextField
            id="password"
            label={<FormattedMessage {...messages.passwordLabel} />}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            placeholder={passwordPlaceholder}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            autoComplete="off"
            sx={{ ".MuiOutlinedInput-notchedOutline": { color: "rgba(76, 78, 100, 0.68)" }, "fieldset": { borderColor: "rgba(76, 78, 100, 0.68)" }, ".MuiInputBase-input": { color: "rgba(76, 78, 100, 0.68)" }, ".MuiFormLabel-root,.MuiInputLabel-root": { color: "rgba(76, 78, 100, 0.68)" } }} />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <FormControlLabel
          control={<Checkbox
            id="Remember"
            name="fav_language"
            value="Remember"
            sx={{ color: "rgba(76, 78, 100, 0.68)", "span": { color: "rgba(76, 78, 100, 0.68)" } }} />}
          label={<FormattedMessage {...messages.rememberLabel} />} />
        {/* <Link
          href="#"
          underline="none"
          sx={{ color: "#666CFF" }}
          onClick={() => handleResetPass(values.Email)}
        >
          <FormattedMessage {...messages.forgot} />
        </Link> */}
      </Box>

      <Box>
        <ButtonWrapper sx={{ background: "#666CFF", textTransform: "uppercase", "&:hover": { background: "#666CFF" } }} type="submit" variant="contained">
          <FormattedMessage {...messages.signIn} />
        </ButtonWrapper>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
          gap: "10px",
          flexDirection: { xs: "column", sm: "row" }
        }}
      >
        <Typography sx={{ color: "rgba(76, 78, 100, 0.68)" }}>
          <FormattedMessage {...messages.textSignUp} />
        </Typography>
        <Link sx={{ color: "#666CFF", cursor: "pointer" }} onClick={handleSignupClick} underline="none">
          <FormattedMessage {...messages.signUp} />
        </Link>
      </Box>
    </form></>
  );
};

export default LoginForm;
