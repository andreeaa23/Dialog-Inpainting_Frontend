import React, {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const HelpMenu = ({ open, onClose }) => {

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" 
        fullWidth={true}>
          <DialogTitle style={{ fontSize: "20px", textAlign: "center" }}>
            <b style={{color:"#427D9D"}}>Help Menu</b>
            <IconButton
              aria-label="close"
              onClick={onClose}
              style={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
            <p>Welcome to our app! This guide will help you understand how to use our features effectively.</p>

<p><b style={{ color: '#427D9D' }}>Searching for Titles</b></p>
<p>1. <b>Search</b>: You can search for any title on English Wikipedia using the search bar.<br />
2. <b>View Content</b>: Once you search for a title, the relevant content from Wikipedia will be displayed.</p>

<p><b style={{ color: '#427D9D' }}>Starting a Conversation</b></p>
<p>1. <b>New Conversation</b>: After viewing the content, you can start a new conversation by clicking on a title.<br />
2. <b>Ask Questions</b>: In the conversation, you can ask questions related to the displayed content.<br />
3. <b>Get Answers</b>: The app will provide answers to your questions based on the information available.</p>

<p><b style={{ color: '#427D9D' }}>Managing Conversations</b></p>
<p>1. <b>Save Conversation</b>: If you find the conversation useful, you can save it for future reference by clicking the "Save" button.<br />
2. <b>Delete Conversation</b>: If you no longer need a conversation, you can delete it by clicking on the trash icon near the title.</p>

<p><b style={{ color: 'red' }}>Notes: </b>Please enter a question written as grammatically correct as possible!</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
}

export default HelpMenu