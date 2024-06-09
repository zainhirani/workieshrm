import React from 'react';
import { Drawer, Box, Typography } from '@mui/material';
import { Close, CloseOutlined } from '@mui/icons-material';

type DrawerComponentProps = {
    title:string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const DrawerComponent: React.FC<DrawerComponentProps> = ({ title,isOpen, onClose, children }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose} sx={{".MuiPaper-root":{width:"500px"}}}>
      <Box sx={{ width: '100%', padding: '16px',display:"flex",justifyContent:"space-between" }}>
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          {title}
        </Typography>
        <CloseOutlined sx={{cursor:"pointer"}} onClick={onClose} />
      </Box>
      <Box sx={{px:2}}>
        {children}
        </Box>
    </Drawer>
  );
};

export default DrawerComponent;
