import { Close } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import Loader from 'components/Loader/Loader';
import { Field, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useApplyLeave, useRequestLeave } from 'providers/Leave';
import React, { useEffect, useState } from 'react';

interface CreateLeaveFormProps{
    onClose:()=> void;
}


const LabelStyle = {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '5px'
};
const BoxStyle = {
    // width: '100%',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #e3e3e3',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
    height: '40px',
    width:"100%"
    // boxShadow: '0 0 5px 0px #d6d6d682'
};

const ApplyLeave = ({onClose}:CreateLeaveFormProps) => {
    const [loading,setLoading] = useState(false);
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const applyLeave = useApplyLeave();
    const leaveRequested = useRequestLeave({});

    const handleSubmit = (data:any) => {
        console.log(data,"data..........")
        setLoading(true);
        applyLeave.mutate(data)
    }

    useEffect(() => {
        if (applyLeave.isSuccess) {
          enqueueSnackbar(applyLeave?.data?.message, {
            variant: "success",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <Close sx={{ color: "#fff" }} />
              </IconButton>
            ),
          });
          setLoading(false);
          leaveRequested?.refetch();
          // localStorage.setItem(TOKEN, createOrganization?.data.token);
          onClose();
        }
      }, [applyLeave.isSuccess]);
    
      useEffect(() => {
        if (applyLeave.isError) {
          const errorMessage = applyLeave.error.message;
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
      }, [applyLeave.isError]);

  return (
    <>
      <Loader show={loading} />
      <Formik
        initialValues={{Day:""}}
        onSubmit={(values, actions) => {
            console.log('Form submitted with values:', values);
            actions.setSubmitting(false);
            handleSubmit(values)
        }}
    >
        <Form>
            <Grid spacing={1} container alignItems="center" sx={{ mt: 1,display:"flex",gap:"10px" }}>
              <Grid item xs={12}>
                 <Field style={BoxStyle} name="Day" type="date" placeholder="Enter Leave Day" />
              </Grid>
            </Grid>
            <Box sx={{display:"flex",gap:2,mt:2,justifyContent:"end"}}>
                <Button onClick={onClose} variant="outlined" color="error">
                    Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                    Apply
                </Button>
            </Box> 
        </Form>
    </Formik>
    </>
  )
}

export default ApplyLeave
