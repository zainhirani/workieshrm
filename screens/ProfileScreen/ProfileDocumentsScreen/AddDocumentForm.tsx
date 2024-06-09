import { Grid, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react'

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

const AddDocumentForm = () => {
  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
            console.log('Form submitted with values:', values);
            actions.setSubmitting(false);
        }}
    >
        <Form>
            <Grid spacing={1} container alignItems="center" sx={{ mt: 1,display:"flex",gap:"10px" }}>
              <Grid item xs={12}>
                 <Field style={BoxStyle} name="Title" placeholder="Enter Document Title" />
              </Grid>
              <Grid item xs={12}>
                  <Field style={BoxStyle} name="document" type="file" accept='.pdf' />
              </Grid>                        
            </Grid>
        </Form>
    </Formik>
    </>
  )
}

export default AddDocumentForm
