import React, { useEffect, useState,CSSProperties } from 'react'
import { Grid, Typography, Autocomplete, TextField, Button, styled, Box, IconButton } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEmployeeListing } from 'providers/Employee';
import * as Yup from "yup";
import { useCreateProject } from 'providers/Project';
import { Close } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import Loader from 'components/Loader/Loader';

interface ProjectFormProps{
    onClose?:()=>void;
}

const GroupItems = styled('ul')({
    padding: 0
});
const LabelStyle : CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '5px'
};
const BoxStyle : CSSProperties = {
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
    name: Yup.string().required().label("Project Name"),
    description: Yup.string().required().label("Project Description"),
    deadline: Yup.string().required().label("Deadline"),
    // assignee: Yup.string().required().label("Project Assignee"),
    document: Yup.mixed().required("Document"),
    // meetingDay: Yup.string().label("Recurring Meeting Day"),
  });

const CreateProjectForm = ({onClose}:ProjectFormProps) => {
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const [loading,setLoading] = useState(false);
    const employeeListing = useEmployeeListing({});
    const createProject = useCreateProject({});
    const employees = employeeListing?.data?.data?.items?.map((item)=>({label:item.Name,value:item._id}))

    const handleSubmit = (data:any) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("Name",data.name);
        formData.append("Description",data.description);
        formData.append("Deadline",data.deadline);
        formData.append("ProjectAssignTo",data.assignee?.value);
        formData.append("RecurringMeetingDay",data.meetingDay?.value);
        formData.append("Document",data.document);
        //@ts-ignore
        createProject.mutate(formData);
    }

    useEffect(() => {
        if (createProject.isSuccess) {
          enqueueSnackbar(createProject?.data?.message, {
            variant: "success",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <Close sx={{ color: "#fff" }} />
              </IconButton>
            ),
          });
          setLoading(false);
          // localStorage.setItem(TOKEN, createOrganization?.data.token);
          //@ts-ignore
          onClose();
        }
      }, [createProject.isSuccess]);
    
      useEffect(() => {
        if (createProject.isError) {
          const errorMessage = createProject.error.message;
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
      }, [createProject.isError]);
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
        {({values,setFieldValue})=>{
            console.log(values,"project values");
            return(
            <Form encType="multipart/formData">
                <Grid spacing={1} container alignItems="center" sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Project Name</Typography>
                            <Field style={BoxStyle} name="name" placeholder="Enter Project Name" />
                            <ErrorMessage className="text-[#e61725]" name="name" component="div" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Project Details</Typography>
                            <Field style={BoxStyle} name="description" placeholder="Enter Project Details" />
                            <ErrorMessage className="text-[#e61725]" name="description" component="div" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Project Document</Typography>
                            <input style={BoxStyle} id="document" name="document" type="file" onChange={(event) => {
                                //@ts-ignore
                                setFieldValue("document", event.currentTarget.files[0]);
                                }} />
                            <ErrorMessage className="text-[#e61725]" name="document" component="div" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Deadline</Typography>
                            <Field style={BoxStyle} name="deadline" type="date" />
                            <ErrorMessage className="text-[#e61725]" name="deadline" component="div" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Assignee</Typography>
                            <Autocomplete
                                size="small"
                                // multiple
                                onChange={(e,values)=>setFieldValue("assignee",values)}
                                renderInput={(params) => <TextField {...params} placeholder="Assignee" />}
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
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Recurring Meeting Day</Typography>
                            <Autocomplete
                                size="small"
                                onChange={(e,values)=>setFieldValue("meetingDay",values)}
                                renderInput={(params) => <TextField {...params} placeholder="Recurring Meeting Day" />}
                                options={MeetingDay}
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

export default CreateProjectForm
