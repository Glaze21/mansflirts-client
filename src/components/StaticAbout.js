import React, { Fragment } from "react";
import EditDetails from "./EditDetails";
// MUI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    height: "100%",
  },
  paperDetails: {
    flex: 1,
  },
  aboutWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
      paddingTop: 0,
    },
    paddingTop: 0,
  },
  aboutUser: {},
  aboutTitle: {
    fontSize: 26,
    [theme.breakpoints.down("xs")]: {
      fontSize: 23,
      marginLeft: 12,
    },
    display: "inline-block",
    margin: "16px 0 16px 24px",
  },
  locationContainer: {
    padding: theme.spacing(0.75, 0),
  },
  location: {
    minWidth: 120,
    verticalAlign: "sub",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "1.8",
    paddingLeft: 6,
    [theme.breakpoints.only("xs")]: {
      fontSize: 17,
    },
  },
  locationIcon: {
    verticalAlign: "middle",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "1.8",
  },
  locationWhere: {
    lineBreak: "anywhere",
    verticalAlign: "bottom",
    marginLeft: "auto",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "1.8",
    [theme.breakpoints.only("xs")]: {
      fontSize: 16,
    },
  },
}));

const StaticAbout = (props) => {
  const classes = useStyles();
  const { location, education, work, drink, smoke } = props.profile;
  return (
    <Fragment>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <div className={classes.paperDetails}>
            <div>
              <p component="h2" className={classes.aboutTitle}>
                Par Mani
              </p>
              {window.location.pathname.includes("my_profile") && (
                <EditDetails credentials={props.profile} />
              )}
            </div>
            <div className={classes.aboutWrapper}>
              <div className={classes.aboutUser}>
                {location && (
                  <Grid container className={classes.locationContainer}>
                    <Grid
                      item
                      xs={5}
                      sm={3}
                      md={4}
                      style={{ minWidth: 125, alignSelf: "center" }}
                    >
                      <Fragment>
                        <LocationOn
                          color="primary"
                          className={classes.locationIcon}
                        />
                        <span className={classes.location}>Dzīvo: </span>
                      </Fragment>
                    </Grid>{" "}
                    <Grid item xs style={{ alignSelf: "center" }}>
                      <Fragment>
                        <span className={classes.locationWhere}>
                          {location}
                        </span>
                      </Fragment>
                    </Grid>
                  </Grid>
                )}
                {education && (
                  <Grid container className={classes.locationContainer}>
                    <Grid
                      item
                      xs={5}
                      sm={3}
                      md={4}
                      style={{ minWidth: 125, alignSelf: "center" }}
                    >
                      <Fragment>
                        <SchoolIcon
                          color="primary"
                          className={classes.locationIcon}
                        />{" "}
                        <span className={classes.location}> Izglītība: </span>
                      </Fragment>{" "}
                    </Grid>
                    <Grid item xs sm style={{ alignSelf: "center" }}>
                      <span className={classes.locationWhere}>{education}</span>
                    </Grid>
                  </Grid>
                )}
                {work && (
                  <Grid container className={classes.locationContainer}>
                    <Grid
                      item
                      xs={5}
                      sm={3}
                      md={4}
                      style={{ minWidth: 125, alignSelf: "center" }}
                    >
                      <Fragment>
                        <WorkIcon
                          color="primary"
                          className={classes.locationIcon}
                        />{" "}
                        <span className={classes.location}>Darbs: </span>
                      </Fragment>{" "}
                    </Grid>
                    <Grid item xs sm style={{ alignSelf: "center" }}>
                      <span className={classes.locationWhere}>{work}</span>
                    </Grid>
                  </Grid>
                )}
                {drink && (
                  <Grid container className={classes.locationContainer}>
                    <Grid
                      item
                      xs={5}
                      sm={3}
                      md={4}
                      style={{ minWidth: 125, alignSelf: "center" }}
                    >
                      <Fragment>
                        <LocalBarIcon
                          color="primary"
                          className={classes.locationIcon}
                        />{" "}
                        <span className={classes.location}>Dzer:</span>
                      </Fragment>
                    </Grid>
                    <Grid item xs sm style={{ alignSelf: "center" }}>
                      <span className={classes.locationWhere}>{drink}</span>
                    </Grid>
                  </Grid>
                )}
                {smoke && (
                  <Grid container className={classes.locationContainer}>
                    <Grid
                      item
                      xs={5}
                      sm={3}
                      md={4}
                      style={{ minWidth: 125, alignSelf: "center" }}
                    >
                      <Fragment>
                        <SmokingRoomsIcon
                          color="primary"
                          className={classes.locationIcon}
                        />{" "}
                        <span className={classes.location}>Smēķē: </span>
                      </Fragment>{" "}
                    </Grid>
                    <Grid item xs sm style={{ alignSelf: "center" }}>
                      <span className={classes.locationWhere}>{smoke}</span>
                    </Grid>
                  </Grid>
                )}
              </div>
            </div>
          </div>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default StaticAbout;
