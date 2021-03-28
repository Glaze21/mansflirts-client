import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { isEmpty } from "react-redux-firebase";
import Link from "@material-ui/core/Link";
import AppBar from "./AppBar";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "linear-gradient(to right, #ff5858, #f857a6);",
  },
  toolbar: {
    padding: "0 24px",
    display: "flex",
    position: "relative",
    alignItems: "center",
    height: 70,
    justifyContent: "space-between",
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontFamily: `"Alata", "sans-serif"`,
    fontSize: 23,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
    "&:hover": {
      color: "pink",
    },
  },
  linkSecondary: {
    color: "#4e0032c2",
    "&:hover": {
      color: "pink",
    },
  },
}));
function FooterNavBar() {
  const auth = useSelector((state) => state.firebase.auth);
  const classes = useStyles();
  return (
    <Fragment>
      {isEmpty(auth) ? (
        <div>
          <AppBar position="fixed" className={classes.appbar}>
            <div className={classes.toolbar}>
              <div className={classes.right}>
                <Link
                  color="inherit"
                  underline="none"
                  className={classes.rightLink}
                  href="/login"
                >
                  {"Ienākt"}
                </Link>
                <Link
                  underline="none"
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  href="/signup"
                >
                  {"Reģistrēties"}
                </Link>
              </div>
            </div>
          </AppBar>
          <div className={classes.placeholder} />
        </div>
      ) : (
        <div style={{ marginTop: 120 }}></div>
      )}
    </Fragment>
  );
}

export default FooterNavBar;
