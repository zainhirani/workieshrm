//@ts-nocheck
import React from 'react';
import { Box, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useMe } from 'providers/Login';

interface Message {
  _id: string;
  Body: string;
  SenderId: string;
  ReceiverId: string;
  EmployeeMessageMedia:[
    {
      _id:string;
      MessageId:string;    
      Media:File;    
    }
  ]
}

interface ChatWindowProps {
  chat:Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  const me = useMe({});
  console.log(me?.data?.data,"me")

  return (
    <Box flex={1} p={2} display="flex" flexDirection="column" sx={{ overflowY: "auto" }}>
      {chat.map((msg, index) => {
        const isCurrentUser = msg.SenderId === me?.data?.data?._id;
        return (
          <Box
            key={index}
            display="flex"
            justifyContent={isCurrentUser ? 'flex-end' : 'flex-start'}
            mb={1}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems={isCurrentUser ? 'flex-end' : 'flex-start'}
            >
              <Typography variant="caption" color="textSecondary">
                {msg.SenderId}
              </Typography>
              <Box display="flex" alignItems="center">
                {msg.EmployeeMessageMedia && msg.EmployeeMessageMedia.map((file, fileIndex) => (
                  <Box key={fileIndex} display="flex" alignItems="center">
                    <InsertDriveFileIcon />
                    <Typography variant="body2">{file.MessageId}</Typography>
                  </Box>
                ))}
                <Typography
                  variant="body1"
                  sx={{
                    padding: '8px',
                    backgroundColor: isCurrentUser ? '#3f51b5' : '#f1f1f1',
                    color: isCurrentUser ? 'white' : 'black',
                    borderRadius: '8px',
                    maxWidth: '60%',
                    wordWrap: 'break-word',
                    marginLeft: isCurrentUser ? 'auto' : '0'
                  }}
                >
                  {msg.Body}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ChatWindow;
