import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";

// MUI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  mainProfile: {
    position: "relative",
    marginBottom: theme.spacing(3),
    backgroundSize: "cover",
    minHeight: 268,
  },
  container: {
    padding: theme.spacing(2),
  },
  profileDetails: {
    paddingLeft: 16,
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      paddingTop: 8,
      paddingLeft: 12,
    },
  },
  imageWrapper: {
    borderRadius: 5,
    marginTop: 3,
    flex: "0 0 16rem",
    overflow: "hidden",
    position: "relative",
    maxWidth: "100%",
    [theme.breakpoints.down("xs")]: {
      flex: "0 0 34rem",
    },
  },
  imageBtn: {
    paddingTop: "90%",
    display: "block",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
  },
  handle: {
    marginBottom: 18,
    height: 25,
    backgroundColor: theme.palette.primary.main,
    width: 160,
    marginTop: 8,
  },
  fullLine: {
    height: 18,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "80%",
    marginBottom: 8,
  },
  halfLine: {
    height: 18,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "60%",
  },
}));

const ProfileSkeleton = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Paper className={classes.mainProfile}>
        <Grid container className={classes.container}>
          <Grid item className={classes.imageWrapper}>
            <div
              style={{
                backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/no-img_512x512.png?alt=media)`,
              }}
              className={classes.imageBtn}
            >
              <CircularProgress
                style={{ position: "absolute", top: "34%", right: "42%" }}
              />
            </div>
          </Grid>
          <Grid item md={7}>
            <div className={classes.profileDetails}>
              <div className={classes.handle} />
              <div className={classes.fullLine} />
              <div className={classes.halfLine} />
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ marginBottom: 24, height: 173.6 }}></Paper>
    </Fragment>
  );
};

export default ProfileSkeleton;
