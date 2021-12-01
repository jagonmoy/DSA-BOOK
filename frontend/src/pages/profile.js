import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import theme from "../theme";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/navbar";
import { Container } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditProfileModal from "../components/editProfileModal";
import DeleteProfileModal from "../components/deleteProfileModal";
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {

  },
  basic: {
    marginTop: theme.spacing(3),
    display: "block",
    width: "100%",
    transitionDuration: "0.3s",
  },

}));

export default function Profile() {
  const classes = useStyles(theme);
  const [profile, setprofile] = useState([]);
  const history = useHistory()
  const [Profile,setProfile] = useState('')
  const [address,setaddress] = useState('')
  const [institution,setinstitution] = useState('')
  const [bloodGroup,setbloodGroup] = useState('')
  const checkPopUp = localStorage.getItem('popup');

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/users/profile/${localStorage.getItem('username')}`,
      validateStatus: () => true,
    }).then(
      (res) => {
        if (res.status === 200) {
            setProfile(true);
          const profile = res.data.data;
          setTimeout(function () {
            setprofile(profile);
          }, 1000);
          setTimeout(function () {
            window.localStorage.removeItem("popup")
          }, 500);
        }
        else {
          setProfile(false);
        }
      },
      (error) => {
        // history.push('/pageNotFound')
        console.log(error);
      }
    );
  
  }, [checkPopUp,setProfile]);


  function submitHandelar(e) {
    e.preventDefault()
    
    axios({
        method: 'POST',
        url: '/api/users/profile',
        data: {institution,bloodGroup,address},
        validateStatus: () => true
    }).then(res => {
        localStorage.setItem("popup","Profile Created Successfully!!!!")
        setProfile(true)
        history.push(`/profile/${localStorage.getItem('username')}`);
      }, (error) => {
         
      }); 
  }



  if (Profile) return (
    <>
      <CssBaseline/>
      <Navbar />
      <Container
        styles={{
          display: "flex",
        }}
      >
        <Grid item className={classes.basic}>

        <Grid container item xs={12}>
        <Typography
           Typography Typography variant="body1" gutterBottom color = "primary"
            style={{ paddingRight: 7 }}
          >
            Username : 
          </Typography>

          <Typography
           Typography Typography variant="body1" gutterBottom
            style={{ paddingBottom: 10 }}
          >
            {profile.username}
          </Typography>
        </Grid>

        <Grid container item xs={12}>
        <Typography
           Typography Typography variant="body1" gutterBottom color = "primary"
            style={{ paddingRight: 7 }}
          >
            Blood Group :
          </Typography>

          <Typography Typography variant="body1" gutterBottom style={{ paddingBottom: 10 }}>
            {profile.bloodGroup}
          </Typography>
        </Grid>

        <Grid container item xs={12}>
        <Typography
           Typography Typography variant="body1" gutterBottom color = "primary"
            style={{ paddingRight: 7 }}
          >
            Address :
          </Typography>

          <Typography Typography variant="body1" gutterBottom style={{ paddingBottom: 10 }}>
            {profile.address}
          </Typography>
        </Grid>

        <Grid container item xs={12}>
        <Typography
           Typography Typography variant="body1" gutterBottom color = "primary"
            style={{ paddingRight: 7 }}
          >
            Institution :
          </Typography>

          <Typography Typography variant="body1" gutterBottom style={{ paddingBottom: 10 }}>
           {profile.institution}
          </Typography>
        </Grid>
          <div style = {{paddingBottom : 20}}>
            {profile.username === localStorage.getItem("username") && (
              <DeleteProfileModal/>
            )} 
            {profile.username === localStorage.getItem("username") && (
              <EditProfileModal profileUnit={profile} />
            )}
          </div>
        </Grid>
      
      </Container>
    </>
  );
  else return (
    <>
      <CssBaseline />
      <Navbar />
      <Container component="main" maxWwdth="xs" style={{ paddingTop: 25 }}>
         <form className={classes.form} noValidate onSubmit={submitHandelar}>
              <TextField
                id="outlined-multiline-flexible"
                label="Blood Group"
                fullWidth
                multiline
                maxRows={2}
                value={bloodGroup}
                onChange={(e) => setbloodGroup(e.target.value)}
              />
              <TextField
                id="outlined-textarea"
                label="Address"
                fullWidth
                maxRows={10}
                multiline
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
               <TextField
                id="outlined-multiline-flexible"
                label="Institution"
                fullWidth
                multiline
                maxRows={2}
                value={institution}
                onChange={(e) => setinstitution(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add Profile
              </Button>
            </form>
      </Container>
    </>
  );
}
