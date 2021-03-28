import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { loginUser, signupFB } from "../redux/actions/userActions";
// MUI
import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  CssBaseline,
  Box,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
// Redux
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  image: {
    width: 160,
    paddingBottom: theme.spacing(2.5),
  },
  backgroundImage: {
    backgroundImage: "url(/login_photo.webp)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paperLogin: {
    flexShrink: 1,
    margin: theme.spacing(10.5, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    fontFamily: "Open Sans, sans-serif",
    display: "grid",
    placeItems: "center",
    width: "auto",
    margin: "40px auto 36px auto",
    "&:hover": {
      backgroundColor: "#bb1354",
    },
  },
  loginWithText: {
    fontSize: 16,
    display: "inherit",
    textAlign: "center",
    marginBottom: 28,
  },
  facebook: {
    width: 250,
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "white",
    fontWeight: 600,
    color: "#3B5998",
  },
  // google: {
  //   width: 250,
  //   fontFamily: "Arial, Helvetica, sans-serif",
  //   color: "black",
  //   fontWeight: 500,
  //   backgroundColor: "white",
  // },
  loginLinks: {
    color: "black",
    fontSize: "16px",
  },
  newAccTxt: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
}));

// const StyledBadgeGreen = withStyles((theme) => ({
//   badge: {
//     backgroundColor: "#44b700",
//     color: "#44b700",
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     "&::after": {
//       position: "absolute",
//       top: -1,
//       left: -1,
//       width: "100%",
//       height: "100%",
//       borderRadius: "50%",
//       animation: "$ripple 1.2s infinite ease-in-out",
//       border: "1px solid currentColor",
//       content: '""',
//     },
//   },
//   dot: {
//     height: 16,
//     padding: 0,
//     minWidth: 16,
//     borderRadius: 20,
//   },
//   "@keyframes ripple": {
//     "0%": {
//       transform: "scale(.8)",
//       opacity: 1,
//     },
//     "100%": {
//       transform: "scale(2.4)",
//       opacity: 0,
//     },
//   },
// }))(Badge);
// const StyledBadgeRed = withStyles((theme) => ({
//   badge: {
//     backgroundColor: "#f53939",
//     color: "#f53939",
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     "&::after": {
//       position: "absolute",
//       top: -1,
//       left: -1,
//       width: "100%",
//       height: "100%",
//       borderRadius: "50%",
//       animation: "$ripple 1.2s infinite ease-in-out",
//       border: "1px solid currentColor",
//       content: '""',
//     },
//   },
//   dot: {
//     height: 16,
//     padding: 0,
//     minWidth: 16,
//     borderRadius: 20,
//   },
//   "@keyframes ripple": {
//     "0%": {
//       transform: "scale(.8)",
//       opacity: 1,
//     },
//     "100%": {
//       transform: "scale(2.4)",
//       opacity: 0,
//     },
//   },
// }))(Badge);

// const users = [
//   {
//     imgUrl:
//       "https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/875783096291_512x512.jpg?alt=media&token=1a9a3bfc-1c89-47ab-9beb-ecd7635fc8ce",
//     handle: "Karīna",
//     age: 30,
//     lookingFor: "Vīrieti, īsam romānam",
//   },
//   {
//     imgUrl:
//       "https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/no-img_512x512.png?alt=media",
//     handle: "Andris",
//     age: 26,
//     lookingFor: "Sievieti, vienas nakts sakaram",
//   },
//   {
//     imgUrl:
//       "https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/176895231325_512x512.png?alt=media&token=c13ddc3d-6143-44e4-82ac-2e62b5d432d0",
//     handle: "Laura",
//     age: 25,
//     lookingFor: "Vīrieti, vecumā no 24 līdz 40 gadiem",
//   },
//   {
//     imgUrl:
//       "https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/40068540993_512x512.png?alt=media&token=7ea65cfd-0b67-484b-be96-468623d35872",
//     handle: "Amēlija",
//     age: 40,
//     lookingFor: "Vīrieti, nopietnām attiecībām",
//   },
//   {
//     imgUrl:
//       "https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/387395884473_512x512.jpg?alt=media&token=409e92c4-1eb1-480a-9336-37064601daf2",
//     handle: "Maria",
//     age: 28,
//     lookingFor: "Vīrieti, kas nebaidās veidot attiecības",
//   },
//   {
//     imgUrl:
//       "https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/no-img_512x512.png?alt=media",
//     handle: "Jānis",
//     age: 25,
//     lookingFor: "Sievieti, ar ko pavadīt laiku",
//   },
// ];
const users2 = [
  {
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/984027706255_512x512.png?alt=media&token=f660f9fc-5cd3-448d-97fa-9f38763f9d46",
    handle: "Maija",
    feedback: `"Man ļoti patīk cik viegli ir sarunāties ar kādu personu! Ir tik daudz labu veidu, kā atrast sev tīkamu vīrieti un sākt sarunu!"`,
  },
  {
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/774434853323_512x512.png?alt=media&token=7d20efe3-9040-4f2d-a887-1dd10ee22eda",
    handle: "Aleksandra",
    age: 28,
    feedback: `"Agrāk nedēļas nogalēs man nebija ko darīt, bet mansflirts atradu apmēram pirms nedēļas, un es nevaru pārtraukt sarakstīties! Vīrieši šeit ir tik izskatīgi un viņiem ir tik daudz ko teikt. Nevaru sagaidīt, kad atradīšu savu ideālo partneri!"`,
  },
  {
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/image_512x512.jfif?alt=media&token=fda0f5da-90f5-41ae-a182-343df0abf3b9",
    handle: "Kārlis",
    age: 40,
    feedback: `"Wow! Esmu pārsteigts par visām skaistajām sievietēm šeit. Es pierakstījos pirms nedēļas un es nevaru pārtraukt sarakstīties!"`,
  },
];

function Login(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [errors, setErr] = useState({});

  useEffect(() => {
    var errors = props.UI.errors;
    if (errors !== null) setErr(errors);
    return () => (errors = null);
  }, [props.UI.errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email: email, password: password };
    dispatch(loginUser(userData));
  };
  const responseFacebook = () => {
    dispatch(signupFB());
  };

  const {
    UI: { loading },
  } = props;
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Grid container component="main">
        <CssBaseline />
        <Grid item xs={false} md={7} className={classes.backgroundImage} />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.paperLogin}>
            <img src="logo1.jpeg" alt="logo" className={classes.image} />
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="E-pasts"
                variant="outlined"
                helperText={errors.email}
                error={errors.email ? true : false}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
                autoComplete="email"
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Parole"
                variant="outlined"
                helperText={errors.password}
                error={errors.password ? true : false}
                value={password}
                onChange={(event) => setPass(event.target.value)}
                fullWidth
                margin="normal"
                autoComplete="current-password"
              />
              {errors.general && (
                <Typography variant="body2" color="error">
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Ienākt
                {loading && (
                  <CircularProgress
                    size={30}
                    style={{ position: "absolute" }}
                  />
                )}
              </Button>
              <span className={classes.loginWithText}>
                {" "}
                Vai pieslēdzies ar{" "}
              </span>
              <Grid container justify="center" spacing={3}>
                <Grid item style={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={responseFacebook}
                    className={classes.facebook}
                    disabled={loading}
                    startIcon={<i className="fa fa-facebook"></i>}
                  >
                    Facebook
                  </Button>
                  {errors.fbAge && (
                    <Typography variant="body2" color="error">
                      {errors.fbAge}
                    </Typography>
                  )}
                  {errors.fbEmail && (
                    <Typography variant="body2" color="error">
                      {errors.fbEmail}
                    </Typography>
                  )}
                </Grid>
                {/* <Grid item>
                    <Button
                      scope="profile email"
                      variant="outlined"
                      color="secondary"
                      className={classes.google}
                      onClick={this.responseGoogle}
                      disabled={true}
                      startIcon={
                        <img
                          width="20"
                          alt=""
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/32px-Google_%22G%22_Logo.svg.png"
                        />
                      }
                    >
                      Ienākt ar Google
                    </Button>
                  </Grid> */}
              </Grid>
              <Grid container style={{ marginTop: 50 }}>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    className={classes.loginLinks}
                    to="/reset_pass"
                  >
                    Aizmirsi paroli?
                  </Link>
                </Grid>
                <Grid item className={classes.loginLinks}>
                  <div className={classes.newAccTxt}>
                    <div style={{ paddingRight: 6 }}> Nav konta? </div>
                    <Link
                      href="#"
                      to="/signup"
                      variant="body2"
                      className={classes.loginLinks}
                    >
                      Izveido to šeit
                    </Link>
                  </div>
                </Grid>
              </Grid>
              {!sm ? <Box mt={36} /> : <Box mt={8} />}
            </form>
          </div>
        </Grid>
      </Grid>
      <div style={{ flex: 1 }} />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, {})(Login);
