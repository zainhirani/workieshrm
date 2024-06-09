import { Close } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material'
import Loader from 'components/Loader/Loader';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useCreateVerifyEmail } from 'providers/VerifyEmail';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

const VerificationScreen = () => {
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const router = useRouter();
    const verification = useCreateVerifyEmail();
    const [loading,setLoading] = useState(false);
    const [codes, setCodes] = useState<string[]>(['', '', '', '']);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([null, null, null, null]);

  const handleCodeChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputCode = event.target.value.replace(/\D/g, '').slice(0, 1);

    setCodes((prevCodes) => {
        const newCodes = [...prevCodes];
        newCodes[index] = inputCode;
        return newCodes;
      });
  
      if (index < 3 && inputCode?.length == 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (index > 0 && inputCode === '') {
        inputRefs.current[index - 1]?.focus();
      }
  };

  const handleVerify = () => {
    const verificationCode = Number(codes.join(''));
    verification.mutate({Code:verificationCode});
    setLoading(true);
  };
  useEffect(() => {
    if (verification.isSuccess) {
      enqueueSnackbar("Your account has been verified!", {
        variant: "success",
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <Close sx={{ color: "#fff" }} />
          </IconButton>
        ),
      });
      setLoading(false);
      router.push("/login")
    }
  }, [verification.isSuccess]);
  
  useEffect(() => {
    if (verification.isError) {
      const errorMessage = verification.error.message;
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
  }, [verification.isError]);
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  return (
    <>
    <Loader show={loading} />
      <Box sx={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:1}}>
      <Typography variant='h3'>Verification</Typography>
      <Box sx={{ display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center",mt:2, gap: 2 }}>
          <Typography>Email has bee sent to your email address</Typography>
          <Typography>Please enter the code</Typography>
          <Box sx={{display:"flex", gap:1,width:"300px",alignItems:"center"}}>
          {codes.map((code, index) => (
          <TextField
            key={index}
            variant="outlined"
            type="tel"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={code}
            onChange={handleCodeChange(index)}
            sx={{"fieldset":{height:"50px",width:"50px",".MuiOutlinedInput-root":{paddingTop:"12px",paddingLeft:"18px"}}}}
            inputRef={(input) => (inputRefs.current[index] = input)}
          />
        ))}
        </Box>
        <Button disabled={codes.some((code) => code == '') ? true : false } fullWidth variant="contained" color="primary" onClick={handleVerify}>
            Verify
        </Button>
      </Box>
      </Box>
    </> 
  )
}

export default VerificationScreen
