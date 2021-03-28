import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  ...theme.spreadIt,
  paper: {
    display: "flex",
    padding: "0px 0px 16px 16px",
    height: 286,
  },
  paperDetails: {
    flex: 1,
  },
  handle: {
    height: 25,
    backgroundColor: theme.palette.primary.main,
    width: 100,
    marginLeft: theme.spacing(2),
    fontSize: 26,
    display: "inline-block",
    marginTop: 16,
    marginBottom: 16,
  },
  halfLine: {
    marginTop: 15,
    marginLeft: 25,
    height: 18,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "150%",
  },
});

const AboutSkeleton = (props) => {
  const { classes } = props;
  return (
    <Grid item xs={12} md={6}>
      <Paper className={classes.paper}>
        <div className={classes.profileDetails}>
          <div className={classes.handle} />
          <div className={classes.aboutUser}>
            <div className={classes.halfLine} />
            <div className={classes.halfLine} />
            <div className={classes.halfLine} />
            <div className={classes.halfLine} />
            <div className={classes.halfLine} />
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

AboutSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutSkeleton);
