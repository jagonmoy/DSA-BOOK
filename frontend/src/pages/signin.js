import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Navbar from "../components/navbar";
import Home from "./home";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin() {
  const classes = useStyles();
  const history = useHistory()


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popUp, setPopUp] = useState("");

  function submitHandelar(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/api/auth/signin/",
      data: { email, password },
      validateStatus: () => true,
    }).then(
      (res) => {
        if (res.status === 200) {
          const msg = "Signed in Successfully!!"
          localStorage.setItem("popup", msg);
          localStorage.setItem("username", res.data.data);
          setPopUp("Success");
        }
        else setPopUp("Failed");
      },
      (error) => {
        setPopUp("Failed");
      }
    );
    setTimeout(function(){ window.localStorage.removeItem("popup") }, 2000)
  }

  if (localStorage.getItem('username') === null ) return (
    <>
      <CssBaseline />
      <Navbar />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitHandelar}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid item>
              <Link onClick={() => history.push("./signup")} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Grid item style={{ marginTop: 20 }}>
              {popUp === "Failed" && (
                <Alert severity="error">
                  <AlertTitle>Sign in Unsuccessfull!</AlertTitle>
                  <strong>Wrong email or Password</strong>
                </Alert>
              )}
              {popUp === "Success" && history.push("./")}
            </Grid>
          </form>
        </div>
      </Container>
      {/* {setTimeout(function(){ window.localStorage.removeItem("popup") }, 2000)} */}
    </>
  );
  else return <Home/>
}
