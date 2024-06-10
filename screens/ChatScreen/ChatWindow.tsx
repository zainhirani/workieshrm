//@ts-nocheck
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useMe } from "providers/Login";
import socket from "../../utils/socket";
interface Message {
  _id: string;
  Body: string;
  SenderId: string;
  ReceiverId: string;
  EmployeeMessageMedia: [
    {
      _id: string;
      MessageId: string;
      Media: File;
    },
  ];
  SenderIdData: {
    _id: string;
    Name: string;
    ImageF: string;
  };
  ReceiverIdData: {
    _id: string;
    Name: string;
    ImageF: string;
  };
}

interface ChatWindowProps {
  chat: Message[];
  isGroupChat: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, isGroupChat }) => {
  const me = useMe({});
  const [Chat, SetChat] = useState(chat);
  useEffect(() => {
    const ChatSave = Chat;
    if (isGroupChat == true) {
      socket.on("GroupMessage", (data) => { 
        // setPredictionData(data[1].votesdata);
        console.log(data, "s121233");
        ChatSave.push(data);
        console.log(ChatSave, "s1212333333");
        SetChat(ChatSave);
      });
    } else {
      socket.on("PeerUser", (data) => {
        // setPredictionData(data[1].votesdata);
        console.log(data, "s1212");
        ChatSave.push(data);
        SetChat(ChatSave);
      });
    }
  }, [Chat]);

  return (
    <Box
      flex={1}
      p={2}
      display="flex"
      flexDirection="column"
      sx={{ overflowY: "auto" }}
    >
      {Chat?.slice()
        ?.reverse()
        ?.map((msg, index) => {
          const sender = isGroupChat
            ? msg?.SenderIdMessageData?._id
            : msg?.SenderId;
          const MessageData =
            isGroupChat == false
              ? isCurrentUser
                ? msg.SenderIdData.Name
                : msg.ReceiverIdData.Name
              : msg.SenderIdMessageData.Name;
          const isCurrentUser = sender === me?.data?.data?._id;
          // console.log(msg, "sender");
          return (
            <Box
              key={index}
              display="flex"
              justifyContent={isCurrentUser ? "flex-end" : "flex-start"}
              mb={1}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems={isCurrentUser ? "flex-end" : "flex-start"}
              >
                <Typography variant="caption" color="textSecondary">
                  {MessageData}
                </Typography>
                <Box display="flex" alignItems="center">
                  {msg.EmployeeMessageMedia &&
                    msg.EmployeeMessageMedia.map((file, fileIndex) => (
                      <Box key={fileIndex} display="flex" alignItems="center">
                        <InsertDriveFileIcon />
                        <Typography variant="body2">
                          {file.MessageId}
                        </Typography>
                      </Box>
                    ))}
                  <Typography
                    variant="body1"
                    sx={{
                      padding: "8px",
                      backgroundColor: isCurrentUser ? "#3f51b5" : "#f1f1f1",
                      color: isCurrentUser ? "white" : "black",
                      borderRadius: "8px",
                      maxWidth: "100%",
                      wordWrap: "break-word",
                      marginLeft: isCurrentUser ? "auto" : "0",
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
