import { Visibility } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material'
import CustomDialog from 'components/Views/DialogBox';
import EditableBox from 'components/Views/EditableBox';
import { SalaryData } from 'components/Views/TableData';
import TableView from 'components/Views/TableView';
import { useMe } from 'providers/Login';
import React, { useState } from 'react'

const SalaryHistoryScreen = () => {
    const me = useMe({});
    console.log(me,"me")
    const [view,setView] = useState(false);
    const SalaryInfo = [
        {label:"Month",defaultValue:"July",fieldName:"month",width:4},
        {label:"Total Salary",defaultValue:"10,000",fieldName:"totalSalary",width:4},
        {label:"Received",defaultValue:"9,0000",fieldName:"received",width:4},
    ]
    const DeductionInfo = [
        {label:"Late",defaultValue:"500",fieldName:"late",width:4},
        {label:"Half Day",defaultValue:"200",fieldName:"halfDay",width:4},
        {label:"Lunch",defaultValue:"300",fieldName:"lunch",width:4},
    ]
    const SalaryColumn = [
        {
          field: "id",
          headerName: "ID",
          flex: 1,
          hide:true,
        },
        {
          field: "month",
          headerName: "Month",
          flex: 1,
        },
        {
          field: "totalSalary",
          headerName: "Total Salary",
          flex: 1,
        },
        {
          field: "received",
          headerName: "Received",
          flex: 1,
        },
        {
          field: "deduction",
          headerName: "Deduction",
          flex: 1,
        },
        {
          field: "action",
          headerName: "Action",
          flex: 1,
          renderCell: (params:any) => {
            return (
                <>
              <Visibility sx={{cursor:"pointer"}} color="primary" onClick={()=>setView(true)} />
              </>
            );
          },
        },
      ];
  return (
    <>
       <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",my: 2,ml:1}}>
      <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Salaries</Typography>
    </Box>
    <TableView ID="id" columns={SalaryColumn} rows={SalaryData} />
      <CustomDialog open={view} onClose={()=>setView(false)} actions={<Button onClick={()=>setView(false)} variant='contained'>Close</Button>} content={
      <Box sx={{width:"500px"}}>
        <EditableBox heading='Salary History' fieldsArray={SalaryInfo} salary={true}/>
        <EditableBox heading='Deduction Details' fieldsArray={DeductionInfo} salary={true}/>
    </Box>
      } />
    </>
  )
}

export default SalaryHistoryScreen
