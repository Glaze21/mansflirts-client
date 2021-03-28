import React, { Fragment, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  blockUser,
  openChat,
  buyCoinsDialog,
} from "../redux/actions/dataActions";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import axios from "axios";
//MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button, ClickAwayListener, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FsLightbox from "fslightbox-react";
import ForumIcon from "@material-ui/icons/Forum";
import { Link } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import BlockIcon from "@material-ui/icons/Block";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  mainProfile: {
    position: "relative",
    marginBottom: theme.spacing(3),
    backgroundSize: "cover",
  },
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1),
    },
  },
  profileDetails: {
    paddingLeft: 16,
    [theme.breakpoints.only("xs")]: {
      paddingTop: 10,
    },
    position: "relative",
    [theme.breakpoints.down(1150)]: {
      minWidth: 580,
      paddingLeft: 0,
    },
    [theme.breakpoints.down(630)]: {
      minWidth: 0,
    },
  },
  imageWrapper: {
    flex: "0 0 16rem",
    overflow: "hidden",
    position: "relative",
    maxWidth: "100%",
    display: "block",
    [theme.breakpoints.only("sm")]: {
      flex: "0 0 18rem",
    },
    [theme.breakpoints.down("xs")]: {
      flex: "0 0 35rem",
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
  userTitle: {
    display: "flex",
    fontSize: 26,
    [theme.breakpoints.only("xs")]: {
      fontSize: 20,
    },
  },
  userBio: {
    wordBreak: "break-word",
    fontSize: 20,
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  wrapper: {
    display: "flex",
    position: "relative",
    width: "100%",
  },
  photosWrapper: {
    position: "relative",
    display: "inline-block",
  },
  userImages: {
    boxSizing: "border-box",
    "&:hover": {
      border: "solid 2px #ef4183",
    },
    padding: theme.spacing(0),
    width: 183.6,
    height: 173.6,
    objectFit: "cover",
    marginLeft: "auto",
    marginRight: "auto",
  },
  rightArrow: {
    position: "absolute",
    right: 0,
    top: 62,
    color: "white",
  },
  leftArrow: {
    position: "absolute",
    left: 0,
    top: 62,
    color: "white",
  },
  badge: {
    position: "relative",
    marginTop: 14,
    marginLeft: 5,
    [theme.breakpoints.down("xs")]: {
      marginTop: 10,
    },
  },
  redBadge: {
    width: 12,
    height: 12,
    backgroundColor: "#f53939",
    borderRadius: "50%",
    position: "absolute",
  },
  ringingRed: {
    border: "3px solid #ff4646",
    borderRadius: 30,
    height: 12,
    width: 12,
    top: -3,
    left: -3,
    position: "absolute",
    animation: "$ripple 1.2s infinite ease-in-out",
    opacity: 0.0,
  },
  // eslint-disable-next-line
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.4)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 0,
    },
  },
  greenBadge: {
    width: 12,
    height: 12,
    backgroundColor: "#62bd19",
    borderRadius: "50%",
    position: "absolute",
  },
  ringingGreen: {
    border: "3px solid #62bd19",
    borderRadius: 30,
    height: 12,
    width: 12,
    top: -3,
    left: -3,
    position: "absolute",
    animation: "$ripple 1.2s infinite ease-in-out",
    opacity: 0.0,
  },
  btnContainerMobile: {
    flexWrap: "nowrap",
    display: "flex",
    maxWidth: "100%",
    padding: "8px 0",
  },
  btnContainer: {
    flexWrap: "nowrap",
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    padding: "8px 0",
    [theme.breakpoints.up("sm")]: {
      padding: 0,
    },
  },
  btnWrapper: {
    position: "relative",
    flexGrow: 1,
  },
  chatBtnMobile: {
    width: "100%",
    padding: "6px 8px",
    fontSize: "2.25vw",
    [theme.breakpoints.up("sm")]: {
      fontSize: 12,
      height: 45,
      padding: "6px 8px",
    },
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#c72b66",
    },
  },
  btnsSm: {
    flexBasis: "18%",
    [theme.breakpoints.down(1150)]: {
      width: 200,
      position: "absolute",
      right: 16,
    },
  },
  mobileHandle: {
    [theme.breakpoints.down(355)]: {
      fontSize: "5.5vw",
    },
  },
  giftShopContainer: {},
  giftShop: {
    display: "flex",
    flexDirection: "row",
  },
}));

