import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { openChat, buyCoinsDialog } from "../redux/actions/dataActions";
import { useFirebase } from "react-redux-firebase";
import axios from "axios";
import Messages from "./Messages";
import Footer from "../components/footer/Footer";
// Styles
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import styled from "styled-components";
import { faGift, faKissWinkHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// MUI stuff
import {
  ButtonBase,
  Paper,
  Container,
  List,
  Button,
  Hidden,
  Avatar,
  Badge,
  Collapse,
  useMediaQuery,
  ClickAwayListener,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(12),
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(15),
    },
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  centerDiv: {
    padding: "0 64px",
    maxWidth: 1550,
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    placeContent: "center",
    [theme.breakpoints.down(1100)]: {
      paddingLeft: 0,
    },
    [theme.breakpoints.down(930)]: {
      paddingRight: 0,
    },
  },
  middleSection: {
    height: "calc(100vh - 9rem)",
    display: "flex",
    flexDirection: "column",
    maxWidth: 950,
    minWidth: 280,
    width: "100%",
    padding: theme.spacing(1, 2, 8, 2),
    [theme.breakpoints.down(1100)]: {
      padding: theme.spacing(1, 0.5, 8, 0.5),
    },
  },
  leftSection: {
    [theme.breakpoints.up(930)]: {
      height: "calc(100vh - 9rem)",
      maxWidth: "13rem",
      minWidth: "13rem",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(1, 1, 8, 1),
    },
  },
  userPaper: {},
  imageWrapper: {
    overflow: "hidden",
    position: "relative",
    maxWidth: "100%",
  },
  image: {
    paddingTop: "90%",
    display: "block",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  mainFacts: {
    padding: "0 0.6rem",
  },
  name: {
    fontSize: 22,
    margin: "4px 0 0 0",
  },
  info: {
    marginTop: 6,
    fontSize: 17,
    color: "grey",
  },
  profileFacts: {
    color: "grey",
    fontSize: 16,
    padding: "0.6rem",
    display: "flex",
    flexDirection: "column",
  },
  infoBlock: {
    padding: "6px 0px",
    flexBasis: "100%",
  },
  infoBlockQ: {
    fontSize: 14,
    display: "block",
    paddingBottom: 1,
  },
  infoBlockA: {
    display: "block",
  },
  rightSection: {
    [theme.breakpoints.up(930)]: {
      maxWidth: "13rem",
      minWidth: "13rem",
    },
  },
  header: {
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: "0.6rem",
    marginBottom: 3,
    flex: "0 0",
  },
  centerHeader: {},
  aboutUser: {
    display: "flex",
    paddingLeft: 12,
    paddingTop: 6,
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  title: {
    color: "black",
    height: "auto",
    position: "relative",
    fontSize: 23,
    paddingBottom: 2,
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 8,
    },
    "&:visited": {
      textDecoration: "none",
      color: "black",
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
  main: {
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    flex: "auto",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textLogs: {
    flex: "1 1",
    overflowY: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  list: {
    height: 100,
    padding: ".3rem",
  },
  emojis: {
    float: "right",
    display: "flex",
    position: "relative",
    flex: "none",
  },
  textArea: {
    flex: "0 0",
  },
  form: {
    display: "flex",
    height: 55,
  },
  textField: {
    fontSize: 17,
    paddingLeft: 12,
    flex: "1 1",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    border: "0.5px solid grey",
    minWidth: 190,
    "&:focus": {
      outline: "grey solid 0px",
      border: "1px solid black",
    },
    "&:hover": {
      border: "0.5px solid black",
    },
  },
  button: {
    fontSize: 16.5,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 500,
    lineHeight: 1.167,
    letterSpacing: "0em",
    textTransform: "uppercase",
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    "&:hover": {
      backgroundColor: "#bb1354",
    },
  },
  giftShopContainer: {
    width: "inherit",
  },
  giftShop: {
    display: "flex",
    flexDirection: "row",
  },
}));

const StyledBadgeGreen = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);
const StyledBadgeRed = withStyles((theme) => ({
  badge: {
    backgroundColor: "#f53939",
    color: "#f53939",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.8s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.4)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1.8)",
      opacity: 0,
    },
  },
}))(Badge);

const GiftArea = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  position: absolute;
  margin-right: 78px;
  bottom: 55px;
  width: -webkit-fill-available;
  width: -moz-available;
  overflow-x: auto;
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

