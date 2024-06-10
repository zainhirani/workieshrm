//@ts-nocheck
import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Grid,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PageLayout from "components/PageLayout";
import { usePeerToPeerListing } from "providers/Chat/PeerToPeer";
import {
  useCreateUserPeer,
  useUserPeerListing,
} from "providers/Chat/UserPeerChat";
import { usePeerToGroupListing } from "providers/Chat/PeerToGroup";
import {
  useCreateUserGroup,
  useUserGroupListing,
} from "providers/Chat/UserGroupChat";
import socket from "../../utils/socket";
import Cookies from "js-cookie";
const users = [
  "You",
  "David",
  "Jane",
  "Smith",
  "Kane",
  "Nina",
  "Steve",
  "William",
];

const initialChats = [
  {
    _id: "1",
    Name: "David",
    messages: [
      { sender: "David", text: "Hi, how are you??" },
      { sender: "You", text: "I am fine, how are you??" },
      { sender: "David", text: "Good, how's all thing going?" },
      { sender: "You", text: "Good." },
    ],
  },
  {
    _id: "2",
    Name: "Kane",
    messages: [{ sender: "Kane", text: "Hi, how are you??" }],
  },
  {
    _id: "3",
    Name: "Smith",
    messages: [{ sender: "Smith", text: "Hi, how are you??" }],
  },
];

const initialGroups = [
  {
    _id: "1",
    Name: "Group A",
    messages: [
      { sender: "David", text: "Hi Group A!" },
      { sender: "Jane", text: "Hello everyone!" },
    ],
  },
  {
    _id: "2",
    Name: "Group B",
    messages: [{ sender: "Smith", text: "Hi, how are you all?" }],
  },
];

