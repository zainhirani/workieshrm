import React from "react";
import { Box, Paper, Select, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomAreaChart from "components/AreaChart";
import { projectsData, saleChartKeys } from "./data";
import ProjectBox from "components/PieChart/PieChartBox";

interface ProjectProgressProps {
  title?: JSX.Element | string;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({ title }) => {
  // local
  var theme = useTheme();

  return (
    <Paper sx={{boxShadow:(theme)=>theme.shadow.boxShadow}}>
      <Typography
        variant="h5"
        color="text"
        sx={{ padding: theme.spacing(3, 3, 0) }}
      >
        {title}
      </Typography>
      <Box sx={{display:"flex",width:"unset",overflowX:"auto",gap:"20px",p:1,my:2,mx:1}}>
        {projectsData?.map((item,index)=>(
          <ProjectBox key={index} title={item.title} total={item?.totalTask} totalCompleted={item?.totalCompletedTask} totalPending={item?.totalPendingTask} upPercentage={item?.UpPercentage} />
        ))}
      </Box>
    </Paper>
  );
};

export default ProjectProgress;
