import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

interface ChatListProps {
  chats: {
    id: string;
    user?: string;
    group?: string;
    messages: { sender: string; text: string }[];
  }[];
  onChatSelect: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onChatSelect }) => {
  return (
    <List>
      {chats.map((chat) => (
        <ListItem button key={chat.id} onClick={() => onChatSelect(chat.id)}>
          <ListItemAvatar>
            {//@ts-ignore
            <Avatar>{chat.user ? chat.user[0] : chat?.group[0]}</Avatar>
            }
          </ListItemAvatar>
          <ListItemText
            primary={chat.user || chat.group}
            secondary={chat.messages[chat.messages.length - 1].text}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
