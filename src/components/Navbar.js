import React, { useEffect, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import MyButton from "../util/MyButton";
import BuyCoinsPopper from "./BuyCoinsPopper";
import Search from "./SearchPopper";
import { logoutUser } from "../redux/actions/userActions";
import { buyCoinsDialog } from "../redux/actions/dataActions";
import { isEmpty } from "react-redux-firebase";
// MUI stuff
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Hidden,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
// Icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import ForumIcon from "@material-ui/icons/Forum";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    maxHeight: "inherit",
    [theme.breakpoints.down("xs")]: {
      padding: "0 0",
    },
  },
  toolbarBottom: {
    margin: "0 -16px",
    backgroundColor: "#f7f7f7",
    maxHeight: "inherit",
    padding: "0 0",
    [theme.breakpoints.down("xs")]: {
      borderBottom: "1px solid #e0e0e0",
      boxShadow: "0 4px 6px -6px black",
    },
  },
  toolbarLogo: {
    width: "inherit",
    height: 65,
  },
  toolbarLogoContainer: {
    width: 120,
    textAlign: "center",
  },
  toolbarLogoContainerMobile: {
    width: 90,
    textAlign: "center",
  },
  navbarTxtBtns: {
    "&:hover": {
      backgroundColor: "#EF4183",
      color: "white",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
  navbarIcoBtns: {
    fontSize: 30,
    [theme.breakpoints.down(330)]: {
      fontSize: 25,
    },
  },
  navbarLogoutBtn: {
    borderRadius: 5,
    padding: 6,
    marginRight: 16,
    "&:hover": {
      backgroundColor: "#EF4183",
      color: "white",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
  selected: {
    backgroundColor: "#EF4183",
    color: "white",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  buyCoinsButton: {
    margin: "0 18px",
    color: "white",
    backgroundColor: "#EF4183",
    "&:hover": {
      backgroundColor: "#c72b66",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 11,
      margin: "0 12px 0 0",
    },
  },
  coinAmmount: {
    display: "block",
    textAlign: "center",
    fontSize: 21,
    color: "#ec2f77",
    fontWeight: 500,
  },
  buyCoinsTxt: {
    fontSize: 17,
    placeSelf: "center",
    color: "black",
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
}));

function Navbar(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const profile = useSelector((state) => state.firebase.profile);
  const auth = useSelector((state) => state.firebase.auth);
  const coins = profile.coins;
  const {
    data: { allNotifications },
  } = props;
  useEffect(() => {
    window.onscroll = () => {
      var a = document.getElementById("hiddenToolbar");
      if (a !== null) {
        if (window.scrollY === 0) {
          document.getElementById("navBar").style.top = "0";
        } else {
          document.getElementById("navBar").style.top = "-65px";
        }
      }
    };
  });
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleBuyCoins = () => {
    dispatch(buyCoinsDialog(true));
  };

  const matchesBuyBtn = useMediaQuery("(min-width:825px)");
  const matches = useMediaQuery("(min-width:801px)");
  const sidebarGone = useMediaQuery("(min-width:930px), (max-width:800px)");
  const sm = useMediaQuery("(max-width:600px)");
  return !isEmpty(auth) ? (
    <AppBar
      id="navBar"
      style={{
        transition: "top 0.4s",
        backgroundColor: "#f7f7f7",
        maxHeight: 65,
      }}
    >
      <Container style={{ maxWidth: 1500, maxHeight: "inherit" }}>
        <Hidden smUp>
          <Toolbar className={classes.toolbar} id="hiddenToolbar">
            <Button className={classes.buyCoinsButton} onClick={handleBuyCoins}>
              Pirkt monētas
            </Button>
            <div className={classes.buyCoinsTxt}>
              <span className={classes.coinAmmount}>{coins ? coins : 0}</span>
              <span>Monētas</span>
            </div>
            <div style={{ flex: 1 }}></div>
            <div className={classes.toolbarLogoContainerMobile}>
              <Link to="/" style={{ width: "inherit" }}>
                <img
                  src="/logo.jpg"
                  alt="logo"
                  style={{ width: "inherit", paddingTop: 4 }}
                />
              </Link>
            </div>
          </Toolbar>
        </Hidden>
        <Toolbar className={classes.toolbarBottom}>
          <div className={classes.toolbarLogoContainer}>
            <Link to="/" style={{ width: "inherit" }}>
              <img src="/logo.jpg" alt="logo" className={classes.toolbarLogo} />
            </Link>
          </div>
          <Hidden xsDown>
            <div style={{ display: "flex" }}>
              {matchesBuyBtn ? (
                <Button
                  className={classes.buyCoinsButton}
                  onClick={handleBuyCoins}
                >
                  Pirkt monētas
                </Button>
              ) : (
                <Button
                  className={classes.buyCoinsButton}
                  onClick={handleBuyCoins}
                >
                  Pirkt
                </Button>
              )}
              <div className={classes.buyCoinsTxt}>
                <span className={classes.coinAmmount}>{coins ? coins : 0}</span>
                <span>Monētas</span>
              </div>
            </div>
          </Hidden>
          <div style={{ flex: 1 }}></div>
          <Search />
          {!sidebarGone ? (
            <Fragment>
              <Button
                size="large"
                color="primary"
                className={classes.navbarTxtBtns}
                component={NavLink}
                activeClassName={classes.selected}
                to={"/notifications"}
              >
                Paziņojumi
              </Button>
            </Fragment>
          ) : !matchesBuyBtn ? (
            <Fragment>
              <MyButton
                size="large"
                tip="Paziņojumi"
                color="primary"
                component={Link}
                to={"/notifications"}
              >
                {allNotifications.filter((e) => e.read === false).length > 0 ? (
                  <NotificationsActiveIcon
                    color="primary"
                    className={classes.navbarIcoBtns}
                  />
                ) : (
                  <NotificationsIcon
                    color="primary"
                    className={classes.navbarIcoBtns}
                  />
                )}
              </MyButton>
            </Fragment>
          ) : (
            <Fragment />
          )}
          {!matches ? (
            <Fragment>
              <MyButton
                size="large"
                tip="Kontakti"
                color="primary"
                component={Link}
                to={"/contacts"}
              >
                <ForumIcon color="primary" className={classes.navbarIcoBtns} />
              </MyButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                size="large"
                color="primary"
                className={classes.navbarTxtBtns}
                component={NavLink}
                activeClassName={classes.selected}
                to={"/contacts"}
              >
                Kontakti
              </Button>
            </Fragment>
          )}
          {sm ? (
            <MyButton
              size="large"
              tip=""
              color="primary"
              component={Link}
              to={"/"}
            >
              <HomeRoundedIcon
                color="primary"
                className={classes.navbarIcoBtns}
              />
            </MyButton>
          ) : (
            <Fragment />
          )}
          {!matches ? (
            <MyButton
              tip="Profils"
              color="inherit"
              component={Link}
              to={`/my_profile`}
            >
              <AccountCircle
                color="primary"
                className={classes.navbarIcoBtns}
              />
            </MyButton>
          ) : (
            <Button
              size="large"
              color="primary"
              className={classes.navbarTxtBtns}
              component={NavLink}
              activeClassName={classes.selected}
              to={`/my_profile`}
            >
              Profils
            </Button>
          )}
          <MyButton
            tip="Izrakstīties"
            color="inherit"
            btnClassName={classes.navbarLogoutBtn}
            onClick={handleLogout}
          >
            <KeyboardReturn className={classes.navbarIcoBtns} />
          </MyButton>
        </Toolbar>
      </Container>
      )
      <BuyCoinsPopper />
    </AppBar>
  ) : (
    <Fragment />
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(Navbar);
