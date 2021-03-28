import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Container from "@material-ui/core/Container";
import Footer from "../components/footer/Footer";
import { makeStyles } from "@material-ui/styles";

import StaticPublicProfile from "../components/StaticPublicProfile.js";
import StaticAbout from "../components/StaticAbout";
import StaticIdealPartner from "../components/StaticIdealPartner";

import ProfileSkeleton from "../util/ProfileSkeleton";
import AboutSkeleton from "../util/AboutSkeleton";
import PartnerSkeleton from "../util/PartnerSkeleton";

const useStyles = makeStyles((theme) => ({
  usersDiv: {
    paddingRight: 250,
    paddingLeft: 250,
    [theme.breakpoints.down(1660)]: {
      paddingLeft: 0,
    },
    [theme.breakpoints.down(930)]: {
      paddingRight: 0,
    },
  },
  usersContainer: {
    [theme.breakpoints.down("sm")]: {
      paddingRight: 8,
      paddingLeft: 8,
    },
  },
}));

function User() {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  let { userId } = useParams();
  const myProfile = useSelector((state) => state.firebase.profile);

  useEffect(() => {
    axios
      .get(`/user/${userId}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        paddingTop: 94,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className={classes.usersDiv}>
        <Container
          style={{ maxWidth: 1150 }}
          className={classes.usersContainer}
        >
          {profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticPublicProfile
              profile={profile}
              blockedUser={myProfile.blockedUser}
            />
          )}
          <Grid container spacing={4} style={{ marginBottom: 46 }}>
            {profile === null ? (
              <AboutSkeleton />
            ) : (
              <StaticAbout profile={profile} />
            )}
            {profile === null ? (
              <PartnerSkeleton />
            ) : (
              <StaticIdealPartner profile={profile} location="user" />
            )}
          </Grid>
        </Container>
      </div>
      <div style={{ flex: 1 }} />
      <Footer />
    </div>
  );
}

export default User;
