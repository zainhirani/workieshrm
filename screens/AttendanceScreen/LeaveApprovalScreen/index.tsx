import { Close, Visibility } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import PageLayout from 'components/PageLayout'
import CustomDialog from 'components/Views/DialogBox';
import TableView from 'components/Views/TableView';
import { useApproveLeave, useRejectLeave, useRequestLeave } from 'providers/Leave'
import { useMe } from 'providers/Login';
import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';

const LeaveApprovalScreen = () => {
    const [loading,setLoading] = useState(false);
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const leaveToApprove = useRequestLeave({});
    const [employeeId,setEmployeeId] = useState("");
    
    console.log(leaveToApprove?.data?.data?.items,"leaveRequested")
    const me = useMe({});
    console.log(me,"me")
    const [view,setView] = useState(false);
    const [add,setAdd] = useState(false);

    const ApproveLeaveColumn = [
        {
          field: "_id",
          headerName: "ID",
          flex: 1,
          hide:true,
        },
        {
          field: "AttendanceStatus",
          headerName: "Attendance Status",
          flex: 1,
        },
        {
          field: "LeaveApprovalStatus",
          headerName: "Leave Approval Status",
          flex: 1,
        },
        {
          field: "EmployeeAttendanceData",
          headerName: "Employee Name",
          flex: 1,
          renderCell: (params:any) => {
            return (
                <>
              <Typography>{params?.row?.EmployeeAttendanceData?.Name}</Typography>
              </>
            );
          },
        },
        // {
        //   field: "action",
        //   headerName: "Action",
        //   flex: 1,
        //   renderCell: (params:any) => {
        //     console.log(params.row,"params")
        //     return (
        //         <Box sx={{display:"flex",gap:2}}>
        //         <Button sx={{cursor:"pointer",color:"#fff"}} color="success" variant='contained' onClick={()=>{setEmployeeId(params?.row?._id);approve?.mutate({id:params?.row?.id})}}>Approve</Button>
        //         <Button sx={{cursor:"pointer",color:"#fff"}} color="error" variant='contained' onClick={()=>{setEmployeeId(params?.row?._id);reject?.mutate({id:params?.row?.id})}}>Reject</Button>
        //       </Box>
        //     );
        //   },
        // },
      ];

  return (
    <PageLayout>
    <>
    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",my: 2,ml:1}}>
      <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Leaves Approved</Typography>
      {/* <Button sx={{borderRadius:"5px"}} onClick={()=>setAdd(true)} variant="contained">Apply Leave</Button> */}
    </Box>
      <TableView loading={loading} ID="_id" columns={ApproveLeaveColumn} rows={leaveToApprove?.data?.data?.items || []} />
    </>
    </PageLayout>
  )
}

export default LeaveApprovalScreen
