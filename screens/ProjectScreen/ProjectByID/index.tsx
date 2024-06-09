import React, { useEffect, useState } from 'react';
//@ts-ignore
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Link,Button, Grid, Typography,Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@mui/material';

import TaskCard from './TaskCard';
import PageLayout from 'components/PageLayout';
import CustomDialog from 'components/Views/DialogBox';
import CreateTaskForm from './CreateTaskForm';
import { useRouter } from 'next/router';
import { useProjectDetail } from 'providers/Project';
import { Add, Close, MoreHoriz, Visibility } from '@mui/icons-material';
import CreateBoardForm from './CreateBoardForm';
import CreateMeetingForm from './CreateMeetingForm';
import { useProjectSectionDetail, useProjectSectionRemove, useProjectSectionUpdate } from 'providers/Project/ProjectSection';
import { useSnackbar } from 'notistack';
import Loader from 'components/Loader/Loader';
import DrawerComponent from 'components/Views/Drawer';
import { Field, Form, Formik } from 'formik';
import { useTaskDetail, useTaskRemove, useTaskUpdate } from 'providers/Project/Task';
import TableView from 'components/Views/TableView';
import { useJoinMeeting, useMeetingListing } from 'providers/Project/Meeting';
// import Link from 'next/link';

// export interface Item {
//     id: string;
//     Income: number;
//     content: string;
//     followUp: string;
//     closeDate: string;
//     agentName: string;
//     assignee: {
//       name: string;
//     }[];
//     taskName: string;
//     daysOpen: number;
//     estimatedPremium: string;
//     interestLevel: 'hot' | 'cold' | 'warm' | 'unknown';
// }

export interface Item {
    _id:string;
    TaskDetail:string;
    TaskSubject:string;
    AssignToData:{
        Name: string;
    }[];
}
interface List {
    id: string;
    title: string;
    items: Item[];
    color: string;
    heading?: string;
    borderRadius?: string;
    bg?: string;
}

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

const HeadingStyle = {
    fontSize: '14px',
    color: 'white',
    fontWeight: 400
};
const HeaderStyle = {
    height: '40px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 1
};

const listContainer = {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    width: '300px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    marginBottom: '10px',
    paddingBottom: '10px'
};

