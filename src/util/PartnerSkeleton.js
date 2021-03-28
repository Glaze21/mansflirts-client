import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  ...theme.spreadIt,
  paper: {
    display: "flex",
    padding: theme.spacing(2),
    paddingTop: "0",
    paddingRight: "0",
    height: 286,
  },
  handle: {
    height: 25,
    backgroundColor: theme.palette.primary.main,
    width: 160,
    marginLeft: theme.spacing(2),
    fontSize: 26,
    display: "inline-block",
    marginTop: 16,
    marginBottom: 16,
  },
  fullLine: {
    height: 18,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "240%",
    marginBottom: 8,
  },
  halfLine: {
    height: 18,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "80%",
  },
  aboutUser: {
    padding: theme.spacing(3),
    paddingTop: 6,
    paddingBottom: 6,
    marginBottom: 4,
    fontSize: 18,
  },
  aboutTitle: {
    paddingLeft: theme.spacing(2),
    fontSize: 26,
    display: "inline-block",
    marginTop: 16,
    marginBottom: 16,
  },
});

const IntrestsSkeleton = (props) => {
  const { classes } = props;
  return (
    <Grid item xs={12} md={6}>
      <Paper className={classes.paper}>
        <div className={classes.profileDetails}>
          <div className={classes.handle} />
          <div className={classes.aboutUser}>
            <div className={classes.fullLine} />
            <div className={classes.halfLine} />
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

IntrestsSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntrestsSkeleton);
