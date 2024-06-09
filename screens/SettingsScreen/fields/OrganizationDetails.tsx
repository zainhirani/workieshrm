import {
  Box,
  CardContent,
  FormHelperText,
  Grid,
  TextField,
  Typography, 
  Avatar,
  IconButton,
  Select,
  MenuItem,
  Autocomplete,
  OutlinedInput
} from "@mui/material";
import {
  ButtonWrapper,
  IconButtonWrapper,
  LoadingButtonWrapper,
} from "../Styled";

import {
  CardHeaderWrapper,
  InputLabelWrapper,
} from "../Styled"
import FormattedMessage, { useFormattedMessage } from "theme/FormattedMessage";
import messages from "../messages";
import { useState, useEffect, useCallback, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useRegister } from "providers/Auth";
import { useSnackbar } from "notistack";
import CircularImageUpload from "components/CircularImageUpload/CircularImageUpload";
import { Close, KeyboardArrowDown } from "@mui/icons-material";
import { useCreateOrganizationDetail } from "providers/OrganizationDetail";
import { useCompanyThemeListing } from "providers/CompanyTheme";
import Loader from "components/Loader/Loader";

const validationSchema = Yup.object().shape({
  organizationName: Yup.string().required().label("Organization Name"),
  displayName: Yup.string().required().label("Display Name"),
  noOfEmployees: Yup.string().required().label("No. of Employees"),
  image: Yup.mixed().required("Logo"),
  companyTheme: Yup.string().label("Theme"),
});

interface IStepOneProps {
  handleNext: () => void;
  formValues:any;
  setFormValues:any;
}

