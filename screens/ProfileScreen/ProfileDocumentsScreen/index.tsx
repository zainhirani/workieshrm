import { Visibility } from '@mui/icons-material'
import { Box, Button, Card, Typography } from '@mui/material'
import CustomDialog from 'components/Views/DialogBox'
import { DocumentsData } from 'components/Views/TableData'
import TableView from 'components/Views/TableView'
import React, { useState } from 'react'
import AddDocumentForm from './AddDocumentForm'
import { useMe } from 'providers/Login'

const ProfileDocumentScreen = () => {
    const me = useMe({});
    console.log(me,"me")
    const [view,setView] = useState(false);
    const [add,setAdd] = useState(false);
    const DocumentsColumn = [
        {
          field: "id",
          headerName: "ID",
          flex: 1,
        },
        {
          field: "title",
          headerName: "Title",
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
      <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Profile Documents</Typography>
      <Button sx={{borderRadius:"5px"}} onClick={()=>setAdd(true)} variant="contained">Add Document</Button>
    </Box>
      <TableView ID="id" columns={DocumentsColumn} rows={DocumentsData} />
      <CustomDialog open={view} onClose={()=>setView(false)} title="Letter" actions={<Button onClick={()=>setView(false)} variant='contained'>Close</Button>} content={<iframe src='https://www.jotform.com/pdf-templates/simple-one-page-lease-agreement-template' width="100%" height="500px" style={{overflowY:"auto"}} />} />
      <CustomDialog open={add} onClose={()=>setAdd(false)} title="Upload Document" btnText='Save' content={<AddDocumentForm />} />
    </>
  )
}

export default ProfileDocumentScreen
