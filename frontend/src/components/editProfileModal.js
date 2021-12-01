import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import CustomizedSnackbars from './customizedSnackbar'
import EditIcon from '@material-ui/icons/Edit';

export default function EditProfileModal({profileUnit}) {
  const [open, setOpen] = React.useState(false);
  const [institution, setinstitution] = useState(profileUnit.institution);
  const [bloodGroup, setbloodGroup] = useState(profileUnit.bloodGroup);
  const [address, setaddress] = useState(profileUnit.address);
  const history = useHistory()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    

  const handleUpdateClose = (e) => {
        e.preventDefault()
    axios({
        method: 'PATCH',
        url: `/api/users/profile/${localStorage.getItem('username')}`,
        data: {institution,bloodGroup,address},
        validateStatus: () => true
        
    }).then(res => {
      localStorage.setItem('popup', "Prodile Updated Successfully!!")
      history.push(`/profile/${localStorage.getItem('username')}`);
   
      }, (error) => {
    });       

    setOpen(false);
 
   
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen} style={{marginLeft : 10}} >
        <EditIcon/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">EDIT BLOG</DialogTitle>
        <DialogContent>
            <TextareaAutosize
              id="outlined-multiline-static"
              label="Blood Group"
              fullWidth
              multiline
              maxRows={2}
              value={bloodGroup}
            onChange={(e) => setbloodGroup(e.target.value)}
            style = {{paddingBottom: 20}}
          />
             <TextareaAutosize
              id="outlined-multiline-static"
              label="Address"
              fullWidth
              multiline
              maxRows={2}
              value={address}
            onChange={(e) => setaddress(e.target.value)}
            style = {{paddingBottom: 20}}
          />
          <TextareaAutosize
              id="outlined-multiline-static"
              label="Institution"
              fullWidth
              multiline
              maxRows={2}
              value={institution}
            onChange={(e) => setinstitution(e.target.value)}
            style = {{paddingBottom: 20}}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateClose} color="primary">
              Update
            </Button>
            {localStorage.getItem('popup') !== null && <CustomizedSnackbars message={localStorage.getItem('popup')} /> }
          </DialogActions>
        </DialogContent>
      </Dialog> 
    </>
  );
}