const StepOne: React.FC<IStepOneProps> = ({ handleNext,formValues,setFormValues }) => {
  const uploadedImage = useRef(null)
  const imageUploader = useRef(null)
  const themeListing = useCompanyThemeListing({});  
  const [loading,setLoading] = useState(false);
  const themes = themeListing.data?.data?.items?.map((item) => ({ value: item._id, label: item.Name,primaryColor:item.PrimaryColor,secondaryColor:item.SecondaryColor }));
  const createOrganization = useCreateOrganizationDetail({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const organizationNamePlaceholder = useFormattedMessage(
    messages.organizationNamePlaceholder,
  );
  const displayNamePlaceholder = useFormattedMessage(messages.displayNamePlaceholder);
  const noOfEmployeesPlaceholder = useFormattedMessage(messages.noOfEmployeesPlaceholder);

  const [primaryColor, setPrimaryColor] = useState("#000");
  const [secondaryColor, setSecondaryColor] = useState("#000");
  const [testImage, setTestImage] = useState("");

  useEffect(() => {
    if (createOrganization.isSuccess) {
      enqueueSnackbar(createOrganization?.data?.message, {
        variant: "success",
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <Close sx={{ color: "#fff" }} />
          </IconButton>
        ),
      });
      setLoading(false);
      // localStorage.setItem(TOKEN, createOrganization?.data.token);
      handleNext();
    }
  }, [createOrganization.isSuccess]);

  useEffect(() => {
    if (createOrganization.isError) {
      const errorMessage = createOrganization.error.message;
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
  }, [createOrganization.isError]);
  // let formData = new FormData();
  // formData.append("image", testImage);

  // const onSubmit = () => {
  //   createOrganization.mutate({image:testImage,Name:'ddd', CompanyTheme:'5f2327cd-bcd6-4089-a56f-ae6f7e26ae6b',DisplayName:'dmdmdm',NoOfEmployees:1});

  // }
  const onSubmit = useCallback((data: any) => {
    const formData = new FormData();
    formData.append('Name', data.organizationName);
    formData.append('DisplayName', data.displayName);
    formData.append('NoOfEmployees', data.noOfEmployees);
    formData.append('CompanyTheme', data.companyTheme);
    formData.append('image', data.image);
    //@ts-ignore
    createOrganization.mutate(formData);
    setFormValues((prevState:any) => ({
      ...prevState,
      data,
    }));
    setLoading(true);
    // handleNext()
  }, [testImage]);

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
      organizationName: formValues?.data?.organizationName || "",
      displayName: formValues?.data?.displayName || "",
      noOfEmployees: formValues?.data?.noOfEmployees || 1,
      image: formValues.data?.image || null,
      companyTheme: formValues?.data?.companyTheme
    },
    enableReinitialize:true,
    validationSchema,
    onSubmit,
  });

  const handleImageChange = (file: File) => {
    setFieldValue('image', file);
  };

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
        <CardContent sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Box sx={{display:"flex",justifyContent:"center",flexDirection:{xs:"column",sm:"row"},alignItems:"center",gap:"30px"}}>
            <Box sx={{display:"flex",flexDirection:"column",gap:"20px",alignItems:"center"}}>
              <CircularImageUpload onImageChange={handleImageChange} />
              <InputLabelWrapper htmlFor="image">
                <FormattedMessage {...messages.logoLabel} />
              </InputLabelWrapper>
            </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                id="organizationName"
                name="organizationName"
                label={<FormattedMessage {...messages.organizationNameLabel} />}
                placeholder={organizationNamePlaceholder}
                fullWidth
                size="small"
                value={values.organizationName}
                // defaultValue={values.organizationName}
                onBlur={handleBlur}
                onChange={handleNameChange}
                error={Boolean(touched.organizationName && errors.organizationName)}
                variant="outlined"
              />
              {touched.organizationName && errors.organizationName && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-organizationName"
                >
                  {errors.organizationName}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="displayName"
                name="displayName"
                label={<FormattedMessage {...messages.displayNameLabel} />}
                placeholder={displayNamePlaceholder}
                fullWidth
                value={values.displayName}
                onBlur={handleBlur}
                onChange={handleNameChange}
                size="small"
                error={Boolean(touched.displayName && errors.displayName)}
                variant="outlined"
              />
              {touched.displayName && errors.displayName && (
                <FormHelperText error id="standard-weight-helper-text-displayName">
                  {errors.displayName}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="noOfEmployees"
                name="noOfEmployees"
                label={<FormattedMessage {...messages.noOfEmployeesLabel} />}
                placeholder={noOfEmployeesPlaceholder}
                fullWidth
                type="number"
                size="small"
                value={
                  values?.noOfEmployees !== ""
                    ? values?.noOfEmployees < 1
                      ? 1
                      : parseInt(values?.noOfEmployees)
                    : ""
                }
                inputProps={{ min: 1 }}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.noOfEmployees && errors.noOfEmployees)}
                variant="outlined"
              />
              {touched.noOfEmployees && errors.noOfEmployees && (
                <FormHelperText error id="standard-weight-helper-text-noOfEmployees">
                  {errors.noOfEmployees}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
            <Autocomplete
              size="small"
              options={themes || []}
              // getOptionLabel={(option) => option.label}
              getOptionLabel={(option) => `Primary - ${option.primaryColor} - Secondary - ${option.secondaryColor}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={<FormattedMessage {...messages.themeColorLabel} />}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <p>Primary Color - </p>
                  <div style={{ marginLeft:2,backgroundColor: option.primaryColor, width: '20px', height: '20px', marginRight: '8px' }}></div>
                  <p>Secondary Color - </p>
                  <div style={{ marginLeft:2,backgroundColor: option.secondaryColor, width: '20px', height: '20px', marginRight: '8px' }}></div>
                </li>
              )}
              value={themes?.find((option) => option.value == values.companyTheme) || null}
              onChange={(e, values) => {
              setFieldValue("companyTheme", values?.value || null);
              }}
            />
            </Grid>          
          </Grid>
          </Box>
          <LoadingButtonWrapper
          variant="contained"
          type="submit"
          // loading={register.isLoading}
          loadingPosition="end"
          sx={{
            flex: "1 1 auto",
            marginTop: "30px",
            ".MuiLoadingButton-loadingIndicator": {
              top: "35%",
              right: "32%",
            },
          }}
          disabled={
            (values.organizationName &&
              values.displayName &&
              values.image &&
              values.noOfEmployees &&
              values.companyTheme) === ""
          }
        >
          <FormattedMessage {...messages.signUp} />
        </LoadingButtonWrapper>
        </CardContent>
      </form>
    </>
  );
};

export default StepOne;
