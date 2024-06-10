import { Box, Grid, Typography } from '@mui/material'
import PageLayout from 'components/PageLayout'
import React from 'react'
import ProfileCard from './ProfileCards'
import { useMe } from 'providers/Login'

const ProfileScreen = () => {
  const me = useMe({});
  console.log(me,"me")
  return (
    <PageLayout>
    <Box ml={2}>
      <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",mt:2}}>
        <Typography sx={{fontWeight:"700",color:(theme)=>theme.palette.text.primary,fontSize:"24px"}}>
            Personal Info
        </Typography>
      </Box>
      <Grid container gap={2} xs={12} sx={{justifyContent:"center",my:2}}>
          <ProfileCard title='Profile Details' />
          <ProfileCard title='Profile Documents' />
          <ProfileCard title='Goals' />
          <ProfileCard title='Salary History' />
      </Grid>
    </Box>
    </PageLayout>
  )
}

export default ProfileScreen
