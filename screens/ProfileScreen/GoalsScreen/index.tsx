import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import CustomDialog from 'components/Views/DialogBox';
import { GoalsData } from 'components/Views/TableData';
import TableView from 'components/Views/TableView';
import React, { useState } from 'react'
import EditGoalForm from './EditGoalForm';
import AddGoalForm from './AddGoalForm';
import { useMe } from 'providers/Login';

const GoalsScreen = () => {
    const me = useMe({});
    console.log(me,"me")
    const [view,setView] = useState(false);
    const [deleteView,setDeleteView] = useState(false);
    const [add,setAdd] = useState(false);
    const GoalsColumn = [
        {
          field: "id",
          headerName: "ID",
          flex: 1,
          hide:true,
        },
        {
          field: "title",
          headerName: "Title",
          flex: 1,
        },
        {
          field: "status",
          headerName: "Status",
          flex: 1,
          renderCell:(params:any)=>{
            const status = params.row.status;
            return(
                <Chip
                label={status}
                sx={{
                  color: "#fff",
                  background: status == "Done" ? "#719461" : "#e7494a",
                  fontWeight: "700",
                }}
              />
            )
          }
        },
        {
            field: "verified",
            headerName: "Verified",
            flex: 1,
        },
        {
            field: "comments",
            headerName: "Comments",
            flex: 1,
        },
        {
          field: "action",
          headerName: "Action",
          flex: 1,
          renderCell: (params:any) => {
            return (
                <>
              <Edit sx={{cursor:"pointer"}} color="primary" onClick={()=>setView(true)} />
              <Delete sx={{cursor:"pointer"}} color="error" onClick={()=>setDeleteView(true)} />
                <CustomDialog open={view} onClose={()=>setView(false)} title="Edit Goal" btnText='Update' content={<EditGoalForm />} />
              </>
            );
          },
        },
      ];
  return (
    <>
       <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",my: 2,ml:1}}>
      <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Goals</Typography>
      <Button sx={{borderRadius:"5px"}} onClick={()=>setAdd(true)} variant="contained">Add Goal</Button>
    </Box>
    <TableView ID="id" columns={GoalsColumn} rows={GoalsData} />
    <CustomDialog open={add} onClose={()=>setAdd(false)} title="Add Goal" btnText='Save' content={<AddGoalForm />} />
    <Dialog open={deleteView} onClose={()=>setDeleteView(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle sx={{ color: 'red' }}>{'Are you sure to delete this goal?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        By deleting this you will lose all the information regarding this goal.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={()=>setDeleteView(false)}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" sx={{color:"#FFF"}} onClick={()=>setDeleteView(false)} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
    </>
  )
}

export default GoalsScreen
