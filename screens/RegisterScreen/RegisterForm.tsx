import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Select,
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
import { Close, KeyboardArrowDown } from "@mui/icons-material";
import { useOrganizationTypeListing } from "providers/OrganizationType";
import { useCreateCompanyDetail } from "providers/CompanyDetail";
import { useSnackbar } from "notistack";
import { getAuthenticationToken, setAuthenticationHeader } from "services";

const validationSchema = Yup.object().shape({
  Name: Yup.string().required().label("Name"),
  Email: Yup.string().required().email().label("Email"),
  PrimaryMobileNo: Yup.string().required().label("Mobile No"),
  // SecondaryMobileNo: Yup.string().required().label("Secondary Mobile No"),
  OrganizationName: Yup.string().required().label("Organization Name"),
  OrganizationType: Yup.string().required().label("Organization Type"),
  CardNumber: Yup.string().required().label("Card Number"),
});

const RegisterForm = () => {
  const [loading,setLoading]=useState(false);
  const router = useRouter();
  const {enqueueSnackbar,closeSnackbar} = useSnackbar()
  const organizationType = useOrganizationTypeListing({});
  const companyDetail = useCreateCompanyDetail();
  const organization = organizationType?.data?.data?.items?.map((item) => ({ value: item._id || "", label: item.Name || "" }));
  const onSubmit = (data: any,{resetForm}:any) => {    
    companyDetail.mutate({
      Name: data.Name,
      Email: data.Email,
      PrimaryMobileNo: data.PrimaryMobileNo,
      SecondaryMobileNo: data.SecondaryMobileNo,
      OrganizationName: data.OrganizationName,
      OrganizationType: data.OrganizationType,
      CardNumber: data.CardNumber,
    });
    resetForm();
    setLoading(true);
  };
  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched,setFieldValue } =
    useFormik({
      initialValues: { Name:"",Email: "", PrimaryMobileNo: "",SecondaryMobileNo:"",OrganizationName:"",OrganizationType:"",CardNumber:"" },
      validationSchema,
      onSubmit,
    });

    const handleSigninClick = () => {
      router.push("/login");
      setLoading(true);
    }

  // handleResetPass
  const handleResetPass = (email: string) => {};

  const userPlaceholder = useFormattedMessage(messages.userPlaceholder);
  const emailPlaceholder = useFormattedMessage(messages.emailPlaceholder);
  const mobilePlaceholder = useFormattedMessage(messages.mobilePlaceholder);

  useEffect(() => {
    if (companyDetail.isSuccess) {
      enqueueSnackbar(
        "Registered Successfully",
        {
          variant: "success",
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <Close sx={{ color: "#fff" }} />
            </IconButton>
          ),
        },
      );
      setLoading(false);
      localStorage.setItem("companyToken",companyDetail.data.token);
      router.replace("/verification");
    }
  }, [companyDetail.isSuccess]);

  useEffect(() => {
    if (companyDetail.isError) {
      const errorMessage = companyDetail.error.message;
      enqueueSnackbar(
        "An error occured!, please try again.",
        {
          variant: "error",
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <Close sx={{ color: "#fff" }} />
            </IconButton>
          ),
        },
      );
      setLoading(false);
    }
  }, [companyDetail.isError]);

  console.log(values,errors,"values, errors")

  return (
    <>
    <Loader show={loading} />
    <form onSubmit={handleSubmit}>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <TextField
            id="Name"
            label={<FormattedMessage {...messages.userLabel} />}
            value={values.Name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder={userPlaceholder}
            error={touched.Name && Boolean(errors.Name)}
            helperText={touched.Name && errors.Name}
            autoComplete="off"
            sx={{ ".MuiOutlinedInput-notchedOutline": { color: "rgba(76, 78, 100, 0.68)" }, "fieldset": { borderColor: "rgba(76, 78, 100, 0.68)" }, ".MuiInputBase-input": { color: "rgba(76, 78, 100, 0.68)" }, ".MuiFormLabel-root,.MuiInputLabel-root": { color: "rgba(76, 78, 100, 0.68)" } }} />
        </Grid>
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
           type="tel"
            id="PrimaryMobileNo"
            label={<FormattedMessage {...messages.mobileLabel} />}
            value={values.PrimaryMobileNo}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            placeholder={mobilePlaceholder}
            error={touched.PrimaryMobileNo && Boolean(errors.PrimaryMobileNo)}
            helperText={touched.PrimaryMobileNo && errors.PrimaryMobileNo}
            autoComplete="off"
            sx={{ ".MuiOutlinedInput-notchedOutline": { color: "rgba(76, 78, 100, 0.68)" }, "fieldset": { borderColor: "rgba(76, 78, 100, 0.68)" }, ".MuiInputBase-input": { color: "rgba(76, 78, 100, 0.68)" }, ".MuiFormLabel-root,.MuiInputLabel-root": { color: "rgba(76, 78, 100, 0.68)" } }} />
        </Grid>
        <Grid item>
          <TextField
           type="tel"
            id="SecondaryMobileNo"
            label="Secondary Mobile No."
            value={values.SecondaryMobileNo}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            placeholder="Enter Secondary Mobile No."
            error={touched.SecondaryMobileNo && Boolean(errors.SecondaryMobileNo)}
            helperText={touched.SecondaryMobileNo && errors.SecondaryMobileNo}
            autoComplete="off"
            sx={{ ".MuiOutlinedInput-notchedOutline": { color: "rgba(76, 78, 100, 0.68)" }, "fieldset": { borderColor: "rgba(76, 78, 100, 0.68)" }, ".MuiInputBase-input": { color: "rgba(76, 78, 100, 0.68)" }, ".MuiFormLabel-root,.MuiInputLabel-root": { color: "rgba(76, 78, 100, 0.68)" } }} />
        </Grid>
        <Grid item>
          <TextField
            id="OrganizationName"
            label="Organization Name"
            value={values.OrganizationName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Organization Name"
            error={touched.OrganizationName && Boolean(errors.OrganizationName)}
            helperText={touched.OrganizationName && errors.OrganizationName}
            autoComplete="off"
            sx={{ ".MuiOutlinedInput-notchedOutline": { color: "rgba(76, 78, 100, 0.68)" }, "fieldset": { borderColor: "rgba(76, 78, 100, 0.68)" }, ".MuiInputBase-input": { color: "rgba(76, 78, 100, 0.68)" }, ".MuiFormLabel-root,.MuiInputLabel-root": { color: "rgba(76, 78, 100, 0.68)" } }} />
        </Grid>
        <Grid item>
        <Autocomplete
          options={organization || []}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Organization Type"
            />
          )}
          value={organization?.find((option) => option.value == values.OrganizationType) || null}
          onChange={(e, values) => {
          setFieldValue("OrganizationType", values?.value || null);
          }}
        />
        </Grid>
        <Grid item>
          <TextField
            id="CardNumber"
            label="Card Number"
            value={values.CardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Card Number"
            error={touched.CardNumber && Boolean(errors.CardNumber)}
            helperText={touched.CardNumber && errors.CardNumber}
            autoComplete="off"
            sx={{ ".MuiOutlinedInput-notchedOutline": { color: "rgba(76, 78, 100, 0.68)" }, "fieldset": { borderColor: "rgba(76, 78, 100, 0.68)" }, ".MuiInputBase-input": { color: "rgba(76, 78, 100, 0.68)" }, ".MuiFormLabel-root,.MuiInputLabel-root": { color: "rgba(76, 78, 100, 0.68)" } }} />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <FormControlLabel
          control={<Checkbox
            id="Remember"
            name="fav_language"
            value="Remember"
            sx={{ color: "rgba(76, 78, 100, 0.68)", "span": { color: "rgba(76, 78, 100, 0.68)" } ,"label":{mr:"3px"}}} />}
          label={<FormattedMessage {...messages.agreeLabel} />} />
        <Link
          href="#"
          sx={{ color: "#666CFF",ml:"-10px" }}
        >
          <FormattedMessage {...messages.agreeText} />
        </Link>
      </Box>

      <Box>
        <ButtonWrapper sx={{ background: "#666CFF", textTransform: "uppercase", "&:hover": { background: "#666CFF" } }} type="submit" variant="contained">
          <FormattedMessage {...messages.signUp} />
        </ButtonWrapper>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
          gap: "10px"
        }}
      >
        <Typography sx={{ color: "rgba(76, 78, 100, 0.68)" }}>
          <FormattedMessage {...messages.textSignIn} />
        </Typography>
        <Link sx={{ color: "#666CFF",cursor:"pointer" }} onClick={handleSigninClick} underline="none">
          <FormattedMessage {...messages.signIn} />
        </Link>
      </Box>
    </form></>
  );
};

export default RegisterForm;
