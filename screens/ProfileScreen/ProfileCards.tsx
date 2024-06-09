import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'

interface ProfileCardProps{
    title:string;
}

const ProfileCard = ({title}:ProfileCardProps) => {
  const router = useRouter();
  return (
    <Grid onClick={()=>router.push("/profile/details")} item sm={5} xs={12} sx={{cursor:"pointer",display:"flex",height:"200px",justifyContent:"center",alignItems:"center",borderRadius:2,"&:hover":{
      background:(theme)=>theme.palette.primary.main,transform:"scale(1.1)",transition:".5s ease",".MuiTypography-root":{color:(theme)=>theme.palette.background.paper,}
    },boxShadow:(theme)=>theme.shadow.boxShadow}}>
      <Typography sx={{fontWeight:"500",color:(theme)=>theme.palette.text.secondary,fontSize:"20px"}}>{title}</Typography>
    </Grid>
  )
}

export default ProfileCard
