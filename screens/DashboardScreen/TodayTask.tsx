// @mui
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  Chip,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NewsFeed from "components/NewsFeed";
import TableView from "components/Views/TableView";
import { Visibility } from "@mui/icons-material";
import { useRouter } from "next/router";
// ----------------------------------------------------------------------

interface listProps {
  _id: number;
  TaskSubject: string;
  TaskDetail: string;
  ProjectTaskData?: {Name:string};
}

interface TodayTaskProps {
  title?: JSX.Element | string;
  subheader?: JSX.Element | string;
  button: JSX.Element;
  // list: listProps[];
  list:any;
}

const TodayTask: React.FC<TodayTaskProps> = ({
  title,
  subheader,
  list,
  button,
}) => {
  const router = useRouter();
  const TaskColumn = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      hide:true,
    },
    {
      field: "TaskSubject",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "TaskDetail",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "ProjectTaskData",
      headerName: "Project Name",
      flex: 1,
      renderCell:(params:any)=>{
        const status = params.row.ProjectTaskData?.Name;
        return(
           status
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params:any) => {
        return (
          <Visibility color="primary" sx={{cursor:"pointer"}} onClick={()=>router.push(`projects/${params.row.ProjectTaskData?._id}`)}  />
        )
      },
    },
  ];
  return (
    <Card sx={{boxShadow:(theme)=>theme.shadow.boxShadow}}>
        <CardHeader title={title} subheader={subheader} />
        <TableView ID="_id" rows={list} columns={TaskColumn} height="50vh" style={{".MuiPaper-root":{borderBottomLeftRadius:0,borderBottomRightRadius:0,boxShadow:"none"}}} />
    </Card>
  );
};

export default TodayTask;
