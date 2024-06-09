import { Visibility } from "@mui/icons-material";
import { Chip } from "@mui/material";

export const ProjectColumns = [
    {
      field: "ID",
      headerName: "ID",
      flex: 1,
      minWidth:150,
      hide:true,
    },
    {
      field: "ProjectName",
      headerName: "Project Name",
      flex: 1,
      minWidth:150,
    },
    {
      field: "ProjectDescription",
      headerName: "Project Description",
      flex: 1,
      minWidth:150,
    },
    {
      field: "Assignee",
      headerName: "Assignee",
      flex: 1,
      minWidth:150,
    },
    {
      field: "ProjectProgress",
      headerName: "Project Progress",
      flex: 1,
      minWidth:120,
      renderCell: (params:any) => {
        const status = params?.row?.ProjectProgress;
        return (
          <Chip
            label={status}
            sx={{
              color: status == "Completed" ? "#719461" : "#e7494a",
              background: "none",
              fontWeight: "700",
            }}
          />
        );
      },
    },
    {
        field: "Completion",
        headerName: "Completion Expected",
        flex: 1,
        minWidth:150,
      },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: (params:any) => {
          return (
            <Visibility sx={{cursor:"pointer"}} color="primary" />
          );
        },
      },
  ];

  export const ProjectsData = [
    {
        ID:"1",
        ProjectName:"Project 1",
        ProjectDescription:"Project 1 Description",
        Assignee:"John Doe",
        ProjectProgress:"Inprogress",
        Completion:"1/1/2024",
    },
    {
        ID:"2",
        ProjectName:"Project 2",
        ProjectDescription:"Project 2 Description",
        Assignee:"John",
        ProjectProgress:"Todo",
        Completion:"1/2/2024",
    },
    {
        ID:"3",
        ProjectName:"Project 3",
        ProjectDescription:"Project 3 Description",
        Assignee:"Doe",
        ProjectProgress:"Completed",
        Completion:"20/12/2023",
    },
    {
        ID:"4",
        ProjectName:"Project 4",
        ProjectDescription:"Project 4 Description",
        Assignee:"Michael",
        ProjectProgress:"Backlog",
        Completion:"1/3/2024",
    },
  ]

  export const DocumentsColumn = [
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
      renderCell: () => {
        return (
          <Visibility sx={{cursor:"pointer"}} color="primary" />
        );
      },
    },
  ];

  export const DocumentsData = [
    {
      id:1,
      title:"Contract Letter",
    },
    {
      id:2,
      title:"Reference Letter",
    },
    {
      id:3,
      title:"CNIC",
    },
    {
      id:4,
      title:"Job Letter",
    },
  ]

  export const GoalsData=[
    {id:1,title:"Next JS",status:"Done",verified:"Yes",comments:"Completed Next JS Course"},
    {id:2,title:"Node JS",status:"InProgress",verified:"Yes",comments:"Half Done"},
    {id:3,title:"Database",status:"Done",verified:"No",comments:"Pending Review"},
  ]

  export const SalaryData = [
    {id:1,month:"January",totalSalary:"10,000",received:"10,000",deduction:"0"},
    {id:2,month:"February",totalSalary:"10,000",received:"8,000",deduction:"2,000"},
    {id:3,month:"March",totalSalary:"10,000",received:"9,000",deduction:"1,000"},
  ]