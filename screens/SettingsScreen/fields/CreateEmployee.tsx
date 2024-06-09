import {
  Box,
  Button,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  styled,
  useRadioGroup,
  IconButton,
  Autocomplete,
} from "@mui/material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import moment from "moment"
import {
  IconButtonWrapper,
  InputLabelWrapper,
  LoadingButtonWrapper,
} from "../Styled";
import FormattedMessage, { useFormattedMessage } from "theme/FormattedMessage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import * as Yup from "yup";
import messages from "../messages";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
// import { useProfile } from "providers/Users";
import { useSnackbar } from "notistack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useCreateEmployee } from "providers/Employee";
import { useDesignationListing } from "providers/Designation";
import { useMaritalStatusListing } from "providers/MaritalStatus";
import CircularImageUpload from "components/CircularImageUpload/CircularImageUpload";
import { useCityListing } from "providers/Employee/City";
import { useEmployeeLogin } from "providers/Employee/Login";
import Cookies from "js-cookie"
import Loader from "components/Loader/Loader";
interface StepTwoProps {
  handlePrev: () => void;
  handleNext: () => void;
  formValues: any;
  setFormValues: any;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().label("Name"),
  email: Yup.string().required().email().label("Email"),
  // password: Yup.string().required().min(6).label("Password"),
  // mobileNo: Yup.string().label("Mobile No."),
  cnic: Yup.string().label("CNIC No."),
  // dob: Yup.string().label("Date of Birth"),
  // doj: Yup.string().label("Date of Joining"),
  // maritalStatus: Yup.string().label("Marital Status"),
  // designation: Yup.string().label("Designation"),
  // profileImg: Yup.string().label("Profile Image"),
  // manager: Yup.string().label("Manager"),
  // residentialAddress: Yup.string().label("Residential Address"),
  // permanentAddress: Yup.string().label("Permanent Address"),
  // city: Yup.string().label("City"),
  // country: Yup.string().label("Country"),
  // state: Yup.string().label("State/Province"),
  // zip: Yup.string().label("ZIP Code"), 
});

