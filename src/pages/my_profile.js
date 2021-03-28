import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Footer from "../components/footer/Footer";
import firebase from "firebase/app";
import "firebase/auth";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

import StaticProfile from "../components/StaticProfile.js";
import StaticAbout from "../components/StaticAbout";
import StaticIdealPartner from "../components/StaticIdealPartner";
import StaticInfo from "../components/StaticInfo";

import ProfileSkeleton from "../util/ProfileSkeleton";
import AboutSkeleton from "../util/AboutSkeleton";
import PartnerSkeleton from "../util/PartnerSkeleton";

import { connect, useDispatch } from "react-redux";
import { deleteProfile } from "../redux/actions/userActions";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  myProfileDiv: {
    paddingTop: 94,
    backgroundColor: "#f9f9f9",
    paddingRight: 250,
    paddingLeft: 250,
    [theme.breakpoints.down(1660)]: {
      paddingLeft: 0,
    },
    [theme.breakpoints.down(930)]: {
      paddingRight: 0,
    },
  },
  profileContainer: {
    flex: "1 1 100%",
    [theme.breakpoints.down(930)]: {
      paddingRight: 8,
      paddingLeft: 8,
    },
  },
  deleteBtn: {
    margin: "24px 0",
    color: "white",
    fontSize: 11,
    backgroundColor: "#EF4183",
    "&:hover": {
      backgroundColor: "#c72b66",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 9,
    },
  },
}));

function MyProfile(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const profile = useSelector((state) => state.firebase.profile);
  const auth = useSelector((state) => state.firebase.auth);

  const [openDialog, setOpenDialog] = useState(false);
  const [pass, setPass] = useState("");
  const [errors, setErr] = useState({});
  const [usingFB, setUsingFB] = useState(false);

  useEffect(() => {
    var errors = props.UI.errors;
    if (isLoaded(auth)) {
      if (auth.providerData[0].providerId === "facebook.com") setUsingFB(true);
    }
    if (errors !== null) setErr(errors);
    return () => {
      errors = null;
    };
  }, [props.UI.errors]);

  const handleClick = () => {
    if (usingFB) {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          dispatch(deleteProfile(null, true));
        })
        .catch(() => {
          props.UI.errors.passwordDeleteAccFail =
            "Kaut kas nogāja greizi, mēģiniet vēlreiz vai sazinieties ar mums: info@istaiespeja.lv";
        });
    } else {
      setOpenDialog(true);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div className={classes.myProfileDiv}>
        <Container
          style={{ maxWidth: 1150 }}
          className={classes.profileContainer}
        >
          {!isLoaded(profile) ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={profile} />
          )}
          <Grid container spacing={3} style={{ marginBottom: 16 }}>
            {!isLoaded(profile) ? (
              <AboutSkeleton />
            ) : (
              <StaticAbout profile={profile} />
            )}

            {!isLoaded(profile) ? (
              <PartnerSkeleton />
            ) : (
              <StaticIdealPartner profile={profile} location="myProfile" />
            )}
            {!isLoaded(profile) ? <PartnerSkeleton /> : <StaticInfo />}
          </Grid>
          <div style={{ textAlign: "center" }}>
            <Button
              className={classes.deleteBtn}
              color="primary"
              onClick={handleClick}
            >
              Izdzēst Profilu
            </Button>
            {errors.passwordDeleteAccFail && (
              <Box
                style={{ marginTop: -23, marginBottom: 24 }}
                color="error.main"
              >
                {errors.passwordDeleteAccFail}
              </Box>
            )}
          </div>
        </Container>
        <Dialog open={openDialog}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setOpenDialog(false);
              dispatch(deleteProfile(auth.email, pass));
            }}
          >
            <DialogContent>
              <DialogContentText>
                Lūdzu, ievadiet paroli, lai izdzēstu profilu.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Parole"
                type="password"
                style={{
                  width: "100%",
                }}
                id="current-password"
                name="password"
                size="small"
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoComplete="current-password"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setPass("");
                  setOpenDialog(false);
                }}
                color="primary"
              >
                Atcelt
              </Button>
              <Button color="primary" type="submit">
                Turpināt
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
      <div style={{ flex: 1, backgroundColor: "#f9f9f9" }} />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, {})(MyProfile);
