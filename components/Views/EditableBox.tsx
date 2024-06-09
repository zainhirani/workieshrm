//@ts-nocheck
import { CancelOutlined, CheckCircleOutline, Edit } from "@mui/icons-material";
import { Typography, Card, Grid,Box, Divider, Autocomplete, TextField, styled } from "@mui/material";
import { Formik, Field } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

const HeadingStyle = {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: '8px'
  };
  
const GroupItems = styled('ul')({
    padding: 0
});
  
  const BoxStyle = {
    padding: '5px',
    borderRadius: '6px',
    border: '1px solid #e3e3e3',
    fontSize: '13px',
    outline: 'none',
    height: '40px',
    width: '100%'
  };
  

interface FieldProps {
    fieldsArray?:{
      label:string;  
      fieldName:string;  
      defaultValue:string;
      validation?: Yup.Schema<any>;
      type?:string;
      width?:number;
      SelectOption?:Object[];
      isSelect?:boolean;
    }[];
    heading?: string;
    salary?:boolean;
  }
  
const EditableBox = ({ heading, fieldsArray,salary }: FieldProps) => {
    const [isEditing, setEditing] = useState(false);
    const initialValues = fieldsArray?.reduce(
        (acc, field) => ({ ...acc, [field.fieldName]: field.defaultValue }),
      );
      const validationSchema = Yup.object().shape(
        fieldsArray?.reduce((acc: any, field) => {
          if (field.validation) {
            acc[field.fieldName] = field.validation;
          }
          return acc;
        }, {})
      );

    return (
      <Card sx={{p:2,boxShadow:(theme)=>theme.shadows[1], my: 4}}>
        <Card sx={{display:"flex",justifyContent:"space-between",border:"none"}}>
        <Typography sx={{ fontSize: '16px', fontWeight: '600', ml: '2px', mr: 2 }}>{heading}</Typography>
        {!salary && (
          <>
        {isEditing ? (
          <Box sx={{display:"flex",gap:"10px"}}>
            <CancelOutlined onClick={() => setEditing(false)} fontSize="small" color="error" sx={{ mr: 1, cursor: 'pointer' }} />
            <CheckCircleOutline
              sx={{ cursor: 'pointer' }}
              onClick={() => setEditing(false)}
              fontSize="small"
              color="success"
            />
            </Box>
        ) : (
          <Edit sx={{ cursor: 'pointer' }} onClick={() => setEditing(true)} fontSize="small" color="primary" />
        )}
        </>
        )}
        </Card>
        <Divider sx={{my:2}} />
        <Formik
          initialValues={initialValues || {}}
          onSubmit={(values, actions) => {
            console.log('Form submitted with values:', values);
            actions.setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {({errors}) => (
            <Card sx={{border:"none"}}>
              <Grid container spacing={2} mb={2}>
                {fieldsArray?.map((item,index)=>(
                    <Grid key={index} item md={item?.width} gap={1} display={"grid"}>
                    <Typography fontWeight={500} fontSize={14} sx={{color:(theme)=>theme.palette.text.secondary}}>{item?.label}</Typography>
                    {isEditing ? (
                        item?.isSelect ? (
                            <Autocomplete
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder="Task Status" />}
                            options={item?.SelectOption}
                            defaultValue={item?.SelectOption[0]}
                            getOptionLabel={(option) => option?.label}
                            renderGroup={(params) => {
                                console.log(params);
                                return (
                                    <li key={params.key}>
                                        <GroupItems>{params.children}</GroupItems>
                                    </li>
                                );
                            }}
                        />
                        ) : (
                            <>
                            <Field name={item?.fieldName} style={BoxStyle} defaultValue={item?.defaultValue} type={item?.type ? item?.type : "text"} />
                            {errors[item.fieldName] && (
                            <Typography sx={{ color: 'red', fontSize: 12 }}>{errors[item.fieldName]}</Typography>
                            )}
                            </>
                    )
                    ) : (
                        <Typography sx={{color:(theme)=>theme.palette.primary.main}} fontSize={16} fontWeight={600}>{item?.defaultValue}</Typography>
                    )}
                    </Grid>
                ))}
              </Grid>
            </Card>
          )}
        </Formik>
      </Card>
    );
  };
  export default EditableBox;