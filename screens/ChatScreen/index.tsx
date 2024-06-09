//@ts-nocheck
import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Avatar, Grid, IconButton, AppBar, Toolbar } from '@mui/material';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageLayout from 'components/PageLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const users = ['You', 'David', 'Jane', 'Smith', 'Kane', 'Nina', 'Steve', 'William'];

const initialChats = [
  {
    id: '1',
    user: 'David',
    messages: [
      { sender: 'David', text: 'Hi, how are you??' },
      { sender: 'You', text: 'I am fine, how are you??' },
      { sender: 'David', text: 'Good, how\'s all thing going?' },
      { sender: 'You', text: 'Good.' },
    ],
  },
  {
    id: '2',
    user: 'Kane',
    messages: [{ sender: 'Kane', text: 'Hi, how are you??' }],
  },
  {
    id: '3',
    user: 'Smith',
    messages: [{ sender: 'Smith', text: 'Hi, how are you??' }],
  },
];

const initialGroups = [
  {
    id: '1',
    group: 'Group A',
    messages: [
      { sender: 'David', text: 'Hi Group A!' },
      { sender: 'Jane', text: 'Hello everyone!' },
    ],
  },
  {
    id: '2',
    group: 'Group B',
    messages: [{ sender: 'Smith', text: 'Hi, how are you all?' }],
  },
];

const ChatScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [chats, setChats] = useState(initialChats);
  const [groups, setGroups] = useState(initialGroups);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isGroup, setIsGroup] = useState(false);
  const [editingMessage, setEditingMessage] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setSelectedChat(null);
  };

  const handleChatSelect = (chatId: string, isGroup: boolean) => {
    const chat = isGroup ? groups.find((g) => g.id === chatId) : chats.find((c) => c.id === chatId);
    setSelectedChat(chat);
    setIsGroup(isGroup);
  };

  const handleSendMessage = (text: string) => {
    if (selectedChat) {
      const updatedMessages = [...selectedChat.messages, { sender: 'You', text }];
      const updatedChat = { ...selectedChat, messages: updatedMessages };
      if (isGroup) {
        setGroups(groups.map((group) =>
          group.id === selectedChat.id ? updatedChat : group
        ));
      } else {
        setChats(chats.map((chat) =>
          chat.id === selectedChat.id ? updatedChat : chat
        ));
      }
      setSelectedChat(updatedChat);
    }
  };

  const handleEditMessage = (index: number, newText: string) => {
    if (selectedChat) {
      const updatedMessages = selectedChat.messages.map((msg: any, idx: number) =>
        idx === index ? { ...msg, text: newText } : msg
      );
      const updatedChat = { ...selectedChat, messages: updatedMessages };
      if (isGroup) {
        setGroups(groups.map((group) =>
          group.id === selectedChat.id ? updatedChat : group
        ));
      } else {
        setChats(chats.map((chat) =>
          chat.id === selectedChat.id ? updatedChat : chat
        ));
      }
      setSelectedChat(updatedChat);
    }
  };

  const handleDeleteMessage = (index: number) => {
    if (selectedChat) {
      const updatedMessages = selectedChat.messages.filter((msg: any, idx: number) => idx !== index);
      const updatedChat = { ...selectedChat, messages: updatedMessages };
      if (isGroup) {
        setGroups(groups.map((group) =>
          group.id === selectedChat.id ? updatedChat : group
        ));
      } else {
        setChats(chats.map((chat) =>
          chat.id === selectedChat.id ? updatedChat : chat
        ));
      }
      setSelectedChat(updatedChat);
    }
  };

  return (
    <PageLayout>
      <Box padding="16px">
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Chats" />
          <Tab label="Groups" />
        </Tabs>
        <Grid container>
          <Grid item xs={4} style={{ borderRight: '1px solid #ccc' }}>
            <ChatList
              chats={selectedTab === 1 ? groups : chats}
              onChatSelect={(id) => handleChatSelect(id, selectedTab === 1)}
            />
          </Grid>
          <Grid item xs={8}>
            {selectedChat ? (
              <Box display="flex" flexDirection="column" height="100%">
                <Box display="flex" alignItems="center" padding="8px" borderBottom="1px solid #ccc">
                  <IconButton onClick={() => setSelectedChat(null)}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="h6" flexGrow={1}>
                    {selectedChat.user || selectedChat.group} {selectedChat.user && 'Online'}
                  </Typography>
                  <Avatar>{selectedChat.user ? selectedChat.user[0] : selectedChat.group[0]}</Avatar>
                </Box>
                <ChatWindow
                  chat={selectedChat}
                  onEditMessage={handleEditMessage}
                  onDeleteMessage={handleDeleteMessage}
                />
                <MessageInput
                  onSendMessage={handleSendMessage}
                  editMode={editingMessage}
                  editText={editingMessage ? selectedChat.messages[selectedChat.messages.length - 1].text : ''}
                  onEditComplete={(text: string) => {
                    handleEditMessage(selectedChat.messages.length - 1, text);
                    setEditingMessage(false);
                  }}
                />
              </Box>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography variant="h6" color="textSecondary">
                  Select chat to continue
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default ChatScreen;
