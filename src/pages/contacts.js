import React, { Fragment } from "react";
import { useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";
import { Scrollbars } from "rc-scrollbars";
import Footer from "../components/footer/Footer";
import { closeChat } from "../redux/actions/dataActions";
// MUI
import {
  Paper,
  Container,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(12),
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(16),
    },
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  contactsDiv: {
    paddingRight: 260,
    paddingLeft: 260,
    [theme.breakpoints.down(1350)]: {
      paddingLeft: 0,
    },
    [theme.breakpoints.down(930)]: {
      paddingRight: 0,
    },
  },
  centerDiv: {
    maxWidth: 950,
    width: "100%",
    position: "relative",
  },
  middleSection: {
    height: "calc(100vh - 10rem)",
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(8),
  },
  listItem: {
    height: "7rem",
    [theme.breakpoints.down("xs")]: {
      height: "6rem",
    },
  },
  listItemRead: {
    backgroundColor: "#f5f5f5",
    height: "7rem",
    [theme.breakpoints.down("xs")]: {
      height: "6rem",
    },
  },
  userContainer: {
    display: "flex",
  },
  aboutUser: {
    display: "flex",
    paddingTop: 12,
  },
  title: {
    height: "auto",
    position: "relative",
    fontSize: 22,
  },
  message: {
    paddingTop: 4,
    height: 74,
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      overflow: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      height: 57,
    },
  },
  imageWrapper: {
    marginLeft: "-16px",
    display: "block",
    width: "7rem",
    height: "7rem",
    [theme.breakpoints.down("xs")]: {
      width: "6rem",
      height: "6rem",
    },
    objectFit: "cover",
    marginRight: "auto",
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
  closeBtn: {
    padding: 8,
    [theme.breakpoints.down("xs")]: {
      padding: 4,
    },
    "&:hover": {
      color: "white",
      backgroundColor: "#DB4183",
    },
  },
}));

function Contacts(props) {
  const classes = useStyles();
  const userId = useSelector((state) => state.firebase.profile.userId);
  const { allOpenChats } = props.data;

  const handleCloseChat = (uid2) => (e) => {
    closeChat(userId, "users2", uid2);
  };

  return (
    <div className={classes.container}>
      <div className={classes.contactsDiv}>
        <Container className={classes.centerDiv}>
          <Paper elevation={4} className={classes.middleSection}>
            <Scrollbars style={{ width: "100%" }}>
              <List disablePadding>
                {allOpenChats.length !== 0 ? (
                  allOpenChats.map((openChat) => {
                    let key = allOpenChats.findIndex(
                      (chat) => chat === openChat
                    );
                    let user1 = userId;
                    let user2 = openChat.userId;
                    return (
                      <Fragment key={key}>
                        {" "}
                        <ListItem
                          button
                          className={
                            openChat.read
                              ? classes.listItemRead
                              : classes.listItem
                          }
                          divider
                          component={Link}
                          to={
                            `/chat/` +
                            (user1 < user2
                              ? user1 + "_" + user2
                              : user2 + "_" + user1)
                          }
                        >
                          <div className={classes.userContainer}>
                            <img
                              alt=""
                              src={openChat.imageUrl}
                              className={classes.imageWrapper}
                            />
                            <div style={{ paddingLeft: 12 }}>
                              <div className={classes.aboutUser}>
                                <div className={classes.title}>
                                  {openChat.handle}
                                </div>
                                <div
                                  style={{
                                    position: "relative",
                                    marginTop: 7,
                                    marginLeft: 5,
                                  }}
                                >
                                  {openChat.state === "online" ? (
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
                              </div>
                              <div className={classes.message}>
                                <span style={{ fontSize: 18 }}>
                                  {openChat.msg}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={handleCloseChat(openChat.userId)}
                              className={classes.closeBtn}
                            >
                              <CloseIcon edge="end" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </Fragment>
                    );
                  })
                ) : (
                  <Fragment />
                )}
              </List>
            </Scrollbars>
          </Paper>
        </Container>
      </div>{" "}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(Contacts);
