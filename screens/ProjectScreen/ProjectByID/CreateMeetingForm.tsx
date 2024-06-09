import React, { useEffect, useState } from 'react'
import { Grid, Typography, Autocomplete, TextField, Button, styled, Box, IconButton } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEmployeeListing } from 'providers/Employee';
import * as Yup from "yup";
import { useCreateProject } from 'providers/Project';
import { Close } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import Loader from 'components/Loader/Loader';
import { useCreateTask } from 'providers/Project/Task';
import { useRouter } from 'next/router';
import { useProjectSectionListing } from 'providers/Project/ProjectSection';
import { useCreateMeeting } from 'providers/Project/Meeting';

interface MeetingFormProps{
    onClose:()=>void;
}

const GroupItems = styled('ul')({
    padding: 0
});
const LabelStyle = {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '5px'
};
const BoxStyle = {
    width: '100%',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #e3e3e3',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
    height: '40px',
    boxShadow: '0 0 5px 0px #d6d6d682'
};

const MeetingDay = [
    {label:"Monday",value:"monday"}, 
    {label:"Tuesday",value:"tuesday"}, 
    {label:"Wednesday",value:"wednesday"}, 
    {label:"Thursday",value:"thursday"}, 
    {label:"Friday",value:"friday"}, 
    {label:"Saturday",value:"saturday"}, 
    {label:"Sunday",value:"sunday"}, 
]
const validationSchema = Yup.object().shape({
    date: Yup.string().required().label("Meeting Date"),
    agenda: Yup.string().required().label("Meeting Agenda"),
    // employees: Yup.string().required().label("Employees"),
  });

const CreateMeetingForm = ({onClose}:MeetingFormProps) => {
    const router = useRouter();
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const [loading,setLoading] = useState(false);
    const employeeListing = useEmployeeListing({});
    const createMeeting = useCreateMeeting({});
    const employees = employeeListing?.data?.data?.items?.map((item)=>({label:item.Name,value:item._id}))

    const handleSubmit = (data:any) => {
        setLoading(true);
        createMeeting.mutate({ProjectId:router?.query?._id?.toString() || "",Employees:data.employees?.map((item:any)=>item?.value),Agenda:data.agenda,Time:data.date});
    }

    useEffect(() => {
        if (createMeeting.isSuccess) {
          enqueueSnackbar(createMeeting?.data?.message, {
            variant: "success",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <Close sx={{ color: "#fff" }} />
              </IconButton>
            ),
          });
          setLoading(false);
          // localStorage.setItem(TOKEN, createOrganization?.data.token);
          onClose();
        }
      }, [createMeeting.isSuccess]);
    
      useEffect(() => {
        if (createMeeting.isError) {
          const errorMessage = createMeeting.error.message;
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
      }, [createMeeting.isError]);
  return (
    <>
        <Loader show={loading} />
        <Formik
            initialValues={{}}
            onSubmit={(values, actions) => {
                console.log('Form submitted with values:', values);
                handleSubmit(values);
                actions.setSubmitting(false);
            }}
            validationSchema={validationSchema}
        >
        {({values,setFieldValue,errors})=>{
            console.log(values,"task values");
            console.log(errors,"task errors");
            return(
            <Form encType="multipart/formData">
                <Grid spacing={1} container alignItems="center" sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Agenda</Typography>
                            <Field style={BoxStyle} name="agenda" placeholder="Enter Agenda" />
                            <ErrorMessage className="text-[#e61725]" name="agenda" component="div" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Meeting Date</Typography>
                            <Field style={BoxStyle} type="date" name="date" placeholder="Enter Meeting Date" />
                            <ErrorMessage className="text-[#e61725]" name="date" component="div" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={LabelStyle}>Employees to join</Typography>
                            <Autocomplete
                                size="small"
                                multiple
                                onChange={(e,values)=>setFieldValue("employees",values)}
                                renderInput={(params) => <TextField {...params} placeholder="Employees" />}
                                options={employees || []}
                                getOptionLabel={(option) => option.label}
                                renderGroup={(params) => {
                                    console.log(params);
                                    return (
                                        <li key={params.key}>
                                            <GroupItems>{params.children}</GroupItems>
                                        </li>
                                    );
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{display:"flex",gap:2,mt:2,justifyContent:"end"}}>
                        <Button onClick={onClose} variant="outlined" color="error">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" variant="contained">
                            Create
                        </Button>
                    </Box>
            </Form>
        )}}
        </Formik>
    </>
  )
}

export default CreateMeetingForm