function Chat() {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const firebase = useFirebase();
  let { usersIds } = useParams();

  const userId = useSelector((state) => state.firebase.auth.uid);
  const myProfile = useSelector((state) => state.firebase.profile);

  const [text, setText] = useState("");
  const [profile, setProfile] = useState(null);
  const [emojisOpen, setEmojisOpen] = useState(false);
  const [giftsOpen, setGiftsOpen] = useState(false);

  useEffect(() => {
    const uids = usersIds.split("_");
    const uid2 = uids.find((x) => x !== userId);

    if (usersIds === `${userId}_${userId}`) {
      window.location = "/";
    }
    axios
      .get(`/user/${uid2}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [location, usersIds]);

  const handleGift = (data, e) => {
    axios
      .post("/buyGift", data)
      .then(() => {
        setGiftsOpen(false);
        firebase
          .push(`/chats/${usersIds}`, {
            text: data.giftUrl,
            timestamp: Date.now(),
            uid: userId,
            type: "gift",
          })
          .then(() => {
            setText("");
            handleScrollBottom();
            openChat(profile.userId);
          });
      })
      .catch((err) => {
        if (err.response.data.message === "Nepietiek monētu!") {
          dispatch(buyCoinsDialog(true));
        } else {
          console.log(err.response.data.message);
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const FieldValue = firebase.firestore.FieldValue;

    if (text !== "") {
      if (myProfile.coins >= 30) {
        firebase
          .updateProfile({ coins: FieldValue.increment(-30) })
          .then(() => {
            firebase.push(`/chats/${usersIds}`, {
              text: text,
              timestamp: Date.now(),
              uid: userId,
              type: "text",
            });
          })
          .then(() => {
            setText("");
            handleScrollBottom();
            openChat(profile.userId);
          })
          .catch((err) => {
            console.error(err);
            console.log("Nevarēja nosūtīt ziņu");
          });
      } else {
        console.log("Nepietiek monētu");
        dispatch(buyCoinsDialog(true));
      }
    }
  };
  const handleScrollBottom = () => {
    let elm = document.getElementById("chatViewport");
    elm.scrollTop = elm.scrollHeight - elm.clientHeight;
  };
  const handleEmojiClick = (emoji, e) => {
    let text1 = (document.getElementById("textBoxInput").value += emoji.native);
    setText(text1);
  };

  const matches = useMediaQuery("(min-width:930px)");

  return profile !== null ? (
    <div className={classes.container} id="container_chat">
      <Container className={classes.centerDiv}>
        <div className={classes.leftSection}>
          {matches && (
            <Paper elevation={5} className={classes.userPaper}>
              <Link
                className={classes.imageWrapper}
                to={`/users/${profile.userId}`}
              >
                <div
                  style={{ backgroundImage: `url(${profile.imageUrl})` }}
                  className={classes.image}
                />
              </Link>
              <div className={classes.mainFacts}>
                <p className={classes.name}>{profile.handle}</p>
                <p className={classes.info}>
                  {profile.age} gadus
                  {profile.gender === "male"
                    ? " vecs vīrietis "
                    : " veca sieviete "}
                  {profile.location ? "no " + profile.location : ""}
                </p>
              </div>
              <hr style={{ border: "0.1px solid #EF4183", margin: 0 }} />
              <div className={classes.profileFacts}>
                <div className={classes.infoBlock}>
                  <span className={classes.infoBlockQ}> Meklē</span>
                  <span className={classes.infoBlockA}>
                    {" "}
                    {profile.lookingFor === undefined
                      ? "Nav atbildes"
                      : profile.lookingFor === "female"
                      ? "Sievieti"
                      : profile.lookingFor === "male"
                      ? "Vīrieti"
                      : "Jebkuru"}
                  </span>
                </div>
                <div className={classes.infoBlock}>
                  <span className={classes.infoBlockQ}> Garums</span>
                  <span className={classes.infoBlockA}>
                    {" "}
                    {profile.height === undefined
                      ? "Nav atbildes"
                      : profile.height}
                  </span>
                </div>
                <div className={classes.infoBlock}>
                  <span className={classes.infoBlockQ}> Smēķē</span>
                  <span className={classes.infoBlockA}>
                    {" "}
                    {profile.smoke === undefined
                      ? "Nav atbildes"
                      : profile.smoke}
                  </span>
                </div>
                <div className={classes.infoBlock}>
                  <span className={classes.infoBlockQ}> Alkohols</span>
                  <span className={classes.infoBlockA}>
                    {" "}
                    {profile.drink === undefined
                      ? "Nav atbildes"
                      : profile.drink}
                  </span>
                </div>
                <div className={classes.infoBlock}>
                  <span className={classes.infoBlockQ}> Profesija</span>
                  <span className={classes.infoBlockA}>
                    {" "}
                    {profile.work === undefined ? "Nav atbildes" : profile.work}
                  </span>
                </div>
                <div className={classes.infoBlock}>
                  <span className={classes.infoBlockQ}> Izglītība</span>
                  <span className={classes.infoBlockA}>
                    {" "}
                    {profile.education === undefined
                      ? "Nav atbildes"
                      : profile.education}
                  </span>
                </div>
              </div>
            </Paper>
          )}
        </div>
        <div className={classes.middleSection}>
          <Paper elevation={5} className={classes.header}>
            <div className={classes.centerHeader}>
              <div className={classes.aboutUser}>
                <Hidden mdUp>
                  {profile.state === "online" ? (
                    <StyledBadgeGreen
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                    >
                      <Avatar alt="" src={profile.imageUrl} />
                    </StyledBadgeGreen>
                  ) : (
                    <StyledBadgeRed
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                    >
                      <Avatar alt="Remy Sharp" src={profile.imageUrl} />
                    </StyledBadgeRed>
                  )}
                </Hidden>
                <Link className={classes.title} to={`/users/${profile.userId}`}>
                  {profile.handle}
                </Link>
                <div
                  style={{
                    position: "relative",
                    marginTop: 8,
                    marginLeft: 5,
                  }}
                >
                  <Hidden smDown>
                    {profile.state === "online" ? (
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
                  </Hidden>
                </div>
              </div>
            </div>
          </Paper>
          <Paper elevation={4} className={classes.main}>
            <div
              id="chatViewport"
              className={classes.textLogs}
              onLoad={handleScrollBottom}
            >
              <List className={classes.list}>
                <Messages uid2={usersIds} imageUrl={profile.imageUrl} />
              </List>
            </div>
            <ClickAwayListener onClickAway={() => setGiftsOpen(false)}>
              <div>
                <GiftArea>
                  <Collapse in={giftsOpen} timeout={400} collapsedHeight={27}>
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
                  </Collapse>
                </GiftArea>
                <div className={classes.emojis}>
                  <div style={{ marginTop: "auto", padding: "0px 8px" }}>
                    <ButtonBase
                      onClick={() => setEmojisOpen(true)}
                      style={{
                        marginRight: 6,
                        borderRadius: 9,
                      }}
                    >
                      <FontAwesomeIcon icon={faKissWinkHeart} size="2x" />
                    </ButtonBase>
                    <ButtonBase
                      onClick={() => setGiftsOpen(true)}
                      style={{ borderRadius: 5 }}
                    >
                      <FontAwesomeIcon icon={faGift} size="2x" />
                    </ButtonBase>
                  </div>
                  {emojisOpen ? (
                    <ClickAwayListener onClickAway={() => setEmojisOpen(false)}>
                      <div className="picker">
                        <Picker
                          style={{ width: "18em" }}
                          showPreview={false}
                          showSkinTones={false}
                          defaultSkin={1}
                          onClick={handleEmojiClick}
                          native
                          exclude={["flags"]}
                          i18n={{
                            search: "Meklēt",
                            categories: {
                              recent: "Bieži lietotie",
                              smileys: "Smaidiņi & cilvēki",
                              people: "Cilvēki & ķermenis",
                              nature: "Dzīvnieki & daba",
                              foods: "Pārtika & dzērieni",
                              activity: "Aktivitātes",
                              places: "Ceļojumi & vietas",
                              objects: "Objekti",
                              symbols: "Simboli",
                            },
                          }}
                        />
                      </div>
                    </ClickAwayListener>
                  ) : null}
                </div>
              </div>
            </ClickAwayListener>
            <div className={classes.textArea}>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <input
                  id="textBoxInput"
                  name="text"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={classes.textField}
                  maxLength="310"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Sūtīt
                </Button>
              </form>
            </div>
          </Paper>
        </div>
        <div className={classes.rightSection} />
      </Container>
      <Footer />
    </div>
  ) : (
    <Fragment />
  );
}

export default Chat;
