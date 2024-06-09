import { Box, Card, Grid, Typography,Button } from "@mui/material";
import { BoxWrapper, IconWrapper } from "./Styled";
import { useThemeContext } from "contexts/ThemeContext";

const AchievementCard = () => {
  const {theme} = useThemeContext();
  return (
    <Box sx={{m:"0 0 0 20px"}}>
      <Box sx={{boxShadow:(theme)=>theme.shadow.boxShadow,background:(theme)=>theme.palette.background.paper,p:"20px 20px 0 20px",borderRadius:"10px",backgroundImage:theme =="dark" ? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))" : ""}}>
      <Typography sx={{color:(theme)=>theme.additionalColors?.lightGrey,fontSize:{md:"20px",xs:"16px"},display:"flex",gap:"3px"}}>Congratulations <Typography sx={{color:(theme)=>theme.palette.text.primary,fontWeight:"700",fontSize:{md:"20px",xs:"16px"}}}>Norris!</Typography> 🎉</Typography>
      <Typography sx={{color:(theme)=>theme.palette.text.secondary,fontSize:{md:"16px",xs:"14px"}}}>Best employee of the month</Typography>
      <Box sx={{display:"flex",gap:"5px"}}>
        <Box>
          <Typography sx={{color:(theme)=>theme.palette.primary.main,fontSize:{md:"30px",xs:"18px"},fontWeight:"500"}}>All tasks completed</Typography>
          <Typography sx={{color:(theme)=>theme.palette.text.secondary,fontSize:{md:"16px",xs:"13px"}}}>All projects are on track 🤟🏻</Typography>
          <Button variant="contained" sx={{borderRadius:1,mt:1,"&:hover":{background:(theme)=>theme.palette.primary.main},fontSize:{md:"18px",xs:"13px"}}}>View Performance</Button>
        </Box>
        <Box sx={{display:"flex",justifyContent:"end",alignItems:"end"}}>
          <img src="achievement.png" height="140px" width="120px" style={{objectFit:"contain"}} />
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default AchievementCard;
