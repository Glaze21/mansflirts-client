import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { closeChat } from "../redux/actions/dataActions";
import { Scrollbars } from "rc-scrollbars";
import { isEmpty, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import {
  listenChat,
  listenNotification,
  rtdb_and_local_fs_presence,
} from "../redux/actions/userActions";

// MUI
import {
  Paper,
  Typography,
  List,
  Button,
  ListItem,
  ListItemAvatar,
  Badge,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Container,
  useMediaQuery,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: 0,
    marginRight: 0,
  },
  chatGrid: {
    position: "fixed",
    right: 0,
    top: 0,
    bottom: 0,
    paddingTop: 65,
    width: 260,
    display: "block",
    boxSizing: "border-box",
  },
  chatListContainer: {
    minHeight: 210,
    height: "58%",
  },
  notifListContainer: {
    minHeight: 160,
    height: "33%",
  },
  paperContacts: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    marginTop: theme.spacing(5),
  },
  paperChat: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: theme.spacing(5.1),
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%",
    width: "100%",
  },
  titleBox: {
    backgroundColor: "#DB4183",
    color: "white",
    margin: "-16px 0px -8px 0px",
    padding: "12px 0px 14px 12px",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    fontSize: "1.175rem",
    fontWeight: "500",
  },
  chatContactsContainer: {
    height: "inherit",
  },
  chatReqContainer: {
    height: "inherit",
  },
  listItemUnread: {
    height: "3rem",
    "&.MuiListItem-secondaryAction": {
      paddingRight: 34,
      paddingLeft: 9,
    },
    border: "1px solid white",
    transition: "border 0.3s",
    borderRadius: 5,
    "&:hover": {
      border: "1px solid #e81969",
      backgroundColor: "white",
    },
  },
  listItemRead: {
    backgroundColor: "#f5f5f5",
    height: "3rem",
    "&.MuiListItem-secondaryAction": {
      paddingRight: 34,
      paddingLeft: 9,
    },
    transition: "border 0.3s",
    borderRadius: 5,
    border: "1px solid #f5f5f5",
    "&:hover": {
      border: "1px solid #e81969",
      backgroundColor: "#f5f5f5",
    },
  },
  userContainer: {
    display: "flex",
    height: "3rem",
  },
  handleContainer: {
    marginTop: -1,
    width: 134,
    height: "auto",
    position: "relative",
    overflow: "hidden",
  },
  closeBtn: {
    "&:hover": {
      color: "white",
      backgroundColor: "#DB4183",
    },
  },
  selected: {
    border: "1px solid #e6e6e6",
    backgroundColor: "#e6e6e6",
    "&:hover": {
      border: "1px solid #e81969",
      backgroundColor: "#e6e6e6",
    },
  },
  chatBtn: {
    fontSize: 11.5,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 500,
    lineHeight: 1.167,
    letterSpacing: "0em",
    textTransform: "uppercase",
    borderRadius: 10,
    maxWidth: 50,
    minWidth: 40,
    marginRight: 8,
    "&:hover": {
      backgroundColor: "#bb1354",
    },
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

function ChatSide(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  let history = useHistory();
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);
  const userId = auth.uid;

  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    if (!isEmpty(auth)) {
      dispatch(listenChat());
      dispatch(listenNotification());
      rtdb_and_local_fs_presence();
    }
  }, [auth.uid]);

  let { allOpenChats, allNotifications } = props.data;

  useEffect(() => {
    if (["/about", "/privacy", "/terms", "/faq"].includes(location)) {
      setTrigger(false);
    } else {
      setTrigger(true);
    }
  }, [location]);

  var all_notifs = JSON.parse(JSON.stringify(allNotifications));
  var all_chats = JSON.parse(JSON.stringify(allOpenChats));

  useEffect(() => {
    var notif = allNotifications.filter((e) => e.read === false);
    var chats = allOpenChats.filter((e) => e.read === false);

    if (notif.length > 0 || chats.length > 0) {
      document.title = `(${
        notif.length + chats.length
      }) Mansflirts.lv - Atrodi savu ideālo partneri`;
    } else {
      document.title = "Mansflirts.lv - Atrodi savu ideālo partneri";
    }
    // eslint-disable-next-line
  }, [all_notifs, all_chats]);

  const handleClose = (type, uid2) => (e) => {
    closeChat(userId, type, uid2, history);
  };
  const handleClick = (uid1, uid2, type) => (e) => {
    firestore.doc(`openChats/${uid1}/${type}/${uid2}`).update({
      read: true,
    });
  };
  const matches = useMediaQuery("(min-width:930px)");
  return (
    !isEmpty(auth) &&
    matches &&
    trigger && (
      <Container style={{ maxWidth: "342" }} className={classes.container}>
        <div className={classes.chatGrid} style={{ zIndex: 5 }}>
          <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <div className={classes.chatListContainer}>
              <Paper className={classes.paperContacts} elevation={2}>
                <div className={classes.titleBox}>
                  <span className={classes.title}>Mani kontakti</span>
                </div>
                <hr
                  style={{
                    border: "0.5px solid #C2C2C2",
                    marginBottom: 0,
                    width: "inherit",
                  }}
                />
                <div
                  className={classes.chatContactsContainer}
                  style={{ zIndex: 6 }}
                >
                  <Scrollbars
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                  >
                    <List disablePadding>
                      {allOpenChats.length !== 0 ? (
                        allOpenChats.map((openChat, key) => {
                          let user1 = userId;
                          let user2 = openChat.userId;
                          return (
                            <ListItem
                              key={key}
                              id={`listItem_${key}`}
                              button
                              className={
                                openChat.read
                                  ? classes.listItemRead
                                  : classes.listItemUnread
                              }
                              divider
                              component={NavLink}
                              activeClassName={classes.selected}
                              onClick={handleClick(user1, user2, "users2")}
                              to={
                                `/chat/` +
                                (user1 < user2
                                  ? user1 + "_" + user2
                                  : user2 + "_" + user1)
                              }
                            >
                              <div className={classes.userContainer}>
                                <ListItemAvatar
                                  style={{
                                    alignSelf: "center",
                                    minWidth: 50,
                                  }}
                                >
                                  {openChat.state === "online" ? (
                                    <StyledBadgeGreen
                                      overlap="circle"
                                      anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                      }}
                                      variant="dot"
                                    >
                                      <Avatar alt="" src={openChat.imageUrl} />
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
                                      <Avatar
                                        alt="Remy Sharp"
                                        src={openChat.imageUrl}
                                      />
                                    </StyledBadgeRed>
                                  )}
                                </ListItemAvatar>
                                <div className={classes.handleContainer}>
                                  <ListItemText
                                    primary={
                                      <Typography
                                        style={{
                                          fontSize: openChat.read ? 16 : 17,
                                        }}
                                      >
                                        {openChat.handle}
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography
                                        style={{
                                          marginTop: -4,
                                          color: openChat.read
                                            ? "grey"
                                            : "black",
                                          fontSize: 14,
                                          lineHeight: "22px",
                                          maxHeight: 20,
                                        }}
                                      >
                                        {openChat.type === "gift"
                                          ? "Dāvana"
                                          : openChat.msg}
                                      </Typography>
                                    }
                                  />
                                </div>
                              </div>
                              <ListItemSecondaryAction style={{ right: 8 }}>
                                <IconButton
                                  className={classes.closeBtn}
                                  size="small"
                                  onClick={handleClose(
                                    "users2",
                                    openChat.userId
                                  )}
                                >
                                  <CloseIcon edge="end" fontSize="inherit" />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          );
                        })
                      ) : (
                        <Fragment />
                      )}
                    </List>
                  </Scrollbars>
                </div>
              </Paper>
            </div>
            <div className={classes.notifListContainer}>
              <Paper className={classes.paperChat} elevation={3}>
                <div className={classes.titleBox}>
                  <span className={classes.title}>Uzaicinājumi Čatot</span>
                </div>
                <hr
                  style={{
                    border: "0.5px solid #C2C2C2",
                    marginBottom: 0,
                    width: "inherit",
                  }}
                />
                <div className={classes.chatReqContainer}>
                  <Scrollbars
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                    style={{ height: "100%" }}
                  >
                    <List disablePadding>
                      {allNotifications.length !== 0 ? (
                        allNotifications.map((notif, key) => {
                          let user1 = userId;
                          let user2 = notif.userId;
                          return (
                            <ListItem
                              key={key}
                              id={`listItem_${key}`}
                              button
                              className={
                                notif.read
                                  ? classes.listItemRead
                                  : classes.listItemUnread
                              }
                              activeClassName={classes.selected}
                              divider
                              component={NavLink}
                              onClick={handleClick(
                                user1,
                                user2,
                                "notifications"
                              )}
                              to={
                                `/chat/` +
                                (user1 < user2
                                  ? user1 + "_" + user2
                                  : user2 + "_" + user1)
                              }
                            >
                              <div className={classes.userContainer}>
                                <ListItemAvatar
                                  style={{
                                    alignSelf: "center",
                                    minWidth: 50,
                                  }}
                                >
                                  <Avatar alt="" src={notif.imageUrl} />
                                </ListItemAvatar>
                                <div className={classes.handleContainer}>
                                  <ListItemText
                                    primary={
                                      <Typography
                                        style={{
                                          marginTop: -2,
                                          fontWeight: "bold",
                                          fontSize: 17,
                                        }}
                                      >
                                        {notif.handle}
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography
                                        style={{
                                          marginTop: -4,
                                          color: "black",
                                          fontSize: 14,
                                          fontWeight: "bold",
                                          lineHeight: "22px",
                                          maxHeight: 20,
                                        }}
                                      >
                                        {notif.type === "gift"
                                          ? "Dāvana"
                                          : notif.msg}
                                      </Typography>
                                    }
                                  />
                                </div>
                              </div>
                              <ListItemSecondaryAction style={{ right: 8 }}>
                                {notif.read ? (
                                  <IconButton
                                    className={classes.closeBtn}
                                    size="small"
                                    onClick={handleClose(
                                      "notifications",
                                      notif.userId
                                    )}
                                  >
                                    <CloseIcon edge="end" fontSize="inherit" />
                                  </IconButton>
                                ) : (
                                  <Button
                                    className={classes.chatBtn}
                                    color="primary"
                                    variant="contained"
                                    component={Link}
                                    onClick={handleClick(
                                      user1,
                                      user2,
                                      "notifications"
                                    )}
                                    to={
                                      `/chat/` +
                                      (user1 < user2
                                        ? user1 + "_" + user2
                                        : user2 + "_" + user1)
                                    }
                                  >
                                    Lasīt
                                  </Button>
                                )}
                              </ListItemSecondaryAction>
                            </ListItem>
                          );
                        })
                      ) : (
                        <Fragment />
                      )}
                    </List>
                  </Scrollbars>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </Container>
    )
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(ChatSide);
