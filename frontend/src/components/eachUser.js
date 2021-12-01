import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import theme from "../theme";
import { useHistory } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  basic: {
    marginTop: theme.spacing(3),
  },
}));

export default function Blog(props) {
  const classes = useStyles(theme);
  const history = useHistory();

  const {user} = props;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography
             variant="subtitle2" component="p"
              color="primary"
            >
              Username: {user.username}
            </Typography>
            <Typography variant="subtitle2" component="p">
              Name : {user.name}
            </Typography>
            <Typography variant="subtitle2" component="p">
              Email : {user.email}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
