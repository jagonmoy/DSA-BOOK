import React , {useState,useEffect} from 'react';
import axios from "axios";
import EachUser from  '../components/eachUser'
import { makeStyles } from '@material-ui/core/styles';
import {Container} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import theme from '../theme';
import Navbar from '../components/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import PageNotFound from './pageNotFound'



const useStyles = makeStyles((theme) => ({
  blogContainer: {
    paddingTop: theme.spacing(2),
  },

}));


export default function Users() {
    const classes = useStyles(theme);
    const [users, setUsers] = useState([]);
    document.title = "BlOG"
  
     
    useEffect(() => {
      axios({
          method: 'GET',
          url: `/api/users`,
          validateStatus: () => true
      }).then(res => {
        if (res.status === 200) {
          const allUsers = res.data.data;
          setUsers(allUsers);
        }
        }, (error) => {
          console.log(error)
      });
    },[]);

    return (
      <>
        <CssBaseline/>
        <Navbar />
        <Container maxWidth="lg" >
        <br/>
          <br />
          <br/>
          <Grid container spacing={3}>
           {users.map((user) => (
              <EachUser user={user} key={user._id}/>
            ))}
          </Grid>
          <Grid
          container
          direction="column"
          justifyContent="center"
            alignItems="center"
            style={{ paddingTop: 25 }}
            position = "static"
          >
          </Grid>
          
        </Container>
      </>
        
    );
    
}