const GiftArea = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-left: 272px;
  width: -webkit-fill-available;
  width: -moz-available;
  overflow-x: auto;
  @media (max-width: 960px) {
    margin-left: 304px;
  }
  @media (max-width: 600px) {
    bottom: 100px;
    margin-left: 0;
  }
  /* width */
  ::-webkit-scrollbar {
    height: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: white;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Mozilla */
  scrollbar-color: #888 white;
  scrollbar-width: thin;
`;
const StyledImg = styled.img`
  margin: 15px 11px 0 11px;
  :hover {
    margin: 0;
    padding: 0 11px 15px 11px;
    cursor: pointer;
  }
`;

const gifts = [50, 50, 50, 50, 50, 50, 50, 50, 50];

function StaticPublicProfile(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user1, setUser1] = useState("");
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });
  const [giftsOpen, setGiftsOpen] = useState(false);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setUser1(user.uid);
  //     }
  //   });
  // }, [props.profile.userImages, props.profile.imageUrl]);

  const openLightboxOnSlide = (number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  };

  const handleScroll = (direction) => (e) => {
    var element = document.getElementById("images");
    element.scrollBy(direction, 0);
  };
  const handleOpenChat = (user2) => {
    openChat(user2);
  };
  const handleGift = (data, e) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios
          .post("/buyGift", data)
          .then(() => {
            setGiftsOpen(false);
            firebase
              .database()
              .ref(
                "/chats/" +
                  (user1 < userId
                    ? user.uid + "_" + userId
                    : userId + "_" + user.uid)
              )
              .push({
                text: data.giftUrl,
                timestamp: Date.now(),
                uid: user.uid,
                type: "gift",
              })
              .then(() => {
                openChat(userId);
              });
          })
          .catch((err) => {
            if (err.response.data.message === undefined) {
              console.log(err);
            } else if (err.response.data.message === "Nepietiek monētu!") {
              dispatch(buyCoinsDialog(true));
            } else {
              console.log(err);
            }
          });
      }
    });
  };

  const {
    profile: { handle, imageUrl, height, age, bio, state, userImages, userId },
    blockedUsers,
  } = props;
  let user2 = userId;

  return (
    <Fragment>
      <Paper className={classes.mainProfile}>
        <Grid container className={classes.container}>
          <Grid item className={classes.imageWrapper}>
            <div
              alt="profile"
              className={classes.imageBtn}
              onClick={() => openLightboxOnSlide(1)}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <Hidden smUp>
              <div className={classes.btnContainerMobile}>
                <div className={classes.btnWrapper}>
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
                    className={classes.chatBtnMobile}
                    color="primary"
                    startIcon={<ForumIcon style={{ fontSize: 17 }} />}
                  >
                    <span>Sūtīt ziņu</span>
                  </Button>
                </div>
                <div className={classes.btnWrapper}>
                  <Button
                    onClick={() => setGiftsOpen(true)}
                    variant="contained"
                    size="medium"
                    className={classes.chatBtnMobile}
                    color="primary"
                    startIcon={
                      <FontAwesomeIcon
                        icon={faGift}
                        size="lg"
                        style={{ fontSize: 17 }}
                      />
                    }
                  >
                    Sūtīt dāvanu
                  </Button>
                </div>
                <div className={classes.btnWrapper}>
                  <Button
                    onClick={() => dispatch(blockUser(userId))}
                    variant="contained"
                    size="medium"
                    className={classes.chatBtnMobile}
                    style={{ backgroundColor: "#aeb4b7" }}
                    color="primary"
                    startIcon={<BlockIcon style={{ fontSize: 17 }} />}
                  >
                    {blockedUsers === undefined
                      ? "Bloķēt"
                      : blockedUsers.includes(userId)
                      ? "Atbloķēt"
                      : "Bloķēt"}
                  </Button>
                </div>
              </div>
            </Hidden>
          </Grid>
          <Grid item md>
            <div className={classes.profileDetails}>
              <Typography
                component="h1"
                className={classes.userTitle}
                gutterBottom
              >
                <div>
                  {handle},{" "}
                  <span className={classes.mobileHandle}>
                    {age}
                    {height && <Fragment>,</Fragment>} {height}
                    {height && <Fragment>cm</Fragment>}
                  </span>
                </div>
                <div className={classes.badge}>
                  {state === "online" ? (
                    <Fragment>
                      <div className={classes.greenBadge} />
                      <div className={classes.ringingGreen} />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className={classes.redBadge} />
                      <div className={classes.ringingRed} />
                    </Fragment>
                  )}
                </div>
              </Typography>
              <Typography className={classes.userBio} paragraph>
                {bio}
              </Typography>
            </div>
          </Grid>
          <Grid item md={3} className={classes.btnsSm}>
            <Hidden xsDown>
              <div className={classes.btnContainer}>
                <div className={classes.btnWrapper}>
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
                    className={classes.chatBtnMobile}
                    color="primary"
                    startIcon={<ForumIcon />}
                  >
                    <span style={{ marginTop: 1 }}>Sūtīt ziņu</span>
                  </Button>
                </div>
                <div className={classes.btnWrapper}>
                  <Button
                    onClick={() => setGiftsOpen(true)}
                    variant="contained"
                    size="medium"
                    className={classes.chatBtnMobile}
                    color="primary"
                    startIcon={
                      <FontAwesomeIcon
                        icon={faGift}
                        size="lg"
                        style={{ fontSize: 20 }}
                      />
                    }
                  >
                    <span style={{ marginTop: 1 }}> Sūtīt dāvanu</span>
                  </Button>
                </div>
                <div className={classes.btnWrapper}>
                  <Button
                    onClick={() => dispatch(blockUser(userId))}
                    variant="contained"
                    size="medium"
                    className={classes.chatBtnMobile}
                    style={{ backgroundColor: "#aeb4b7" }}
                    color="primary"
                    startIcon={<BlockIcon />}
                  >
                    <span style={{ marginTop: 1 }}>
                      {blockedUsers === undefined
                        ? "Bloķēt"
                        : blockedUsers.includes(userId)
                        ? "Atbloķēt"
                        : "Bloķēt"}
                    </span>
                  </Button>
                </div>
              </div>
            </Hidden>
          </Grid>
        </Grid>
        {giftsOpen && (
          <ClickAwayListener onClickAway={() => setGiftsOpen(false)}>
            <GiftArea>
              <Paper
                className={classes.giftShopContainer}
                id="giftShopContainer"
                onClick={() => setGiftsOpen(true)}
              >
                <div
                  style={{
                    padding: "12px 8px 6px 8px",
                  }}
                >
                  <div className={classes.giftShop}>
                    {gifts.map((gift, key) => (
                      <div key={key} style={{ textAlign: "center" }}>
                        <StyledImg
                          src={`https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/icon_00${
                            key + 1
                          }.svg?alt=media`}
                          alt=""
                          onClick={handleGift.bind(this, {
                            giftUrl: `https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/icon_00${
                              key + 1
                            }.svg?alt=media`,
                            value: gift,
                          })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Paper>
            </GiftArea>
          </ClickAwayListener>
        )}
      </Paper>
      <Paper style={{ marginBottom: 24, height: 172.5 }}>
        <div className={classes.wrapper}>
          <div className="scrolls" id="images">
            {userImages != null ? (
              <div style={{ width: 183.64 * userImages.length }}>
                {userImages.map((image, key) => {
                  return (
                    <div key={key} className={classes.photosWrapper}>
                      <img
                        src={image}
                        alt="profile"
                        className={classes.userImages}
                        onClick={() => openLightboxOnSlide(key + 2)}
                      />
                    </div>
                  );
                })}
                {userImages.length > 5 ? (
                  <Fragment>
                    <IconButton
                      size="small"
                      disableRipple
                      disableFocusRipple
                      className={classes.leftArrow}
                      onClick={handleScroll(-200)}
                    >
                      <ArrowBackIosIcon style={{ fontSize: 35 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      disableRipple
                      disableFocusRipple
                      className={classes.rightArrow}
                      onClick={handleScroll(200)}
                    >
                      <ArrowForwardIosIcon style={{ fontSize: 35 }} />
                    </IconButton>
                  </Fragment>
                ) : (
                  <Fragment />
                )}
              </div>
            ) : (
              <div style={{ width: 0 }} />
            )}
          </div>
        </div>
      </Paper>
      <FsLightbox
        toggler={lightboxController.toggler}
        type="image"
        sources={[imageUrl].concat(userImages)}
        slide={lightboxController.slide}
      />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps, { openChat })(StaticPublicProfile);
