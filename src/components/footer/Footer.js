import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#fff5f8",
    padding: theme.spacing(3),
  },
  aboutLink: {
    fontFamily: ["Work Sans", "sans-serif"],
    fontWeight: 400,
    lineHeight: 1.43,
    color: "black",
    fontSize: 18,
    textDecoration: "none",
    paddingRight: 15,
    paddingBottom: 30,
    "&:hover": {
      color: "#d93530",
    },
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <Fragment>
      <footer className={classes.footer}>
        {/* <Typography style={{ textAlign: "center" }} gutterBottom>
            <img src="/pink-heart.png" alt="" style={{ width: 55 }} />
          </Typography> */}
        <br />
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="div"
        >
          <Link className={classes.aboutLink} to="/privacy">
            {" "}
            Privātuma politika{" "}
          </Link>{" "}
          {/* <Link className={classes.aboutLink} to="/about">
            {" "}
            <div style={{ display: "inline-block" }}>Par Mums</div>{" "}
          </Link> */}
          <Link className={classes.aboutLink} to="/terms">
            {" "}
            Vadlīnijas{" "}
          </Link>{" "}
          <Link className={classes.aboutLink} to="/faq">
            {" "}
            Jautājumi{" "}
          </Link>{" "}
          <a className={classes.aboutLink} href="mailto:support@email.lv">
            {" "}
            info@istaiespeja.lv{" "}
          </a>
        </Typography>
      </footer>
    </Fragment>
  );
}

export default Footer;
