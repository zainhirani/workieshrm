import React, { useEffect, useState } from 'react'
import { Grid, Typography, Autocomplete, TextField, Button, styled, Box, IconButton } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEmployeeListing } from 'providers/Employee';
import * as Yup from "yup";
import { useCreateProject, useProjectDetail } from 'providers/Project';
import { Close } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import Loader from 'components/Loader/Loader';
import { useCreateProjectSection } from 'providers/Project/ProjectSection';
import { useRouter } from 'next/router';

interface BoardFormProps{
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
    title: Yup.string().required().label("Project Section Title"),
    // id: Yup.string().required().label("Project ID"),
  });

const CreateBoardForm = ({onClose}:BoardFormProps) => {
    const router = useRouter();
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const [loading,setLoading] = useState(false);
    const employeeListing = useEmployeeListing({});
    const projectData = useProjectDetail({id:router?.query?._id?.toString() || ""})
    const createBoard = useCreateProjectSection({});
    const employees = employeeListing?.data?.data?.items?.map((item)=>({label:item.Name,value:item._id}))

    const handleSubmit = (data:any) => {
        setLoading(true);
        //@ts-ignore
        createBoard.mutate({ProjectId:router?.query?._id?.toString() || "",Title:data.title});
    }

    useEffect(() => {
        if (createBoard.isSuccess) {
          enqueueSnackbar(createBoard?.data?.message, {
            variant: "success",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <Close sx={{ color: "#fff" }} />
              </IconButton>
            ),
          });
          projectData.refetch();
          setLoading(false);
          // localStorage.setItem(TOKEN, createOrganization?.data.token);
          onClose();
        }
      }, [createBoard.isSuccess]);
    
      useEffect(() => {
        if (createBoard.isError) {
          const errorMessage = createBoard.error.message;
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
      }, [createBoard.isError]);
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
            console.log(errors,"errors")
            return(
            <Form>
                <Grid spacing={1} container alignItems="center" sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <Typography sx={LabelStyle}>Title</Typography>
                            <Field style={BoxStyle} name="title" placeholder="Enter Section Title" />
                            <ErrorMessage className="text-[#e61725]" name="title" component="div" />
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

export default CreateBoardForm;
