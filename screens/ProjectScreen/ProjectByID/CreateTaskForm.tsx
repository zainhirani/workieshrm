import React, { useEffect, useState } from 'react'
import { Grid, Typography, Autocomplete, TextField, Button, styled, IconButton, Box } from '@mui/material';
import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useCreateTask } from 'providers/Project/Task';
import { useEmployeeListing } from 'providers/Employee';
import { useRouter } from 'next/router';
import { Close } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import Loader from 'components/Loader/Loader';
import { useProjectSectionListing } from 'providers/Project/ProjectSection';
import { useProjectDetail } from 'providers/Project';

interface CreateTaskFormProps{
    onClose:()=> void;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Task Name"),
    detail: Yup.string().required().label("Task Detail"),
    Deadline: Yup.string().required().label("Deadline"),
    // assignee: Yup.string().required().label("Task Assignee"),
    // section:Yup.string().required().label("Project Section")
  });

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
}

const CreateTaskForm = ({onClose}:CreateTaskFormProps) => {
    const [loading,setLoading] = useState(false);
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const router = useRouter();
    const createTask = useCreateTask({id:router.query?._id?.toString() || ""});
    const employeeListing = useEmployeeListing({});
    const projectByID = useProjectDetail({id:router?.query?._id?.toString() || ""})
    const projectSections = useProjectSectionListing({});
    const sections = projectSections?.data?.data?.items?.map((item)=>({label:item.Title,value:item._id}))
    const employees = employeeListing?.data?.data?.items?.map((item)=>({label:item.Name,value:item._id}))

    const initialValues = {
        name:"",
        detail:"",
        Deadline:"",
        assignee:"",
        section:"",
    }

    const handleSubmit = (data:any) => {
        console.log(data,"data..........")
        setLoading(true);
        createTask.mutate({AssignTo:data.assignee?.value,DueDate:data.Deadline,TaskDetail:data.detail,TaskSubject:data.name,ProjectSection:data.section?.value})
    }

    useEffect(() => {
        if (createTask.isSuccess) {
          enqueueSnackbar(createTask?.data?.message, {
            variant: "success",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <Close sx={{ color: "#fff" }} />
              </IconButton>
            ),
          });
          setLoading(false);
          projectByID?.refetch();
          // localStorage.setItem(TOKEN, createOrganization?.data.token);
          onClose();
        }
      }, [createTask.isSuccess]);
    
      useEffect(() => {
        if (createTask.isError) {
          const errorMessage = createTask.error.message;
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
      }, [createTask.isError]);
  return (
    <>
        <Loader show={loading} />
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                console.log('Form submitted with values:', values);
                handleSubmit(values);
                actions.setSubmitting(false);
            }}
            validationSchema={validationSchema}
        >
            {({errors,values,setFieldValue})=>{
                console.log(errors,"errors")
                console.log(values,"values")
            return(
            <Form>
                <Grid spacing={1} container alignItems="center" sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Task Name</Typography>
                            <Field style={BoxStyle} name="name" placeholder="Enter Task Name" />
                            <ErrorMessage className="text-[#e61725]" name="name" component="div" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Task Details</Typography>
                            <Field style={BoxStyle} name="detail" placeholder="Enter Task Details" />
                            <ErrorMessage className="text-[#e61725]" name="detail" component="div" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Deadline</Typography>
                            <Field style={BoxStyle} name="Deadline" type="date" />
                            <ErrorMessage className="text-[#e61725]" name="Deadline" component="div" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={LabelStyle}>Assignee</Typography>
                            <Autocomplete
                                size="small"
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
                        <Grid item xs={12}>
                            <Typography sx={LabelStyle}>Project Section</Typography>
                            <Autocomplete
                                size="small"
                                onChange={(e,values)=>setFieldValue("section",values)}
                                renderInput={(params) => <TextField {...params} placeholder="Project Section" />}
                                options={sections || []}
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

export default CreateTaskForm
