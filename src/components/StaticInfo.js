import React, { Fragment, useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  updatePass,
  updateEmail,
  updateDob,
} from "../redux/actions/userActions";

// MUI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fcfcfc",
    display: "flex",
    padding: "16px 0 0 16px",
    [theme.breakpoints.down("xs")]: {
      padding: "0 0 16px 0",
    },
    height: 350,
  },
  paperDetails: {
    flex: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  aboutTitle: {
    fontSize: 26,
    [theme.breakpoints.down("xs")]: {
      fontSize: 23,
    },
    display: "inline-block",
    marginTop: 16,
    marginBottom: 16,
  },
  helpText: {
    color: "grey",
    marginTop: -12,
    fontSize: 14,
  },
  ageContainer: {
    display: "flex",
    maxWidth: 315,
  },
  signupDay: {
    position: "relative",
    flex: "0 0 30%",
  },
  signupMonth: {
    position: "relative",
    flex: "0 0 30%",
  },
  signupYear: {
    position: "relative",
    flex: "1 1 40%",
    textAlign: "right",
  },
  passContainer: {
    marginTop: 12,
    maxWidth: 315,
  },
  emailContainer: {
    marginTop: 12,
    maxWidth: 315,
  },
  dobContainer: {
    position: "relative",
    marginTop: 12,
    maxWidth: 315,
  },
  passBorder: {
    display: "flex",
    border: "1px solid #bfbfbf",
    borderRadius: 5,
    alignItems: "center",
    height: 38,
  },
  password: {
    width: "100%",
    position: "relative",
    padding: 6,
  },
  button: {
    fontSize: 9.5,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 500,
    lineHeight: 1.167,
    letterSpacing: "0em",
    textTransform: "uppercase",
    borderRadius: 10,
    maxWidth: 48,
    minWidth: 40,
    marginRight: 8,
    "&:hover": {
      backgroundColor: "#bb1354",
    },
  },
}));

const dayValue = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];
const monthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const yearValue = [
  2020,
  2019,
  2018,
  2017,
  2016,
  2015,
  2014,
  2013,
  2012,
  2011,
  2010,
  2009,
  2008,
  2007,
  2006,
  2005,
  2004,
  2003,
  2002,
  2001,
  2000,
  1999,
  1998,
  1997,
  1996,
  1995,
  1994,
  1993,
  1992,
  1991,
  1990,
  1989,
  1988,
  1987,
  1986,
  1985,
  1984,
  1983,
  1982,
  1981,
  1980,
  1979,
  1978,
  1977,
  1976,
  1975,
  1974,
  1973,
  1972,
  1971,
  1970,
  1969,
  1968,
  1967,
  1966,
  1965,
  1964,
  1963,
  1962,
  1961,
  1960,
  1959,
  1958,
  1957,
  1956,
  1955,
  1954,
  1953,
  1952,
  1951,
  1950,
  1949,
  1948,
  1947,
  1946,
  1945,
  1944,
  1943,
  1942,
  1941,
  1940,
  1939,
  1938,
  1937,
  1936,
  1935,
  1934,
  1933,
  1932,
  1931,
  1930,
  1929,
  1928,
  1927,
  1926,
  1925,
];

