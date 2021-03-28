import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MyButton from "../util/MyButton";
import { filterUsers } from "../redux/actions/dataActions";
import { useSelector } from "react-redux";
// MUI stuff
import {
  Grid,
  Typography,
  ClickAwayListener,
  Slider,
  Paper,
  InputBase,
  Select,
  FormControl,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

const cities = require("../util/cities.js");

const useStyles = makeStyles((theme) => ({
  navbarTextBtns: {
    "&:hover": {
      backgroundColor: "#EF4183",
      color: "white",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
  navbarIcoBtnsMobile: {
    borderRadius: 5,
    padding: 6,
  },
  navbarIcoBtns: {
    fontSize: 30,
    [theme.breakpoints.down(330)]: {
      fontSize: 25,
    },
  },
  popperPaper: {
    position: "absolute",
    top: 65,
    right: 120,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    [theme.breakpoints.down("xs")]: {
      right: 0,
    },
  },
  titleBox: {
    display: "flex",
    backgroundColor: "#DB4183",
    color: "white",
    margin: "0 -8px -8px -8px",
    padding: "6px 0 6px 12px",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  popperTitle: {
    marginTop: 2,
    fontSize: "1.2rem",
  },
  popperGenderBtns: {
    position: "relative",
    borderRadius: 5,
    padding: 6,
    width: 80,
    height: 40,
    "&:hover": {
      backgroundColor: "#EF4183",
      color: "white",
      boxShadow: "none",
    },
    "&.MuiToggleButton-root.Mui-selected": {
      backgroundColor: "#EF4183",
      color: "white",
      boxShadow: "none",
    },
  },
  ageBox: {
    width: 20,
    fontSize: 17,
    marginTop: 6,
    borderRadius: 0,
    "&.Mui-disabled	": {
      color: "black",
      borderWidth: 0,
    },
  },
  ageSlider: {
    marginLeft: 9,
    width: "94%",
  },
  citySelect: {
    marginTop: 0,
    position: "relative",
    flex: "1 1 40%",
    textAlign: "right",
  },
  defaultsBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    fontWeight: 500,
    fontSize: 17,
    borderRadius: 5,
    height: 3,
    backgroundColor: "white",
    color: "#805d6a",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  searchBtn: {
    fontWeight: 600,
    fontSize: 19,
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 12,
    height: 15,
    backgroundColor: "#EF4183",
    color: "white",
    "&:hover": {
      backgroundColor: "#c72b66",
    },
  },
}));
function Search() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [gender, setGender] = useState("female");
  const profile = useSelector((state) => state.firebase.profile);
  const { lookingFor, maxAge, minAge } = profile;

  const [age, setAge] = useState([18, 95]);
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setGender(lookingFor === "any" ? null : lookingFor);
    setAge([parseInt(minAge), parseInt(maxAge)]);
  }, [lookingFor, maxAge, minAge]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };
  const handleAge = (e, newValue) => {
    setAge(newValue);
  };
  const handleSubmit = (e) => {
    const params = {
      gender: gender,
      minAge: age[0],
      maxAge: age[1],
      city: city,
    };
    dispatch(filterUsers(12, params));
  };
  const handleSubmitDefault = (e) => {
    const params = {
      gender: null,
      minAge: 18,
      maxAge: 95,
      city: "",
    };
    setGender(null);
    setAge([18, 95]);
    setCity("");
    dispatch(filterUsers(12, params));
  };

  const matches = useMediaQuery("(max-width:800px)");
  return (
    <Fragment>
      {matches ? (
        <MyButton
          size="large"
          tip="Meklēt"
          btnClassName={classes.navbarIcoBtnsMobile}
          onClick={() => setOpen((prev) => !prev)}
        >
          <SearchIcon color="primary" className={classes.navbarIcoBtns} />
        </MyButton>
      ) : (
        <Button
          size="large"
          tip="Meklēt"
          color="primary"
          className={classes.navbarTextBtns}
          onClick={() => setOpen((prev) => !prev)}
        >
          Meklēt
        </Button>
      )}
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper className={classes.popperPaper} elevation={6}>
            <div className={classes.titleBox}>
              <Typography className={classes.popperTitle}>Meklēt</Typography>
              <MyButton
                onClick={handleSubmitDefault}
                color="primary"
                btnClassName={classes.defaultsBtn}
                component={Link}
                to="/"
                tip=""
              >
                Noņemt filtrus
              </MyButton>
            </div>
            <hr
              style={{
                marginLeft: -8,
                marginRight: -8,
                color: "white",
              }}
            />
            <div style={{ display: "flex" }}>
              <div>
                <Typography style={{ paddingLeft: 8 }}>Dzimums</Typography>
                <ToggleButtonGroup
                  value={gender}
                  exclusive
                  onChange={(e, r) => {
                    setGender(r);
                  }}
                >
                  <ToggleButton
                    value="male"
                    className={classes.popperGenderBtns}
                  >
                    <i className="fa fa-male" style={{ fontSize: 25 }}></i>
                  </ToggleButton>
                  <ToggleButton
                    value="female"
                    className={classes.popperGenderBtns}
                  >
                    <i className="fa fa-female" style={{ fontSize: 25 }}></i>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div style={{ paddingLeft: 8 }}>
                <Typography style={{ paddingLeft: 8 }}>Pilsēta</Typography>
                <FormControl
                  margin="dense"
                  className={classes.citySelect}
                  variant="outlined"
                >
                  <Select
                    native
                    id="ageSelect"
                    value={city}
                    onChange={handleChange}
                    inputProps={{
                      name: "city",
                    }}
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div>
              <Grid container>
                {" "}
                <Grid item xs>
                  <Typography
                    gutterBottom
                    style={{ paddingLeft: 8, paddingTop: 8 }}
                  >
                    Vecums
                  </Typography>
                </Grid>
                <Grid item style={{ paddingRight: 8 }}>
                  <InputBase
                    disabled
                    id="age1"
                    value={age[0]}
                    className={classes.ageBox}
                    inputProps={{ "aria-label": "naked" }}
                  />{" "}
                  -{" "}
                  <InputBase
                    disabled
                    id="age2"
                    value={age[1]}
                    className={classes.ageBox}
                    inputProps={{ "aria-label": "naked" }}
                  />
                </Grid>
              </Grid>
              <Slider
                value={age}
                onChange={handleAge}
                className={classes.ageSlider}
                min={18}
                max={95}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
            </div>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <MyButton
                onClick={handleSubmit}
                color="primary"
                btnClassName={classes.searchBtn}
                component={Link}
                to="/"
                tip=""
              >
                Meklēt
              </MyButton>
            </Grid>
          </Paper>
        </ClickAwayListener>
      )}
    </Fragment>
  );
}

export default Search;
