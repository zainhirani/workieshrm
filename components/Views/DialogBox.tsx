import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

type CustomDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
  actions?: React.ReactNode | boolean;
  btnText?:string;
};

const CustomDialog: React.FC<CustomDialogProps> = ({ open, onClose, title, content, actions,btnText }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {actions ? (
          actions
        ) : (
          <>
          <Button onClick={onClose} variant="outlined" color="error">
              Cancel
          </Button>
          <Button type="submit" onClick={onClose} color="primary" variant="contained">
                {btnText ?? "Close"}
          </Button>
              </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