const ProjectByIDScreen: React.FC = () => {
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const router = useRouter();
    const projectByID = useProjectDetail({id:router?.query?._id?.toString() || ""});
    const deleteSection = useProjectSectionRemove();
    // const themes = useTheme();
    const initialLists = projectByID?.data?.data?.CompanyProjectSectionData;
    // const initialLists: List[] = [
    //     {
    //         id: '1',
    //         title: 'Todo',
    //         bg: '#fcebe2',
    //         items: [
    //             {
    //                 id: 'item-1',
    //                 content: 'Task 1 Details',
    //                 Income: 200,
    //                 followUp: '02/08/22',
    //                 closeDate: '02/25/23',
    //                 agentName: 'John',
    //                 taskName: 'Task 1',
    //                 daysOpen: 6,
    //                 estimatedPremium: '10',
    //                 interestLevel: 'hot',
    //                 assignee:[{name:"A BC"},{name:"D EF"}]
    //             }
    //         ],
    //         color: '#EB712C',
    //         heading: 'Prospect',
    //         borderRadius: '20px 0 0 0'
    //     },
    //     {
    //         id: '2',
    //         title: 'Inprogress',
    //         bg: '#fffbee',
    //         items: [
    //             {
    //                 id: 'item-3',
    //                 content: 'Task 2 Details',
    //                 Income: 400,
    //                 followUp: '12/25/22',
    //                 closeDate: '02/21/23',
    //                 agentName: 'Michael',
    //                 taskName: 'Task 2',
    //                 daysOpen: 6,
    //                 estimatedPremium: '10',
    //                 interestLevel: 'cold',
    //                 assignee:[{name:"A BC"},{name:"D EF"}]
    //             }
    //         ],
    //         color: '#e2aa00',

    //         heading: 'Prospect'
    //     },
    //     {
    //         id: '3',
    //         title: 'Completed',
    //         bg: '#fcebe2',
    //         items: [
    //             {
    //                 id: 'item-4',
    //                 content: 'Task 3 Details',
    //                 Income: 100,
    //                 followUp: '12/25/22',
    //                 closeDate: '02/21/23',
    //                 agentName: 'Doe',
    //                 taskName: 'Task 3',
    //                 daysOpen: 6,
    //                 estimatedPremium: '10',
    //                 interestLevel: 'warm',
    //                 assignee:[{name:"A BC"},{name:"D EF"}]
    //             }
    //         ],
    //         color: '#EB712C',
    //         heading: 'Prospect',
    //         borderRadius: '0 20px 0 0'
    //     },
    //     {
    //         id: '4',
    //         title: 'Completed2',
    //         bg: '#fcebe2',
    //         items: [
    //             {
    //                 id: 'item-5',
    //                 content: 'Task 4 Details',
    //                 Income: 100,
    //                 followUp: '12/25/22',
    //                 closeDate: '02/21/23',
    //                 agentName: 'Doe',
    //                 taskName: 'Task 3',
    //                 daysOpen: 6,
    //                 estimatedPremium: '10',
    //                 interestLevel: 'warm',
    //                 assignee:[{name:"A BC"},{name:"D EF"}]
    //             }
    //         ],
    //         color: '#EB712C',
    //         heading: 'Prospect',
    //         borderRadius: '0 20px 0 0'
    //     },
    // ];
    const [lists, setLists] = useState(projectByID?.data?.data?.CompanyProjectSectionData || []);
    const [loading,setLoading] = useState(false);
    const [create,setCreate] = useState(false);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>("");
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>("");
    const [open,setOpen] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [value, setValue] = useState(false);
    const [addBoard,setAddBoard] = useState(false);
    const [addMeeting,setAddMeeting] = useState(false);
    const [openDeleteTask,setOpenDeleteTask] = useState(false);
    const [openEditTask,setOpenEditTask] = useState(false);
    const [openMeeting,setOpenMeeting] = useState(false);

    const taskById = useTaskDetail({id:selectedTaskId || ""})
    const updateTask = useTaskUpdate({id:selectedTaskId || ""})
    const deleteTask = useTaskRemove({id:selectedTaskId || ""})
    const getSectionData = useProjectSectionDetail({id:selectedSectionId || ""})
    const updateSectionData = useProjectSectionUpdate({id:selectedSectionId || ""})

    useEffect(() => {
        if (updateSectionData.isSuccess) {
          enqueueSnackbar(updateSectionData?.data?.message, {
            variant: "success",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <Close sx={{ color: "#fff" }} />
              </IconButton>
            ),
          });
          handleDrawerClose();
          projectByID.refetch();
          setLoading(false);
          // localStorage.setItem(TOKEN, createOrganization?.data.token);
        }
      }, [updateSectionData.isSuccess]);
    
      useEffect(() => {
        if (updateSectionData.isError) {
          const errorMessage = updateSectionData.error.message;
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
      }, [updateSectionData.isError]);

      const handleSubmit = (data:any) => {
        updateSectionData?.mutate({Title:data.Title})
      }

    useEffect(() => {
      if (projectByID?.data?.data?.CompanyProjectSectionData) {
          setLists(projectByID.data.data.CompanyProjectSectionData);
      }
    }, [projectByID?.data?.data?.CompanyProjectSectionData]);

    console.log(lists,"lists")
    const handleOpenDialog = () => {
        setCreate(true);
      };
    
      const handleCloseDialog = () => {
        setCreate(false);
      };

    const handleOpenBoard = () => {
        setAddBoard(true);
      };
    
      const handleCloseBoard = () => {
        setAddBoard(false);
      };
      
    const handleOpenMeeting = () => {
        setAddMeeting(true);
      };
    
      const handleCloseMeeting = () => {
        setAddMeeting(false);
      };

      const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpenDeleteTask = () => {
        setOpenDeleteTask(true);
    }

    const handleCloseDeleteTask = () => {
        setOpenDeleteTask(false);
    }
    const handleOpenEditTask = () => {
        setOpenEditTask(true);
    }

    const handleCloseEditTask = () => {
        setOpenEditTask(false);
    }

    const handleOpenMeetingList = () => {
        setOpenMeeting(true);
    }

    const handleCloseMeetingList = () => {
        setOpenMeeting(false);
    }
    const handleTaskClick=(taskId:string)=>{
        console.log(taskId,"taskId")
        setSelectedTaskId(taskId)
    }

    const handleDragEnd = (result: DropResult): void => {
        if (!result.destination) return;

        const updatedLists = [...lists];
        const sourceListIndex = lists.findIndex((list) => list._id === result.source.droppableId);
        const destinationListIndex = lists.findIndex((list) => list._id === result?.destination?.droppableId);
        const [movedItem] = updatedLists[sourceListIndex]?.ProjectSectionData?.splice(result.source.index, 1);
        updatedLists[destinationListIndex]?.ProjectSectionData?.splice(result.destination.index, 0, movedItem);
        setLists(updatedLists);
    };

    const handleDeleteSection = () => {
        if (selectedSectionId) {
            deleteSection.mutate({id:selectedSectionId});
            setSelectedSectionId(null);
            handleClose();
        }
    }
    console.log(selectedTaskId,"selected..........") 
    const handleDeleteTask = () => {
        if (selectedTaskId) {
            deleteTask.mutate({id:selectedTaskId});
            setSelectedTaskId(null);
            handleClose();
        }
    }

    useEffect(() => {
        if (updateTask.isSuccess) {
          enqueueSnackbar(updateTask?.data?.message, {
            variant: "success",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <Close sx={{ color: "#fff" }} />
              </IconButton>
            ),
          });
          handleCloseEditTask();
          projectByID.refetch();
          setLoading(false);
          // localStorage.setItem(TOKEN, createOrganization?.data.token);
        }
      }, [updateTask.isSuccess]);
    
      useEffect(() => {
        if (updateTask.isError) {
          const errorMessage = updateTask.error.message;
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
      }, [updateTask.isError]);

      const handleSubmitTask = (data:any) => {
        updateTask?.mutate({TaskSubject:data.TaskName,TaskDetail:data.TaskDetail,DueDate:data.Deadline,AssignTo:data.AssignTo,ProjectSection:data.section})
      }


    useEffect(() => {
        if (deleteSection.isSuccess) {
          enqueueSnackbar(deleteSection?.data?.message, {
            variant: "success",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <Close sx={{ color: "#fff" }} />
              </IconButton>
            ),
          });
          projectByID.refetch();
          setLoading(false);
          // localStorage.setItem(TOKEN, createOrganization?.data.token);
          handleClose();
        }
      }, [deleteSection.isSuccess]);
    
      useEffect(() => {
        if (deleteSection.isError) {
          const errorMessage = deleteSection.error.message;
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
      }, [deleteSection.isError]);

    useEffect(() => {
        if (deleteTask.isSuccess) {
          //@ts-ignore
          enqueueSnackbar(deleteTask?.data?.message, {
            variant: "success",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <Close sx={{ color: "#fff" }} />
              </IconButton>
            ),
          });
          projectByID.refetch();
          setLoading(false);
          // localStorage.setItem(TOKEN, createOrganization?.data.token);
          handleCloseDeleteTask();
        }
      }, [deleteTask.isSuccess]);
    
      useEffect(() => {
        if (deleteTask.isError) {
          const errorMessage = deleteTask.error.message;
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
      }, [deleteTask.isError]);

      const formValues = {TaskName:taskById?.data?.data?.TaskSubject,TaskDetail:taskById?.data?.data?.TaskDetail,Deadline:taskById?.data?.data?.DueDate}

      const formatDate = (date:Date) => {
        return date
          ? new Date(date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).replace(/\//g, '-')
          : null;
      };
    //   const meetingLink = useJoinMeeting({id:params.row._id});

      const MeetingColumn = [
        {
          field: "_id",
          headerName: "ID",
          flex: 1,
          minWidth:150,
          hide:true,
        },
        {
          field: "Agenda",
          headerName: "Meeting Agenda",
          flex: 1,
          minWidth:150,
        },
        // {
        //   field: "Name",
        //   headerName: "Project Name",
        //   flex: 1,
        //   minWidth:150,
        // },
        {
            field: "Time",
            headerName: "Date",
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
                const joinMeeting = useJoinMeeting({id:params.row._id})
                console.log(joinMeeting?.data,"joinnnnnnnnnn")
              return (
                joinMeeting?.data?.data?.link ? 
                <Link href={joinMeeting?.data?.data?.link} target="_blank">
                <Visibility sx={{cursor:"pointer"}} color="primary" />
                </Link>
                : <Visibility sx={{cursor:"pointer"}} color="primary" />
              );
            },
          },
      ];
      const meetingList = useMeetingListing({})
      console.log(meetingList?.data?.data)

    return (
        <PageLayout>
            <>
            <Loader show={loading} />
            <Box sx={{ml:2}}>
            <Typography sx={{fontWeight:"700",color:(theme)=>theme.palette.text.primary,fontSize:"24px"}}>
                    Projects
                </Typography> 
            </Box>
            <Grid container sx={{ml:2, display:"flex",justifyContent:"space-between",alignItems:"center",mt:2}}>
                <Grid item xs={12} lg={6} sx={{display:"flex",justifyContent:"space-between",gap:"10px"}}>
                <Typography sx={{fontWeight:"500",color:(theme)=>theme.palette.text.secondary,fontSize:"14px"}}>
                    Project Name: <span style={{fontWeight:600}}>{projectByID?.data?.data.Name}</span>
                </Typography>
                <Typography sx={{fontWeight:"500",color:(theme)=>theme.palette.text.secondary,fontSize:"14px"}}>
                    Recurring Meeting Day: <span style={{fontWeight:600}}>
                        {//@ts-ignore
                        projectByID?.data?.data?.RecurringMeetingDay?.charAt(0)?.toUpperCase() + projectByID?.data?.data?.RecurringMeetingDay?.slice(1)}</span>
                </Typography>
                </Grid>
                <Grid item xs={12} lg={6} sx={{display:"flex",gap:"10px",justifyContent:"center"}}>
                <Button onClick={handleOpenMeeting} variant='contained' sx={{borderRadius:"5px"}}>
                    Quick Meeting
                </Button>
                <Button variant='contained' onClick={handleOpenDialog} sx={{borderRadius:"5px"}}>
                    Create Task
                </Button>
                <Button variant='contained' onClick={handleOpenBoard} sx={{borderRadius:"5px"}}>
                    Add Section
                </Button>
                <Button variant='contained' onClick={handleOpenMeetingList} sx={{borderRadius:"5px"}}>
                    Meeting
                </Button>
                </Grid>
            </Grid>
            <Box ml={1} mt={3}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{width:"100%",overflowX:"scroll"}}>
                <div style={{display:"flex",justifyContent:"space-between",width:"fit-content"}}>
                    {lists?.map((list) => {
                        const itemCount = list?.ProjectSectionData?.length;
                        return (
                            <Box sx={{ display: 'flex', flexDirection: 'column', mr: 2,p:1, }}>
                                <Box
                                    sx={{
                                        ...HeaderStyle,
                                        // borderTop: `3px solid ${list.color}`,
                                        boxShadow: (theme)=>theme.shadow.boxShadow,
                                        position:"relative",
                                        p:2,
                                        // background: list.bg,
                                        // borderBottom: `1px solid ${list.color}`
                                    }}
                                >
                                    <Typography sx={{ ...HeadingStyle, color: (theme)=>theme.palette.text.secondary,display:"flex",
                                        justifyContent:"space-between",
                                        alignItems:"center",width:"100%" }}>
                                        <span style={{ width:"100%",fontWeight: '600',fontSize: '20px', }}>{list.Title}</span>{' '}
                                        {/* <span style={{ fontWeight: '400' }}>({itemCount})</span> */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: '100%', justifyContent: 'flex-end' }} onClick={() => {setValue(!value);setSelectedSectionId(list._id)}}>
                                            <MoreHoriz />
                                            {value && selectedSectionId == list._id && 
                                            <Box sx={{position:"absolute",top:"60%",right:"5%",display:"grid",background:(theme)=>theme.palette.background.paper,boxShadow:(theme)=>theme.shadow.boxShadow,borderRadius:1}}>
                                                <Button variant="text" onClick={handleDrawerOpen} sx={{textTransform:"capitalize",justifyContent:"start"}}>Edit</Button>
                                                <Button variant="text" onClick={handleOpen} sx={{textTransform:"capitalize",justifyContent:"start"}}>Delete</Button>
                                            </Box>
                                            }
                                        </Box>
                                    </Typography>
                                    {/* <Typography sx={{ fontSize: '22px', color: list.color, fontWeight: '600' }}>${totalIncome}</Typography> */}
                                </Box>

                                <Droppable key={list._id} droppableId={list._id}>
                                    {(provided:any) => (
                                        <Box
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            sx={{ height: '70vh', overflow: 'scroll', ...listContainer, boxShadow: 1 }}
                                        >
                                            {list.ProjectSectionData.map((item, index) => (
                                                <Draggable key={item._id} draggableId={item._id} index={index}>
                                                    {(provided:any) => (
                                                        <Box
                                                            sx={{ px: 1, pt: 2 }}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            {/* {item.content} */}
                                                            {
                                                            //@ts-ignore
                                                            <TaskCard key={item._id} formValues={formValues} value={false} item={item} taskAction={handleTaskClick} handleUpdate={handleSubmitTask} handleOpenEdit={handleOpenEditTask} closeEditModal={handleCloseEditTask} openEditModal={openEditTask} deleteTask={handleDeleteTask} handleOpenDelete={handleOpenDeleteTask} openDeleteModal={openDeleteTask} closeDeleteModal={handleCloseDeleteTask}  />
                                                            }
                                                        </Box>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {itemCount < 1 && <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}><Typography sx={{fontWeight:500,color:(theme)=>theme.palette.text.primary}}>No tasks yet!</Typography></Box>}
                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>
                            </Box>
                        );
                    })}
                </div>
                </div>
            </DragDropContext>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle sx={{ color: 'red' }}>{'Are you sure to delete this section?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        By deleting this you will lose all the information regarding this section.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" sx={{color:"#FFF"}} onClick={handleDeleteSection} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <DrawerComponent title="Project Section Details" isOpen={isDrawerOpen} onClose={handleDrawerClose}>
            <>
                <Formik
                //@ts-ignore
                initialValues={{Title:getSectionData?.data?.data?.Title}}
                onSubmit={(values, actions) => {
                    console.log('Form submitted with values:', values);
                    handleSubmit(values)
                    actions.setSubmitting(false);
                }}
            >{({values})=>{
                console.log(values,"values")
                return(
                <Form>
                    <Grid spacing={1} container alignItems="center" sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <Typography sx={LabelStyle}>Title</Typography>
                                <Field style={BoxStyle} value={values.Title} name="Title" placeholder="Title" />
                            </Grid> 
                     </Grid>
                     <Grid item my={2} container xs={12}>
                            <Button type='submit' variant="contained" sx={{borderRadius:"5px"}}>
                                Update
                            </Button>
                        </Grid>
                </Form>
                )}}
            </Formik>
                        </>
            </DrawerComponent>
            <DrawerComponent title="Meeting Scheduled" isOpen={openMeeting} onClose={handleCloseMeetingList}>
            <>
            <TableView columns={MeetingColumn} rows={meetingList?.data?.data || []} ID="_id" url='projects' />
                        </>
            </DrawerComponent>
            <CustomDialog open={create} onClose={handleCloseDialog} title='Add Task' content={<CreateTaskForm onClose={handleCloseDialog} />} actions={true}/>
            <CustomDialog open={addBoard} onClose={handleCloseBoard} title='Add Project Section' content={<CreateBoardForm onClose={handleCloseBoard} />} actions={true}/>
            <CustomDialog open={addMeeting} onClose={handleCloseMeeting} title='Add Meeting Information' content={<CreateMeetingForm onClose={handleCloseMeeting} />} actions={true}/>
            </Box>
            </>
        </PageLayout>
    );
};
export default ProjectByIDScreen;
