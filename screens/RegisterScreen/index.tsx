import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import FormattedMessage from "theme/FormattedMessage";
import RegisterForm from "./RegisterForm";
import messages from "./messages";
import { BoxWrapper } from "./Styled";

const RegisterScreen: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={8} sx={{ display: { xs: "none", md: "block" } }}>
        <BoxWrapper sx={{background:"#F7F7F9",alignItems:"start",padding:"20px 0"}}>
          <Typography sx={{color:"rgba(76, 78, 100, 0.87)",fontWeight:"700",fontSize:"24px"}}><FormattedMessage {...messages.companyName} /></Typography>
          <img
            src="registerbg.png"
            alt=""
            width="70%"
            height="90%"
            style={{zIndex:"999"}}
          />
          <img
            src="registerbgball.png"
            alt=""
            style={{width:"65%",position:"absolute",bottom:"5%"}}
          />
        </BoxWrapper>
      </Grid>
      <Grid item xs={12} md={4}>
        <BoxWrapper sx={{background:"#fff",height:"100%",p:2}}>
          <Box sx={{ width: "80%" }}>
            <Box>
              <Typography sx={{color:"rgba(76, 78, 100, 0.87)",fontWeight:"700"}} variant="h5" component="h5" mb={1}>
                <FormattedMessage {...messages.title} />
              </Typography>
              <Typography sx={{color:"rgba(76, 78, 100, 0.68)"}} variant="subtitle2" component="p" mb={5}>
                <FormattedMessage {...messages.shortDescription} />
              </Typography>
            </Box>
            <Box>
              <RegisterForm />
            </Box>
          </Box>
        </BoxWrapper>
      </Grid>
    </Grid>
  );
};

export default RegisterScreen;
