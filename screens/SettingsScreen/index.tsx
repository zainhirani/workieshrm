import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  Link,
} from "@mui/material";
import FormattedMessage from "theme/FormattedMessage";
import messages from "./messages";
import {
  BoxWrapper,
  ButtonWrapper,
  CardHeaderWrapper,
  IconButtonWrapper,
  LoadingButtonWrapper,
} from "./Styled";
import * as Yup from "yup";
import StepOne from "./fields/OrganizationDetails";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuthContext } from "contexts/AuthContext";
import { StepTwo } from "./fields/CreateEmployee";
// import { useProfile } from "providers/Users";
import Head from "next/head";
import EmployeeDocuments from "./EmployeeDocuments";
// import { register } from "services/auth";


const steps = [
  <FormattedMessage {...messages.stepOneTitle} />,
  <FormattedMessage {...messages.stepTwoTitle} />, 
  // <FormattedMessage {...messages.stepThreeTitle} />, 
];

const SettingsScreen: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [formValues,setFormValues] = useState({})
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
 console.log(formValues,"formValues")
  const isStepOptional = (step: number) => {
    return step === 1;
  };
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getCurrentStep = () => steps[activeStep];

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Box sx={{ width: "100%",height:{sm:"100vh",xs:"100%"} }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: { md: "80px 0", xs: "40px 0", lg: "45px" },
            height:"100%"
          }}
        >
          <Box
            sx={{
              marginBottom: (theme) => theme.spacing(3),
              padding: "20px 30px",
              // boxShadow: (theme) => theme.shadow.boxShadow,
              borderRadius: 0,
              // width: activeStep === steps.length - 1 ? "80%" : { md: 650, xs: "80%" },
            }}
          >
            {activeStep ==  1 && (
              <React.Fragment>
                <CardHeaderWrapper
                  title={<FormattedMessage {...messages.stepTwoTitle} />}
                />
                <StepTwo handleNext={handleNext} handlePrev={handlePrevious} formValues={formValues} setFormValues={setFormValues} />
              </React.Fragment>
            ) }
             {activeStep ==  2 && (
              <React.Fragment>
                <CardHeaderWrapper
                  title={<FormattedMessage {...messages.stepThreeTitle} />}
                />
                <EmployeeDocuments handleNext={handleNext} handlePrev={handlePrevious} formValues={formValues} setFormValues={setFormValues}/>
              </React.Fragment>
            )}
             {activeStep ==  0 && (
              <React.Fragment>
                <CardHeaderWrapper
                  title={<FormattedMessage {...messages.stepOneTitle} />}
                />
                <StepOne handleNext={handleNext} formValues={formValues} setFormValues={setFormValues}/>
              </React.Fragment>
            )}
            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Typography
                sx={{
                  flex: "1 1 auto",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {activeStep === steps.length - 1 ? (
                  <FormattedMessage {...messages.finalStepText} />
                ) : (
                  <>
                    <FormattedMessage {...messages.nextStepText} />
                    <Link sx={{ marginLeft: "5px", textDecoration: "none" }}>
                      "<FormattedMessage {...messages.nextStep} />"
                    </Link>
                  </>
                )}
              </Typography>
            </Box> */}
          </Box>
          {/* <Box>
            <Typography>
              <FormattedMessage {...messages.textSignIn} />
              <Link
                href="/login"
                sx={{ marginLeft: "5px", textDecoration: "none" }}
              >
                <FormattedMessage {...messages.signIn} />
              </Link>
            </Typography>
          </Box> */}
        </Box>
      </Box>
    </>
  );
};

export default SettingsScreen;
