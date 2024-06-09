// @mui
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { BoxWrapper } from "./Styled";

interface listProps {
  id: number;
  time: string;
  title: string;
}

interface RecentMessageProps {
  title?: JSX.Element | string;
  subheader?: JSX.Element | string;
  list: listProps[];
}

const RecentMessage: React.FC<RecentMessageProps> = ({
  title,
  subheader,
  list,
}) => {
  return (
    <Card sx={{boxShadow:(theme)=>theme.shadow.boxShadow}}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          "& .MuiTimelineItem-missingOppositeContent:before": {
            display: "none",
          },
        }}
      >
            {list.map((item,index)=>(
            <Box key={index} sx={{display:"flex",justifyContent:"space-between",background:(theme)=>theme.palette.background.paper,borderRadius:1,boxShadow:(theme)=>theme.shadow.boxShadow,p:2,my:1}}>
                <Typography sx={{fontSize:"14px",fontWeight:600}}>{item.title}</Typography>
                <Typography sx={{fontSize:"12px",fontWeight:500}}>{item.time}</Typography>
            </Box>
            ))}
            <Box sx={{display:"flex",justifyContent:"center",mt:2}}>
              <Button variant="contained" sx={{borderRadius:1}}>View All</Button>
            </Box>
      </CardContent>
    </Card>
  );
};
export default RecentMessage;