const ChatScreen: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const peerToPeerList = usePeerToPeerListing();
  const peerToPeerChat = useUserPeerListing({ id: selectedChatId || "" });
  const peerToGroupList = usePeerToGroupListing();
  const peerToGroupChat = useUserGroupListing({ id: selectedChatId || "" });
  const sendPeerToPeerChat = useCreateUserPeer({ id: selectedChatId || "" });
  const sendPeerToGroupChat = useCreateUserGroup({ id: selectedChatId || "" });

  let chat = isGroup ? peerToGroupList?.data?.data : peerToPeerList?.data?.data;
  let messages = isGroup
    ? peerToGroupChat?.data?.data
    : peerToPeerChat?.data?.data;

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isGroup, setIsGroup] = useState(false);
  const [editingMessage, setEditingMessage] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setSelectedChat(null);
  };

  const handleChatSelect = (chatId: string, isGroup: boolean) => {
    const chat = isGroup
      ? peerToGroupChat?.data?.data
      : peerToPeerChat?.data?.data;

    setSelectedChat(chat);
    
    console.log(chatId, "chat selected");
    setIsGroup(isGroup);
    if (isGroup == true) {
      socket.emit("createRoom", chatId);
    } else {
      socket.emit("JoinPeer", Cookies.get("token"), chatId);
    }
    
    setSelectedChatId(chatId);
  };

  // const handleSendMessage = (Body: string, image: File[]) => {
  //   const formData = new FormData();
  //   if (selectedChat) {
  //     const newMessage = {
  //       Body,
  //       image,
  //     };
  //     formData.append('Body', Body);
  //     formData.append('image', image);
  //     const updatedMessages = [...selectedChat, newMessage];
  //     const updatedChat = { ...selectedChat, messages: updatedMessages };

  //     isGroup ? sendPeerToGroupChat?.mutate(newMessage) : sendPeerToPeerChat?.mutate(newMessage)
  //     // Update the chat list
  //     if (isGroup) {
  //       peerToGroupChat.refetch()
  //       const updatedGroupList = peerToGroupList?.data?.data.map(chat =>
  //         chat._id === selectedChat._id ? updatedChat : chat
  //       );
  //       setSelectedChat(peerToGroupChat?.data?.data);
  //       // updatePeerToGroupList(updatedGroupList);
  //     } else {
  //       peerToPeerChat.refetch()
  //       const updatedChatList = peerToPeerList?.data?.data.map(chat =>
  //         chat._id === selectedChat._id ? updatedChat : chat
  //       );
  //       setSelectedChat(peerToPeerChat?.data?.data);
  //       // updatePeerToPeerList(updatedChatList);
  //     }

  //     // Update the selected chat state
  //     setSelectedChat(updatedChat);
  //   }
  // };

  const handleSendMessage = (Body: string, image: File[]) => {
    if (selectedChat) {
      const newMessage = {
        Body,
        image,
      };

      if (isGroup) {
        const updatedMessages = [...selectedChat, newMessage];
        setSelectedChat(updatedMessages);
        sendPeerToGroupChat?.mutate(newMessage);
      } else {
        const updatedMessages = [...selectedChat, newMessage];
        setSelectedChat(updatedMessages);
        sendPeerToPeerChat?.mutate(newMessage);
      }
    }
  };

  const handleEditMessage = (messageId: string, newText: string) => {
    if (selectedChat) {
      const updatedMessages = selectedChat.messages.map((message) =>
        message.id === messageId ? { ...message, text: newText } : message,
      );
      const updatedChat = { ...selectedChat, messages: updatedMessages };

      // Update the chat list
      if (isGroup) {
        const updatedGroupList = peerToGroupList.map((chat) =>
          chat._id === selectedChat._id ? updatedChat : chat,
        );
        updatePeerToGroupList(updatedGroupList);
      } else {
        const updatedChatList = peerToPeerList.map((chat) =>
          chat._id === selectedChat._id ? updatedChat : chat,
        );
        updatePeerToPeerList(updatedChatList);
      }

      // Update the selected chat state
      setSelectedChat(updatedChat);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    if (selectedChat) {
      const updatedMessages = selectedChat.messages.filter(
        (message) => message.id !== messageId,
      );
      const updatedChat = { ...selectedChat, messages: updatedMessages };

      // Update the chat list
      if (isGroup) {
        const updatedGroupList = peerToGroupList.map((chat) =>
          chat._id === selectedChat._id ? updatedChat : chat,
        );
        updatePeerToGroupList(updatedGroupList);
      } else {
        const updatedChatList = peerToPeerList.map((chat) =>
          chat._id === selectedChat._id ? updatedChat : chat,
        );
        updatePeerToPeerList(updatedChatList);
      }

      // Update the selected chat state
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
          <Grid
            item
            xs={4}
            style={{
              borderRight: "1px solid #ccc",
              height: "500px",
              overflowY: "auto",
            }}
          >
            <ChatList
              chats={
                selectedTab === 1
                  ? peerToGroupList?.data?.data
                  : peerToPeerList?.data?.data
              }
              onChatSelect={(id) => handleChatSelect(id, selectedTab === 1)}
            />
          </Grid>
          <Grid item xs={8}>
            {selectedChat ? (
              <Box display="flex" flexDirection="column" height="500px">
                <Box
                  display="flex"
                  alignItems="center"
                  padding="8px"
                  borderBottom="1px solid #ccc"
                >
                  <IconButton onClick={() => setSelectedChat(null)}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="h6" flexGrow={1}>
                    {chat?.filter(
                      (item) => item?._id === selectedChat?.SenderId,
                    )}
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>Online</Typography>
                  <Avatar>
                    {
                      chat?.filter(
                        (item) => item?._id === selectedChat?.SenderId,
                      )[0]
                    }
                  </Avatar>
                </Box>
                <ChatWindow
                  chat={selectedChat}
                  isGroupChat={isGroup}
                  // chat={selectedChat}
                  // onEditMessage={handleEditMessage}
                  // onDeleteMessage={handleDeleteMessage}
                />
                <MessageInput
                  onSendMessage={handleSendMessage}
                  editMode={editingMessage}
                  editText={
                    editingMessage
                      ? selectedChat.messages[selectedChat.messages.length - 1]
                          .text
                      : ""
                  }
                  onEditComplete={(text: string) => {
                    handleEditMessage(selectedChat.messages.length - 1, text);
                    setEditingMessage(false);
                  }}
                />
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
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
