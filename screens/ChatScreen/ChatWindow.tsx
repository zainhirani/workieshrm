import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface Message {
  sender: string;
  text: string;
  edited?: boolean; // Add edited flag
}

interface ChatWindowProps {
  chat: {
    id: string;
    user?: string;
    group?: string;
    messages: Message[];
  };
  onEditMessage: (index: number, newText: string) => void;
  onDeleteMessage: (index: number) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onEditMessage, onDeleteMessage }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setEditingIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setEditingIndex(null);
  };

  const handleEdit = (index: number, text: string) => {
    setEditText(text);
    setEditingIndex(index);
    setAnchorEl(null);
  };

  const handleEditConfirm = () => {
    if (editingIndex !== null) {
      onEditMessage(editingIndex, editText);
      setEditingIndex(null);
      setEditText('');
    }
  };

  const handleDelete = (index: number) => {
    onDeleteMessage(index);
    setAnchorEl(null);
  };

  return (
    <Box flex={1} p={2} display="flex" flexDirection="column">
      {chat.messages.map((msg, index) => (
        <Box key={index} display="flex" justifyContent={msg.sender === 'You' ? 'flex-end' : 'flex-start'} mb={1}>
          <Box display="flex" flexDirection="column" alignItems={msg.sender === 'You' ? 'flex-end' : 'flex-start'}>
            <Typography variant="caption" color="textSecondary">
              {msg.sender}
              {msg.edited && <Typography variant="caption" color="textSecondary" component="span"> (edited)</Typography>} {/* Display "edited" label if message is edited */}
            </Typography>
            {editingIndex === index ? (
              <Box display="flex" alignItems="center">
                <TextField
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  variant="outlined"
                  size="small"
                />
                <IconButton onClick={handleEditConfirm} size="small">
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={() => setEditingIndex(null)} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
            ) : (
              <Box display="flex" alignItems="center">
                <Typography
                  variant="body1"
                  style={{
                    padding: '8px',
                    backgroundColor: msg.sender === 'You' ? '#3f51b5' : '#f1f1f1',
                    color: msg.sender === 'You' ? 'white' : 'black',
                    borderRadius: '8px',
                    maxWidth: '60%',
                    wordWrap: 'break-word',
                  }}
                >
                  {msg.text}
                </Typography>
                {msg.sender === 'You' && (
                  <IconButton onClick={(e) => handleMenuOpen(e, index)} size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            )}
          </Box>
        </Box>
      ))}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEdit(editingIndex!, chat.messages[editingIndex!].text)}>Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(editingIndex!)}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default ChatWindow;
