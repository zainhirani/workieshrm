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
  OutlinedInput,
  Button
} from "@mui/material";
import {
  ButtonWrapper,
  IconButtonWrapper,
  LoadingButtonWrapper,
} from "./Styled";

import {
  CardHeaderWrapper,
  InputLabelWrapper,
} from "./Styled"
import FormattedMessage, { useFormattedMessage } from "theme/FormattedMessage";
import messages from "./messages";
import { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useRegister } from "providers/Auth";
import { useSnackbar } from "notistack";
import CircularImageUpload from "components/CircularImageUpload/CircularImageUpload";
import { Add, Close, KeyboardArrowDown } from "@mui/icons-material";
import { useCreateOrganizationDetail } from "providers/OrganizationDetail";
import { useCompanyThemeListing } from "providers/CompanyTheme";
import { useCreateDocument } from "providers/Documents";
import { useRouter } from "next/router";
import Loader from "components/Loader/Loader";

const validationSchema = Yup.object().shape({
  DocumentName: Yup.string().required().label("Organization Name"),
  image: Yup.mixed().required("Document"),
});

interface IStepThreeProps {
  handlePrev: () => void;
  handleNext: () => void;
  formValues:any;
  setFormValues:any;
}

const StepThree: React.FC<IStepThreeProps> = ({ handlePrev,handleNext,formValues,setFormValues }) => {
  const employeeID = localStorage.getItem("EmployeeId");
  const router = useRouter();
  const createDocument = useCreateDocument({DocumentName:"ABC",image:"ew"});
  const [loading,setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [addedFields, setAddedFields] = useState<Array<{ DocumentName: string; image: File | null }>>([]);
  const [mutationStatus, setMutationStatus] = useState<Array<"pending" | "success" | "error">>([]);
  const documentNamePlaceholder = useFormattedMessage(
    messages.documentNamePlaceholder,
  );

  useEffect(() => {
    if (createDocument.isSuccess) {
      enqueueSnackbar("Document added successfully", {
        variant: "success",
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <Close sx={{ color: "#fff" }} />
          </IconButton>
        ),
      });
      setLoading(false);
      router.push("/");
      // localStorage.setItem(TOKEN, createDocument?.data.token);
      // handleNext();
    }
  }, [createDocument.isSuccess]);

  useEffect(() => {
    if (createDocument.isError) {
      const errorMessage = createDocument.error.message;
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
  }, [createDocument.isError]);

  // const addMoreDocument = () => {
  //   setAddedFields([...addedFields, { DocumentName: "", image: null }]);
  //   setMutationStatus([...mutationStatus, "pending"]);
  // };

  const addMoreDocument = async () => {
    try {
      const newField = { DocumentName: "", image: null };
      setAddedFields([...addedFields, newField]);

      const formData = new FormData();
      formData.append("DocumentName", newField.DocumentName);
      formData.append("image", newField.image || "");
      //@ts-ignore
      await createDocument.mutate(formData);

      enqueueSnackbar("Document added successfully", {
        variant: "success",
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)} size="small">
            <Close sx={{ color: "#fff" }} />
          </Button>
        ),
      });
    } catch (error) {
      //@ts-ignore
      const errorMessage = error?.message;
      enqueueSnackbar(errorMessage, {
        variant: "error",
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)} size="small">
            <Close sx={{ color: "#fff" }} />
          </Button>
        ),
      });
    }
  };

  const cancelAddedField = (index: number) => {
    const updatedFields = [...addedFields];
    updatedFields.splice(index, 1);
    setAddedFields(updatedFields);

    const updatedStatus = [...mutationStatus];
    updatedStatus.splice(index, 1);
    setMutationStatus(updatedStatus);
  };

  const handleFieldChange = (index: number, fieldName: keyof typeof addedFields[0], value: any) => {
    const updatedFields = [...addedFields];
    updatedFields[index][fieldName] = value;
    setAddedFields(updatedFields);
  };

  const handleSubmitForm = async (data: { DocumentName: string; image: File | null }, index: number) => {
    try {
      const formData = new FormData();
      formData.append("DocumentName", data.DocumentName);
      formData.append("image", data.image || "");
      
      if (mutationStatus[index] !== "success") {
        //@ts-ignore
        await createDocument.mutate(formData);
        setMutationStatus((prevStatus) => {
          const updatedStatus = [...prevStatus];
          updatedStatus[index] = "success";
          return updatedStatus;
        });
      }
    } catch (error) {
      setMutationStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[index] = "error";
        return updatedStatus;
      });
    }
  };

  const onSubmit = useCallback((data: any) => {
    const formData = new FormData();
    formData.append('DocumentName', data.DocumentName);
    formData.append('image', data.image);
    //@ts-ignore
    createDocument.mutate(formData);
    // createDocument.mutate({
    //   DocumentName: data.DocumentName,
    //   image: data.image,
    // });
    setLoading(true);
    setFormValues((prevState:any) => ({
      ...prevState,
      data,
    }));
    // handleNext()
  }, []);

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
      DocumentName: formValues?.data?.DocumentName || "",
      image: formValues.data?.image || null,
    },
    enableReinitialize:true,
    validationSchema,
    onSubmit,
  });
  return (
    <>
    <Loader show={loading} />
      <form onSubmit={handleSubmit} encType="multipart/formData">
        <CardContent sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                id="DocumentName"
                name="DocumentName"
                label={<FormattedMessage {...messages.documentNameLabel} />}
                placeholder={documentNamePlaceholder}
                fullWidth
                size="small"
                value={values.DocumentName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.DocumentName && errors.DocumentName)}
                variant="outlined"
                sx={{"fieldset":{border:"none"}}}
              />
              {touched.DocumentName && errors.DocumentName && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-DocumentName"
                >
                  {errors.DocumentName}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              type="file"
              id="image"
              name="image"
              onBlur={handleBlur}
              error={Boolean(touched.image && errors.image)}
              //@ts-ignore
              onChange={(e)=>setFieldValue("image",e.target?.files[0])}
              sx={{"fieldset":{border:"none"}}}
            />
             {touched.image && errors.image && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-image"
                >
                  {errors.image}
                </FormHelperText>
              )}
            </Grid>         
          </Grid>
          {/* {addedFields.map((field, index) => (
      <Grid container spacing={3} key={index}>
        <Grid item xs={12} md={6}>
          <TextField
            id={`DocumentName-${index}`}
            name={`DocumentName-${index}`}
            label="Document Name"
            fullWidth
            size="small"
            value={field.DocumentName}
            onChange={(e) => handleFieldChange(index, "DocumentName", e.target.value)}
            variant="outlined"
            sx={{"fieldset":{border:"none"}}}
          />
        </Grid>
        <Grid sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:2}} item xs={12} md={6}>
          <TextField
            variant="outlined"
            type="file"
            id={`image-${index}`}
            name={`image-${index}`}
            sx={{"fieldset":{border:"none"}}}
            onChange={(e) => handleFieldChange(index, "image", e.target.files?.[0] || null)}
          />
           <Close sx={{cursor:"pointer"}} onClick={() => cancelAddedField(index)}/>
        </Grid>
        </Grid>
    ))} */}
          {/* <Button
              variant="contained"
              onClick={addMoreDocument}
              sx={{
                textDecoration: "none",
                color: "#fff",
                textTransform: "initial",
                mt:2,
                height:"40px",
                fontWeight: "500",
                width: { xs: "100%", md: "250px" },
              }}
              startIcon={<Add />}
            >
              Add More
            </Button> */}
        </CardContent>
          <Box
            sx={{
              width: { xs: "100%", xl: "65%" },
              display: "flex",
              mt: "10px",
              alignItems:"center",
              gap:2,
              justifyContent: { xs: "center", md: "space-between" },
            }}
          >
          <LoadingButtonWrapper
            onClick={handlePrev}
              variant="contained"
            sx={{
              textDecoration: "none",
              color: "#fff",
              textTransform: "initial",
              fontWeight: "500",
              width: { xs: "100%", md: "250px" },
              mt:"30px"
            }}
          >
            <FormattedMessage {...messages.prev} />
          </LoadingButtonWrapper>
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
          disabled={(values.DocumentName && values.image) === ""}>
          <FormattedMessage {...messages.lastStep} />
        </LoadingButtonWrapper>
        </Box>
      </form>
    </>
  );
};

export default StepThree;
