import React from 'react'
import { Grid, Typography, Autocomplete, TextField, Button, styled } from '@mui/material';
import { Formik, Form, Field } from 'formik';

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
const Verified = [
    {label:"Yes",value:"Yes"}, 
    {label:"No",value:"No"}, 
]
const Status = [
    {label:"Todo",value:"Todo"}, 
    {label:"Inprogress",value:"Inprogress"}, 
    {label:"Completed",value:"Completed"}, 
]

const AddGoalForm = () => {
  return (
    <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
            console.log('Form submitted with values:', values);
            actions.setSubmitting(false);
        }}
    >
        <Form>
            <Grid spacing={1} container alignItems="center" sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <Typography sx={LabelStyle}>Title</Typography>
                        <Field style={BoxStyle} name="Title" placeholder="Enter Title" />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={LabelStyle}>Status</Typography>
                        <Autocomplete
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder="Status" />}
                            options={Status}
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
                        <Typography sx={LabelStyle}>Verified</Typography>
                        <Autocomplete
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder="Verified" />}
                            options={Verified}
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
                        <Typography sx={LabelStyle}>Comments</Typography>
                        <Field style={BoxStyle} name="Comments" placeholder="Enter Comments" />
                    </Grid>
                </Grid>
        </Form>
    </Formik>
  )
}

export default AddGoalForm
