import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components//footer/Footer";
// MUI
import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  CssBaseline,
  Box,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  FormLabel,
  Checkbox,
  Container,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
// Redux
import { connect, useDispatch } from "react-redux";
import { signupUser, signupFB } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  signupContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  signupWrapper: {
    backgroundColor: "#f7f7f7",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  paperSignup: {
    display: "flex",
    padding: theme.spacing(3, 4, 6, 4),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1.5, 1, 3, 1),
    },
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  ageTitle: {
    margin: "8px 8px 4px 8px",
  },
  ageContainer: {
    display: "flex",
    maxWidth: "100%",
    padding: 8,
  },
  signupDay: {
    position: "relative",
    flex: "0 0 30%",
  },
  signupMonth: {
    position: "relative",
    flex: "1 1 30%",
  },
  signupYear: {
    position: "relative",
    flex: "0 0 40%",
    textAlign: "right",
  },
  signupRules: {
    marginTop: "-10px",
  },
  submit: {
    fontFamily: "Open Sans, sans-serif",
    margin: theme.spacing(1, 0, 4, 0),
    "&:hover": {
      backgroundColor: "#bb1354",
    },
  },
  signupLinks: {
    color: "black",
    fontSize: "16px",
  },
  facebook: {
    marginTop: theme.spacing(1),
    width: 250,
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f7f7f7",
    fontWeight: 600,
    color: "#3B5998",
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

function Signup(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [errors, setErr] = useState({});
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [checkedB, setCheckedB] = useState(false);
  const [gender, setGender] = useState("");
  const [lookingFor, setLookingFor] = useState("female");

  useEffect(() => {
    var errors = props.UI.errors;
    if (errors !== null) setErr(errors);
    return () => (errors = null);
  }, [props.UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
      day: day,
      month: month,
      year: year,
      gender: gender,
      checkedB: checkedB,
      lookingFor: lookingFor,
    };
    dispatch(signupUser(newUserData));
  };
  const responseFacebook = () => {
    // dispatch(signupFB());
  };
  const { loading } = props.UI;
  return (
    <div className={classes.signupContainer}>
      <div
        style={{
          backgroundImage: "url(/signupImage.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          flex: 1,
        }}
      >
        <Container
          component={Paper}
          elevation={8}
          maxWidth="sm"
          className={classes.signupWrapper}
        >
          <CssBaseline />
          <div className={classes.paperSignup}>
            <img src="/logoNoTxt.jpeg" alt="logo" style={{ width: 75 }} />
            <Typography
              style={{ fontFamily: "Alata, sans-serif", fontSize: 26 }}
            >
              Reģistrēties
            </Typography>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={responseFacebook}
                className={classes.facebook}
                disabled={loading}
                startIcon={<i className="fa fa-facebook"></i>}
              >
                Ienākt ar Facebook
              </Button>
            </Grid>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="handle"
                    name="handle"
                    type="text"
                    label="Vārds"
                    autoComplete="fname"
                    variant="outlined"
                    fullWidth
                    autoFocus
                    helperText={errors.handle}
                    error={errors.handle ? true : false}
                    value={handle}
                    onChange={(event) => setHandle(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Apstiprināt Paroli"
                    variant="outlined"
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    fullWidth
                    autoComplete="new-password"
                  />
                </Grid>
                <FormLabel component="legend" className={classes.ageTitle}>
                  Dzimšanas diena
                </FormLabel>
                <Grid container className={classes.ageContainer}>
                  <Grid item className={classes.signupDay}>
                    <FormHelperText>Diena</FormHelperText>
                    <FormControl variant="outlined" style={{ width: "97%" }}>
                      <Select
                        native
                        value={day}
                        onChange={(event) => setDay(event.target.value)}
                        inputProps={{
                          name: "day",
                          shrink: "true",
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
                    <FormControl variant="outlined" style={{ width: "100%" }}>
                      <Select
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
                    <FormControl variant="outlined" style={{ width: "98%" }}>
                      <Select
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
                  {errors.day && <Box color="error.main">{errors.day}</Box>}
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Meklēju</FormLabel>
                    <RadioGroup
                      defaultValue="female"
                      aria-label="meklēju"
                      name="customized-radios"
                    >
                      <FormControlLabel
                        name="lookingFor"
                        value="female"
                        control={<Radio />}
                        label="Sievietes"
                        onChange={(event) => setLookingFor(event.target.value)}
                      />
                      <FormControlLabel
                        name="lookingFor"
                        value="male"
                        control={<Radio />}
                        label="Vīriešus"
                        onChange={(event) => setLookingFor(event.target.value)}
                      />
                      <FormControlLabel
                        name="lookingFor"
                        value="any"
                        control={<Radio />}
                        label="Jebkuru"
                        onChange={(event) => setLookingFor(event.target.value)}
                      />
                    </RadioGroup>
                    {errors.lookingFor && (
                      <Box color="error.main">{errors.lookingFor}</Box>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Dzimums</FormLabel>
                    <RadioGroup
                      defaultValue=""
                      aria-label="dzimums"
                      name="customized-radios"
                    >
                      <FormControlLabel
                        name="gender"
                        value="female"
                        control={<Radio />}
                        label="Sieviete"
                        onChange={(event) => setGender(event.target.value)}
                      />
                      <FormControlLabel
                        name="gender"
                        value="male"
                        control={<Radio />}
                        label="Vīrietis"
                        onChange={(event) => setGender(event.target.value)}
                      />
                    </RadioGroup>
                    {errors.gender && (
                      <Box color="error.main">{errors.gender}</Box>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.signupRules}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="checkedB"
                        id="noteikumi"
                        color="primary"
                        checked={checkedB}
                        onChange={(event) => setCheckedB(event.target.checked)}
                        required
                      />
                    }
                    label="Piekrītu"
                    style={{ marginRight: 6 }}
                  />
                  <label htmlFor="noteikumi">
                    <Link className={classes.signupAgree} to="/terms">
                      noteikumiem
                    </Link>
                    <span className={classes.signupAgree}> un </span>
                    <Link className={classes.signupAgree} to="/privacy">
                      privātuma politikai
                    </Link>
                  </label>
                  <Box color="error.main">{errors.checkedB}</Box>
                </Grid>{" "}
                {errors.general && (
                  <Box color="error.main">{errors.general}</Box>
                )}
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                  >
                    Reģistrēties
                    {loading && (
                      <CircularProgress
                        size={30}
                        style={{ position: "absolute" }}
                      />
                    )}
                  </Button>
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item className={classes.signupLinks}>
                  Jau ir konts?{" "}
                  <Link to="/login" className={classes.signupLinks}>
                    Pieraksties šeit
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser, signupFB })(Signup);
