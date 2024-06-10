import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

interface ChatListProps {
  chats: {
    _id: string;
    Name: string;
    Email?: string;
    LastMessageSentTime?: string;
    DesignationData?: {
      _id: string;
      Name: string;
    };
  }[];
  onChatSelect: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onChatSelect }) => {
  const formatLastMessageSentTime = (timestamp: string | undefined) => {
    const date = new Date(timestamp || "");
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  // const [Chat, SetChat] = useState(chat);
  // const OnChatSelect = () => {
  //   socket.emit("createRoom", id);
  // };
  return (
    <List>
      {chats &&
        chats?.map((chat) => (
          <ListItem
            button
            key={chat._id}
            onClick={() => onChatSelect(chat._id)}
          >
            <ListItemAvatar>
              {
                //@ts-ignore
                <Avatar>{chat.Name[0]}</Avatar>
              }
            </ListItemAvatar>
            <ListItemText
              primary={chat.Name}
              secondary={`Last seen ${formatLastMessageSentTime(
                chat.LastMessageSentTime,
              )}`}
            />
          </ListItem>
        ))}
    </List>
  );
};

export default ChatList;
