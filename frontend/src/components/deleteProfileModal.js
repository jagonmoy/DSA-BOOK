import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';


export default function DeleteProfileModal() {
    const [open, setOpen] = React.useState(false);
    const history = useHistory()

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const handleYesClose = () => {
        axios({
            method: 'DELETE',
            url: `/api/users/profile/${localStorage.getItem('username')}`,
            validateStatus: () => true
            
        }).then(res => {
          localStorage.setItem('popup','Prodile Deleted Successfully')
          history.push(`/profile/${localStorage.getItem('username')}`);
          }, (error) => {
        }); 
      setOpen(false);
      setTimeout(function(){ window.localStorage.removeItem("popup") }, 2000)
    };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen} >
       <DeleteIcon/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleYesClose} color="primary" autoFocus>
            Yes
         </Button>
        </DialogActions>
          </Dialog>
    </>
  );
}
