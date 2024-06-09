import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PieChart from './index';

interface ProjectBoxProps {
  title?: string;
  total?: number;
  totalCompleted?: number;
  totalPending?: number;
  upPercentage?:string;
  handleClick?:()=>void;
  highMemory?:string;
  lowMemory?:string;
  lastBox?:boolean;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({
  title,
  total,
  totalCompleted,
  totalPending,
  upPercentage,
  highMemory,
  lowMemory,
  handleClick,
  lastBox
}) => {
  return (
    <Box
      sx={{
        background: (theme)=>theme.palette.background.paper,
        p: '10px',
        // width: '100%',
        width:{xs:"100%",sm:lastBox ? "100%" : "48.5%",lg:lastBox ? "100%" : "23.8%",xl:lastBox ? "100%" : "24.2%"},
        borderRadius: '10px',
        boxShadow: (theme)=>theme.shadow.boxShadow,
        height: '350px',
        cursor:"pointer",
        textAlign:"center"
    }}
    onClick = {handleClick}
    >
      <Typography sx={{ fontSize: '18px', fontWeight: '600',mb:1,height:{sm:"50px",xs:"max-content"} }}>{title}</Typography>
      <PieChart id="ddlj" data={{ total, totalCompleted, totalPending, upPercentage }} />
      <Box
        sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-around",
            gap: "10px",
            mt:1,
        }}
      >
        <Typography
          sx={{
            fontSize: '14px',
            display: 'flex',
            flexDirection: 'column',
            width: '33%',
            borderRight: '2px solid #dddddd',
          }}
        >
          Total{' '}
          <b
            style={{
              fontSize: '20px',
              fontWeight: '700',
            }}
          >
            {total}
          </b>
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            display: 'flex',
            flexDirection: 'column',
            width: '33%',
          }}
        >
          {lowMemory ? lowMemory : "Completed"}
          <b
            style={{
              fontSize: '20px',
              color: '#ACD59A',
              fontWeight: '700',
            }}
          >
            {totalCompleted}
          </b>
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            display: 'flex',
            flexDirection: 'column',
            width: '33%',
            borderLeft: '2px solid #dddddd',
          }}
        >
          {highMemory ? highMemory : "Pending"}
          <b
            style={{
              fontSize: '20px',
              // color: '#ACD59A',
              color: '#EF5D5E',
              fontWeight: '700',
            }}
          >
            {totalPending}
          </b>
        </Typography>
      </Box>
    </Box>
  );
};

export default ProjectBox;