export const StepTwo = ({ handlePrev, handleNext, formValues, setFormValues }: StepTwoProps) => {
  const mobilePlaceholder = useFormattedMessage(messages.mobilePlaceholder);
  const namePlaceholder = useFormattedMessage(messages.namePlaceholder);
  const cnicPlaceholder = useFormattedMessage(messages.cnicPlaceholder);
  const reportingPlaceholder = useFormattedMessage(messages.reportingPlaceholder);
  const residentialAddressPlaceholder = useFormattedMessage(messages.residentialAddressPlaceholder);
  const permanentAddressPlaceholder = useFormattedMessage(messages.permanentAddressPlaceholder);
  const cityPlaceholder = useFormattedMessage(messages.cityPlaceholder);
  const emailPlaceholder = useFormattedMessage(messages.emailPlaceholder);
  const passwordPlaceholder = useFormattedMessage(messages.passwordlaceholder);
  const zipPlaceholder = useFormattedMessage(messages.zipPlaceholder);
  const [dobValue, setDobValue] = useState<Date | string>();
  const [dojValue, setDojValue] = useState<Date | string>();
  const createEmployee = useCreateEmployee();
  const loginEmployee = useEmployeeLogin();
  const maritalStatus = useMaritalStatusListing({});
  const designationListing = useDesignationListing({});
  const cityListing = useCityListing({});
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const designations = designationListing?.data?.data?.items?.map((item) => ({ value: item._id, label: item.Name }))
  const maritalSelect = maritalStatus?.data?.data?.items?.map((item) => ({ value: item._id, label: item.Name }))
  const cities = cityListing?.data?.data?.items?.map((item) => ({ value: item._id, label: item.name }))
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (createEmployee.isSuccess) {
      enqueueSnackbar(
        "Employee created successfully!",
        {
          variant: "success",
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          ),
        },
      );
      Cookies.set("EmployeeToken", createEmployee.data.token)
      setLoading(false);
      handleNext();
      
    }
  }, [createEmployee.isSuccess]);

  useEffect(() => {
    if (createEmployee.isError) {
      const errorMessage = createEmployee.error.message;
      enqueueSnackbar(errorMessage, {
        variant: "error",
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        ),
      });
      setLoading(false);
    }
  }, [createEmployee.isError]);

  // useEffect(() => {
  //   if (loginEmployee.isSuccess) {
  //     // enqueueSnackbar(
  //     //   "Employee Logged-in successfully!",
  //     //   {
  //     //     variant: "success",
  //     //     action: (key) => (
  //     //       <IconButton onClick={() => closeSnackbar(key)} size="small">
  //     //         <CloseIcon sx={{ color: "#fff" }} />
  //     //       </IconButton>
  //     //     ),
  //     //   },
  //     // );
  //     localStorage.setItem("EmployeeToken", loginEmployee.data.token);
  //     Cookies.set("EmployeeToken", loginEmployee.data.token)
  //     localStorage.setItem("EmployeeId", loginEmployee.data.user._id);
  //     console.log(localStorage.getItem("EmployeeToken"), "abc")
  //     handleNext();
  //   }
  // }, [loginEmployee.isSuccess]);

  // useEffect(() => {
  //   if (loginEmployee.isError) {
  //     const errorMessage = loginEmployee.error.message;
  //     // enqueueSnackbar(errorMessage, {
  //     //   variant: "error",
  //     //   action: (key) => (
  //     //     <IconButton onClick={() => closeSnackbar(key)} size="small">
  //     //       <CloseIcon sx={{ color: "#fff" }} />
  //     //     </IconButton>
  //     //   ),
  //     // });
  //   }
  // }, [loginEmployee.isError]);

  const formatDate = (date: Date) => {
    return date
      ? new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '-')
      : null;
  };

  const onSubmit = (data: any) => {
    console.log(data, "data")
    const formData = new FormData();
    formData.append('DOB', moment(data.dob).format());
    formData.append('DateOfJoining', moment(data.doj).format());
    formData.append('Name', data.name);
    formData.append('Email', data.email);
    formData.append('Password', data.password);
    formData.append('Mobile', data.mobileNo);
    formData.append('IdentityNumber', data.cnic);
    formData.append('MartialStatus', data.maritalStatus);
    formData.append('Designation', data.designation);
    // formData.append('ReportingAuthority', data.manager);
    formData.append('City', data.city);
    formData.append('Address', data.residentialAddress);
    formData.append('PermanentAddress', data.permanentAddress);
    formData.append('ZipCode', data.zip);
    formData.append('image', data.profileImg);
    //@ts-ignore
    createEmployee.mutate(formData);
    // loginEmployee.mutate({ Email: data.email, password: data.password })
    setFormValues((prevState: any) => ({
      ...prevState,
      data,
    }));
    setLoading(true);
    // handleNext();
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    values,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: formValues?.data?.name || "",
      email: formValues?.data?.email || "",
      password: formValues?.data?.password || "",
      mobileNo: formValues?.data?.mobileNo || "",
      cnic: formValues?.data?.cnic || "",
      dob: formValues?.data?.dob || dobValue,
      doj: formValues?.data?.doj || dojValue,
      maritalStatus: formValues?.data?.maritalStatus || "",
      designation: formValues?.data?.designation || "",
      profileImg: formValues?.data?.profileImg || "",
      manager: formValues?.data?.manager || "",
      residentialAddress: formValues?.data?.residentialAddress || "",
      permanentAddress: formValues?.data?.permanentAddress || "",
      city: formValues?.data?.city || "",
      // country: formValues?.data?.country || "",
      // state: formValues?.data?.state || "",
      zip: formValues?.data?.zip || "",
    },
    validationSchema,
    onSubmit,
  });
  const handleImageChange = (file: File) => {
    setFieldValue('profileImg', file);
  };
  console.log(values, "values")
  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Regex pattern to allow only alphabets (A-Z, a-z) and spaces
    const regex = /^[A-Za-z\s]*$/;
    if (regex.test(value) || value === '') {
      handleChange(event);
    }
  };
  return (
    <>
    <Loader show={loading} />
      <form onSubmit={handleSubmit} encType="multipart/formData">
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: "30px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
              <CircularImageUpload onImageChange={handleImageChange} />
              <InputLabelWrapper htmlFor="profileImg">
                <FormattedMessage {...messages.profileLabel} />
              </InputLabelWrapper>
            </Box>
            <Grid container spacing={3}>
              <Grid item sx={{ paddingTop: "35px" }} xs={6} md={4}>
                <TextField
                  id="name"
                  name="name"
                  size="small"
                  label={<FormattedMessage {...messages.nameLabel} />}
                  placeholder={namePlaceholder}
                  fullWidth
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleNameChange}
                  error={Boolean(touched.name && errors.name)}
                  variant="outlined"
                />
                {touched.name && errors.name && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-name"
                  >
                    {errors.name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  size="small"
                  label={<FormattedMessage {...messages.emailLabel} />}
                  placeholder={emailPlaceholder}
                  fullWidth
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.email && errors.email)}
                  variant="outlined"
                  sx={{ marginTop: "12px" }}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  size="small"
                  label={<FormattedMessage {...messages.passwordLabel} />}
                  placeholder={passwordPlaceholder}
                  fullWidth
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.password && errors.password)}
                  variant="outlined"
                  sx={{ marginTop: "12px" }}
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  id="mobileNo"
                  name="mobileNo"
                  type="tel"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  label={<FormattedMessage {...messages.mobileLabel} />}
                  size="small"
                  placeholder={mobilePlaceholder}
                  fullWidth
                  value={values.mobileNo}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.mobileNo && errors.mobileNo)}
                  variant="outlined"
                />
                {touched.mobileNo && errors.mobileNo && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-mobileNo"
                  >
                    {errors.mobileNo}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  id="cnic"
                  name="cnic"
                  label={<FormattedMessage {...messages.cnicLabel} />}
                  size="small"
                  placeholder={cnicPlaceholder}
                  fullWidth
                  value={values.cnic}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.cnic && errors.cnic)}
                  variant="outlined"
                />
                {touched.cnic && errors.cnic && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-cnic"
                  >
                    {errors.cnic}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture={true}
                    label={<FormattedMessage {...messages.dobLabel} />}
                    value={dobValue}
                    onChange={(e: any) => {
                      setDobValue(e);
                      setFieldValue("dob", e);
                    }}
                    // components={{ OpenPickerIcon: CalendarMonthIcon }}
                    sx={{
                      ".MuiBox-root": { borderLeft: "none" },
                      width: "100%",
                      ".MuiSvgIcon-root": {
                        color: (theme: any) => theme.palette.primary.main,
                      },
                      ".MuiInputBase-input": {
                        padding: "8px 10px",
                      },
                    }}
                  />
                  {touched.dob && errors.dob && (
                    <FormHelperText error id="standard-weight-helper-text-dob">
                      {errors.dob}
                    </FormHelperText>
                  )}
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture={true}
                    label={<FormattedMessage {...messages.dojLabel} />}
                    value={dojValue}
                    onChange={(e: any) => {
                      setDojValue(e);
                      setFieldValue("doj", e);
                    }}
                    // components={{ OpenPickerIcon: CalendarMonthIcon }}
                    sx={{
                      ".MuiBox-root": { borderLeft: "none" },
                      width: "100%",
                      ".MuiSvgIcon-root": {
                        color: (theme: any) => theme.palette.primary.main,
                      },
                      ".MuiInputBase-input": {
                        padding: "8px 10px",
                      },
                    }}
                  />
                  {touched.doj && errors.doj && (
                    <FormHelperText error id="standard-weight-helper-text-doj">
                      {errors.doj}
                    </FormHelperText>
                  )}
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} md={4}>
                <Autocomplete
                  size="small"
                  options={maritalSelect || []}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Marital Status"
                    />
                  )}
                  value={maritalSelect?.find((option) => option.value == values.maritalStatus) || null}
                  onChange={(e, values) => {
                    setFieldValue("maritalStatus", values?.value || null);
                  }}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Autocomplete
                  options={designations || []}
                  size="small"
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Designation"
                    />
                  )}
                  value={designations?.find((option) => option.value == values.designation) || null}
                  onChange={(e, values) => {
                    setFieldValue("designation", values?.value || null);
                  }}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  id="manager"
                  name="manager"
                  label={<FormattedMessage {...messages.managerLabel} />}
                  size="small"
                  placeholder={reportingPlaceholder}
                  fullWidth
                  value={values.manager}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.manager && errors.manager)}
                  variant="outlined"
                />
                {touched.manager && errors.manager && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-manager"
                  >
                    {errors.manager}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6} md={4}>
                <Autocomplete
                  options={cities || []}
                  size="small"
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                    />
                  )}
                  value={cities?.find((option) => option.value == values.city) || null}
                  onChange={(e, values) => {
                    setFieldValue("city", values?.value || null);
                  }}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  id="zip"
                  name="zip"
                  size="small"
                  label={<FormattedMessage {...messages.zipLabel} />}
                  placeholder={zipPlaceholder}
                  fullWidth
                  value={values.zip}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.zip && errors.zip)}
                  variant="outlined"
                  sx={{ marginTop: "12px" }}
                />
                {touched.zip && errors.zip && (
                  <FormHelperText error id="standard-weight-helper-text-zip">
                    {errors.zip}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="residentialAddress"
                  name="residentialAddress"
                  size="small"
                  label={<FormattedMessage {...messages.residentialAddressLabel} />}
                  placeholder={residentialAddressPlaceholder}
                  fullWidth
                  value={values.residentialAddress}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.residentialAddress && errors.residentialAddress)}
                  variant="outlined"
                  sx={{ marginTop: "12px" }}
                />
                {touched.residentialAddress && errors.residentialAddress && (
                  <FormHelperText error id="standard-weight-helper-text-residentialAddress">
                    {errors.residentialAddress}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="permanentAddress"
                  name="permanentAddress"
                  label={<FormattedMessage {...messages.permanentAddressLabel} />}
                  placeholder={permanentAddressPlaceholder}
                  fullWidth
                  size="small"
                  value={values.permanentAddress}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.permanentAddress && errors.permanentAddress)}
                  variant="outlined"
                  sx={{ marginTop: "12px" }}
                />
                {touched.permanentAddress && errors.permanentAddress && (
                  <FormHelperText error id="standard-weight-helper-text-permanentAddress">
                    {errors.permanentAddress}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", xl: "65%" },
              display: "flex",
              mt: "10px",
              justifyContent: { xs: "center", md: "space-between" },
            }}
          >
            <Button
              onClick={handlePrev}
              variant="contained"
              sx={{
                textDecoration: "none",
                color: "#fff",
                textTransform: "initial",
                fontWeight: "500",
                width: { xs: "100%", md: "250px" },
              }}
            >
              <FormattedMessage {...messages.prev} />
            </Button>
            <LoadingButtonWrapper
              variant="contained"
              type="submit"
              disabled={
                (values.name &&
                  values.mobileNo &&
                  values.cnic &&
                  values.dob &&
                  values.doj &&
                  // values.maritalStatus &&
                  // values.designation &&
                  values.profileImg &&
                  values.manager &&
                  values.residentialAddress &&
                  values.permanentAddress &&
                  values.city &&
                  values.email &&
                  values.password &&
                  values.zip
                ) === ""
              }
              // loading={profile.isLoading}
              loadingPosition="end"
              sx={{
                width: { xs: "100%", md: "250px" },
                ".MuiLoadingButton-loadingIndicator": {
                  top: "35%",
                  right: "32%",
                },
              }}
            >
              <FormattedMessage {...messages.profile} />
            </LoadingButtonWrapper>
          </Box>
        </Box>
      </form>
    </>
  );
};
