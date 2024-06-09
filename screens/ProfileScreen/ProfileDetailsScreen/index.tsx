import EditableBox from 'components/Views/EditableBox'
import React from 'react';

const MaritalStatus = [
    {label:"Single",value:"Single"},
    {label:"Married",value:"Married"},
    {label:"Divorced",value:"Divorced"},
    {label:"Widow",value:"Widow"},
]

const PersonalInfoArray=[
    {label:"Name",defaultValue:"John",fieldName:"Name",width:3},
    {label:"Mobile Number",defaultValue:"1234567890",fieldName:"MobileNumber",width:3},
    {label:"CNIC No.",defaultValue:"Doe",fieldName:"CNICNo",width:3},
    {label:"DOB",defaultValue:"1/1/2000",fieldName:"DOB",width:3,type:"date"},
    {label:"Marital Status",defaultValue:"Single",fieldName:"MaritalStatus",width:3,isSelect:true,SelectOption:MaritalStatus},
    {label:"Nationality",defaultValue:"Pakistani",fieldName:"Nationality",width:3},
    {label:"Date of Joining",defaultValue:"1/1/2024",fieldName:"DOJ",width:3,type:"date"},
    {label:"Designation",defaultValue:"Senior Manager",fieldName:"Designation",width:3},
    {label:"Residential Address",defaultValue:"Doe",fieldName:"ResidentialAddress",width:6},
    {label:"Permanent Address",defaultValue:"Doe",fieldName:"PermanentAddress",width:6},
    {label:"City",defaultValue:"Doe",fieldName:"City",width:3},
    {label:"Country",defaultValue:"Doe",fieldName:"Country",width:3},
    {label:"State",defaultValue:"Doe",fieldName:"State",width:3},
    {label:"ZIP Code",defaultValue:"Doe",fieldName:"ZIPCode",width:3},
]

const JobInfoArray = [
    {label:"Date of Joining",defaultValue:"1/1/2024",fieldName:"DOJ",width:6,type:"date"},
    {label:"Designation",defaultValue:"Senior Manager",fieldName:"Designation",width:6},
]

const ResidentialInfoArray = [
    {label:"Residential Address",defaultValue:"Doe",fieldName:"ResidentialAddress",width:6},
    {label:"Permanent Address",defaultValue:"Doe",fieldName:"PermanentAddress",width:6},
    {label:"City",defaultValue:"Doe",fieldName:"City",width:3},
    {label:"Country",defaultValue:"Doe",fieldName:"Country",width:3},
    {label:"State",defaultValue:"Doe",fieldName:"State",width:3},
    {label:"ZIP Code",defaultValue:"Doe",fieldName:"ZIPCode",width:3},
]

const ProfileDetailsScreen = () => {
  return (
    <>
      <EditableBox heading='Profile Details' fieldsArray={PersonalInfoArray}/>
    </>
  )
}

export default ProfileDetailsScreen