function StaticInfo(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const auth = useSelector((state) => state.firebase.auth);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [errors, setErr] = useState({});
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [openDialogEmail, setOpenDialogEmail] = useState(false);
  const [openDialogPass, setOpenDialogPass] = useState(false);
  const [dobBtn, setDobBtn] = useState(false);
  const [usingFB, setUsingFB] = useState(false);

  useEffect(() => {
    if (auth.providerData[0].providerId === "facebook.com") setUsingFB(true);

    setErr(props.UI.errors === null ? "" : props.UI.errors);
  }, [props.UI.errors]);

  useEffect(() => {
    if ((day && month && year) !== "") setDobBtn(true);
  }, [day, month, year]);

  const handleSubmitPass = (e) => {
    e.preventDefault();
    dispatch(updatePass(oldPass, newPass));
    setOldPass("");
    setOpenDialogPass(false);
  };
  const handleOpenEmail = (e) => {
    e.preventDefault();
    setOpenDialogEmail(true);
  };
  const handleOpenPass = (e) => {
    e.preventDefault();
    setOpenDialogPass(true);
  };
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    dispatch(updateEmail(oldPass, email));
    setEmail("");
    setOpenDialogEmail(false);
  };
  return (
    <Fragment>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper} id="paperStaticInfo">
          <div className={classes.paperDetails}>
            <p component="h2" className={classes.aboutTitle}>
              Personīgā informācija
            </p>
            <p className={classes.helpText}>* Dati, kas netiks publicēti.</p>
            <div className={classes.passContainer}>
              <FormLabel component="legend" style={{ color: "#000000b5" }}>
                Nomainīt Paroli
              </FormLabel>{" "}
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <FormHelperText>Jaunā parole</FormHelperText>
                  <div className={classes.passBorder}>
                    <InputBase
                      id="new-password"
                      name="newPassword"
                      type="password"
                      error={errors.passwordNewFail ? true : false}
                      value={newPass}
                      onChange={(event) => setNewPass(event.target.value)}
                      className={classes.password}
                      autoComplete="new-password"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleOpenPass}
                      type="button"
                      disabled={usingFB}
                    >
                      Mainīt
                    </Button>
                    <Dialog open={openDialogPass}>
                      <form noValidate onSubmit={handleSubmitPass}>
                        <DialogContent>
                          <DialogContentText>
                            Lūdzu, ievadiet veco paroli, lai nomainītu paroli.
                          </DialogContentText>
                          <input
                            hidden
                            readOnly
                            type="password"
                            id="new-password"
                            name="newPassword"
                            value={newPass}
                            autoComplete="new-password"
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            label="Parole"
                            type="password"
                            style={{
                              width: "100%",
                            }}
                            id="current-password"
                            name="oldPassword"
                            size="small"
                            required
                            value={oldPass}
                            onChange={(event) => setOldPass(event.target.value)}
                            autoComplete="current-password"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            type="reset"
                            onClick={() => {
                              setNewPass("");
                              setOldPass("");
                              setOpenDialogPass(false);
                            }}
                            color="primary"
                          >
                            Atcelt
                          </Button>
                          <Button color="primary" type="submit">
                            Turpināt
                          </Button>
                        </DialogActions>
                      </form>
                    </Dialog>
                  </div>
                </div>
              </div>
              {errors.passwordOldFail && (
                <Box color="error.main">{errors.passwordOldFail}</Box>
              )}
              {errors.passwordOldSuccess && (
                <Box color="success.main">{errors.passwordOldSuccess}</Box>
              )}
              {errors.passwordNewFail && (
                <Box color="error.main">{errors.passwordNewFail}</Box>
              )}
            </div>
            <div className={classes.emailContainer}>
              <FormLabel component="legend" style={{ color: "#000000b5" }}>
                Nomainīt E-pastu
              </FormLabel>{" "}
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <FormHelperText>Jaunais e-pasts </FormHelperText>
                  <div className={classes.passBorder}>
                    <InputBase
                      fullWidth
                      id="new-email"
                      name="email"
                      type="email"
                      error={errors.emailFail ? true : false}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={classes.password}
                      autoComplete="email"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleOpenEmail}
                      type="submit"
                      disabled={usingFB}
                    >
                      Mainīt
                    </Button>
                  </div>
                </div>
              </div>
              {errors.emailFail && (
                <Box color="error.main">{errors.emailFail}</Box>
              )}
              {errors.emailSuccess && (
                <Box color="success.main">{errors.emailSuccess}</Box>
              )}
              {errors.emailPassFail && (
                <Box color="error.main">{errors.emailPassFail}</Box>
              )}
              <Dialog open={openDialogEmail}>
                <form noValidate onSubmit={handleSubmitEmail}>
                  <DialogContent>
                    <DialogContentText>
                      Lūdzu, ievadiet paroli, lai nomainītu e-pastu.
                    </DialogContentText>
                    <input
                      autoComplete="email"
                      name="email"
                      hidden
                      value={email}
                      type="email"
                      readOnly
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Parole"
                      type="password"
                      style={{
                        width: "100%",
                      }}
                      id="current-password"
                      name="oldPassword"
                      size="small"
                      required
                      value={oldPass}
                      onChange={(event) => setOldPass(event.target.value)}
                      autoComplete="current-password"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        setOpenDialogEmail(false);
                        setOldPass("");
                      }}
                      color="primary"
                    >
                      Atcelt
                    </Button>
                    <Button color="primary" type="submit">
                      Turpināt
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </div>
            <div className={classes.dobContainer}>
              {" "}
              <FormLabel component="legend" style={{ color: "#000000b5" }}>
                Nomainīt dzimšanas datumu
              </FormLabel>
              <Grid container className={classes.ageContainer}>
                <Grid item className={classes.signupDay}>
                  <FormHelperText>Diena</FormHelperText>
                  <FormControl variant="outlined" style={{ width: "95%" }}>
                    <Select
                      margin="dense"
                      native
                      value={day}
                      onChange={(event) => setDay(event.target.value)}
                      inputProps={{
                        name: "day",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {dayValue.map((dayValue) => (
                        <option key={dayValue} value={dayValue}>
                          {dayValue}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item className={classes.signupMonth}>
                  <FormHelperText>Mēnesis</FormHelperText>
                  <FormControl variant="outlined" style={{ width: "95%" }}>
                    <InputLabel
                      htmlFor="outlined-age-native-simple"
                      style={{ marginTop: -7, fontSize: 14 }}
                    ></InputLabel>
                    <Select
                      margin="dense"
                      native
                      value={month}
                      onChange={(event) => setMonth(event.target.value)}
                      inputProps={{
                        name: "month",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {monthValue.map((monthValue) => (
                        <option key={monthValue} value={monthValue}>
                          {monthValue}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item className={classes.signupYear}>
                  <FormHelperText>Gads</FormHelperText>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel
                      htmlFor="outlined-age-native-simple"
                      style={{ marginTop: -7, fontSize: 14 }}
                    ></InputLabel>
                    <Select
                      margin="dense"
                      native
                      value={year}
                      onChange={(event) => setYear(event.target.value)}
                      inputProps={{
                        name: "year",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {yearValue.map((yearValue) => (
                        <option key={yearValue} value={yearValue}>
                          {yearValue}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {errors.dobFail && (
                  <Box color="error.main">{errors.dobFail}</Box>
                )}
                {dobBtn && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ position: "absolute", right: 0, top: 1 }}
                    onClick={() =>
                      dispatch(updateDob(`${day}/${month}/${year}`))
                    }
                  >
                    Mainīt
                  </Button>
                )}
                {errors.day && <Box color="error.main">{errors.day}</Box>}
              </Grid>
            </div>
          </div>
        </Paper>
      </Grid>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({ UI: state.UI });

export default connect(mapStateToProps, {})(StaticInfo);
