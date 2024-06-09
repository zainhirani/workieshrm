import { Box, Button, Chip, Typography } from '@mui/material'
import PageLayout from 'components/PageLayout'
import CustomDialog from 'components/Views/DialogBox'
import { ProjectsData } from 'components/Views/TableData'
import TableView from 'components/Views/TableView'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import CreateProjectForm from './CreateProjectForm'
import { Visibility } from '@mui/icons-material'
import { useProjectListing } from 'providers/Project'
import { useEmployeeListing } from 'providers/Employee'
import Loader from 'components/Loader/Loader'

const ProjectScreen = () => {
    const router = useRouter();
    const [create,setCreate] = useState(false);
    const [loading,setLoading] = useState(false);
    const projectListing = useProjectListing({});
    const employeeListing = useEmployeeListing({})
    const projects = projectListing?.data?.data?.items;

    const formatDate = (date:Date) => {
      return date
        ? new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).replace(/\//g, '-')
        : null;
    };

    const handleOpenDialog = () => {
        setCreate(true);
      };
    
      const handleCloseDialog = () => {
        setCreate(false);
      };
      const ProjectColumns = [
        {
          field: "_id",
          headerName: "ID",
          flex: 1,
          minWidth:150,
          hide:true,
        },
        {
          field: "Name",
          headerName: "Project Name",
          flex: 1,
          minWidth:150,
        },
        {
          field: "Description",
          headerName: "Project Description",
          flex: 1,
          minWidth:150,
        },
        {
          field: "RecurringMeetingDay",
          headerName: "Recurring Meeting Day",
          flex: 1,
          minWidth:150,
          renderCell:(params:any) => {
            return(
            params.row.RecurringMeetingDay.charAt(0).toUpperCase() + params.row.RecurringMeetingDay.slice(1)
            )
          }
        },
        {
          field: "ProjectAssignTo",
          headerName: "Assignee",
          flex: 1,
          minWidth:150,
          renderCell: (params: any) => {
            console.log(employeeListing?.data?.data?.items.find((el)=>el._id),"rowss")
            console.log(params?.row?._id,"rowss2")
            return <Typography>{employeeListing?.data?.data?.items.find((el) => el._id == params?.row?._id)?.Name ?? "N/A"}</Typography>;
        }
        },
        {
            field: "Deadline",
            headerName: "Completion Expected",
            flex: 1,
            minWidth:150,
            renderCell:(params:any)=>{
              return formatDate(params.row.Deadline)
            }
          },
          {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: (params:any) => {
              return (
                <Visibility onClick={()=>{router.push(`/projects/${params.row._id}`);setLoading(true)}} sx={{cursor:"pointer"}} color="primary" />
              );
            },
          },
      ];
  return (
    <PageLayout>
        <>
        <Loader show={loading} />
            <Box sx={{ml:2, display:"flex",flexDirection:{xs:"column",sm:"row"}, justifyContent:"space-between",alignItems:"center",mt:2,gap:1}}>
                <Typography sx={{fontWeight:"700",color:(theme)=>theme.palette.text.primary,fontSize:"24px"}}>
                    Projects
                </Typography>
                <Button variant='contained' sx={{borderRadius:"5px"}} onClick={handleOpenDialog}>
                    Create Project
                </Button>
            </Box>
            <Box sx={{ml:1}}>
                <TableView columns={ProjectColumns} rows={projects || []} ID="_id" url='projects' />
            </Box>
            <CustomDialog open={create} onClose={handleCloseDialog} title='Add Project' content={<CreateProjectForm onClose={handleCloseDialog} />} actions={true}/>
        </>
    </PageLayout>
  )
}

export default ProjectScreen
