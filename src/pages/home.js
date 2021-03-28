import React, { useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers, openChat } from "../redux/actions/dataActions";
import { useSelector } from "react-redux";
// MUI
import {
  Grid,
  Typography,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Container,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ChatIcon from "@material-ui/icons/Chat";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  homeDiv: {
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    paddingRight: 260,
    [theme.breakpoints.down(930)]: {
      paddingRight: 0,
    },
  },
  cardGrid: {
    paddingTop: theme.spacing(12),
    paddingBottom: 0,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "90%",
  },
  cardContent: {
    flexGrow: 1,
    padding: 6,
  },
  profileHandle: {
    lineHeight: 1,
  },
  cardActions: {
    paddingTop: 0,
    paddingBottom: 12,
    justifyContent: "center",
  },
  chatBtn: {
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#c72b66",
    },
  },
}));

function Home(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const profile = useSelector((state) => state.firebase.profile);
  const {
    data: { loading, allUserData },
  } = props;

  useEffect(() => {
    if (profile.lookingFor) {
      let page = 1;
      if (window.screen.availHeight > 2000) {
        page = 2;
      }
      const handleScroll = () => {
        var elm = document.getElementById(`card_${10 * page}`);
        if (elm !== null) {
          if (
            elm.getBoundingClientRect().bottom <
            window.screen.availHeight + 30
          ) {
            page++;
            dispatch(getAllUsers(12 * page));
          }
        }
      };

      if (!loading && allUserData.length < 12) {
        console.log(allUserData.length < 12);
        dispatch(getAllUsers(page * 12));
      }
      window.addEventListener("scroll", handleScroll);

      return () => {
        if (window.screen.availHeight > 2000 && page > 2) {
          dispatch({
            type: "RESET_ALLUSERS",
            payload: 25,
          });
        } else if (window.screen.availHeight <= 2000 && page > 1) {
          dispatch({
            type: "RESET_ALLUSERS",
            payload: 13,
          });
        }
        window.removeEventListener("scroll", handleScroll);
      };
    }
    // eslint-disable-next-line
  }, [profile.lookingFor]);

  const handleOpenChat = (user2) => {
    openChat(user2);
  };
  return (
    <div className={classes.homeDiv}>
      {loading ? (
        <Container className={classes.cardGrid} style={{ maxWidth: 1350 }}>
          <Grid container spacing={4}>
            {Array.from({ length: 12 }).map((card, key) => (
              <Grid item key={key} xs={12} sm={6} md={6} lg={4}>
                <Skeleton
                  className={classes.grid}
                  variant="rect"
                  width="100%"
                  height={371.39}
                />
                <Skeleton variant="text" width="100%" height={30} />
                <Skeleton
                  className={classes.grid}
                  variant="rect"
                  width="100%"
                  height={58}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Container className={classes.cardGrid} style={{ maxWidth: 1350 }}>
          <Grid container spacing={4}>
            {allUserData.map((userData, key) => {
              let user1 = profile.userId;
              let user2 = userData.userId;
              return (
                <Grid
                  item
                  id={`card_${key}`}
                  key={key}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                >
                  <Card className={classes.card} elevation={3}>
                    <CardMedia
                      image={userData.imageUrl}
                      className={classes.cardMedia}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        className={classes.profileHandle}
                      >
                        {userData.handle}, {userData.age}
                        {userData.height && <Fragment>,</Fragment>}{" "}
                        {userData.height}
                        {userData.height && <Fragment>cm</Fragment>}
                        {userData.state === "online" ? (
                          <div
                            style={{
                              backgroundColor: "#44b700",
                              color: "#44b700",
                              paddingTop: 5,
                              float: "right",
                              width: 10,
                              height: 5,
                              borderRadius: "50%",
                              border: "1px solid currentColor",
                              content: '""',
                              marginTop: 4,
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              backgroundColor: "#f53939",
                              color: "#f53939",
                              paddingTop: 5,
                              float: "right",
                              width: 10,
                              height: 5,
                              borderRadius: "50%",
                              border: "1px solid currentColor",
                              content: '""',
                              marginTop: 4,
                            }}
                          />
                        )}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      <Button
                        component={Link}
                        to={`/users/${userData.userId}`}
                        variant="contained"
                        size="medium"
                        className={classes.chatBtn}
                        color="primary"
                        startIcon={<PersonIcon />}
                      >
                        Profils
                      </Button>
                      <Button
                        component={Link}
                        to={
                          `/chat/` +
                          (user1 < user2
                            ? user1 + "_" + user2
                            : user2 + "_" + user1)
                        }
                        onClick={handleOpenChat.bind(this, user2)}
                        variant="contained"
                        size="medium"
                        className={classes.chatBtn}
                        color="primary"
                        startIcon={<ChatIcon />}
                      >
                        Čatot
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, {})(Home);
