import React, { Fragment } from "react";
import EditPartnerDetails from "./EditPartnerDetails";

// MUI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    height: "100%",
  },
  paperDetails: {
    flex: 1,
  },
  aboutTitle: {
    fontSize: 26,
    [theme.breakpoints.down("xs")]: {
      fontSize: 23,
      marginLeft: 12,
    },
    display: "inline-block",
    margin: "16px 0 16px 24px",
  },
  aboutWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
      paddingTop: 0,
    },
    paddingTop: 0,
  },
  aboutUserBold: {
    marginBottom: 10,
    fontSize: 20,
    [theme.breakpoints.down("xs")]: {
      fontSize: 17,
    },
    fontWeight: "bold",
  },
  aboutUser: {
    wordBreak: "break-word",
    padding: "6px 0",
    fontSize: 18,
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
}));

function StaticIdealPartner(props) {
  const classes = useStyles();
  const { idealPartner, lookingFor, minAge, maxAge } = props.profile;

  return (
    <Fragment>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <div className={classes.paperDetails}>
            <div>
              <p component="h2" className={classes.aboutTitle}>
                Es meklēju
              </p>
              {window.location.pathname.includes("my_profile") && (
                <EditPartnerDetails credentials={props.profile} />
              )}
            </div>
            <div className={classes.aboutWrapper}>
              <div className={classes.aboutUserBold}>
                {lookingFor === "male"
                  ? "Vīrieti"
                  : lookingFor === "female"
                  ? "Sievieti"
                  : "Jebkuru"}
                {minAge > "18" && maxAge < "75" && minAge
                  ? `, vecumā no ${minAge} līdz ${maxAge} gadiem`
                  : minAge === "18"
                  ? `, jaunāku par ${maxAge} gadiem`
                  : maxAge >= "75" && minAge > "18"
                  ? `, vecāku par ${minAge} gadiem`
                  : ""}
              </div>
              <div className={classes.aboutUser}>{idealPartner}</div>
            </div>
          </div>
        </Paper>
      </Grid>
    </Fragment>
  );
}

export default StaticIdealPartner;
