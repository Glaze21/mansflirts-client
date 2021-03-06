import React, { Fragment, useState, useEffect } from "react";
import MyButton from "../util/MyButton";
import { editUserDetails } from "../redux/actions/userActions";
// MUI
import {
  TextField,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, withStyles } from "@material-ui/styles";

const cities = require("../util/cities.js");

const useStyles = makeStyles((theme) => ({
  button: {
    verticalAlign: "middle",
    float: "right",
  },
  editIcon: {
    fontSize: 24,
  },
  formControl: {
    alignSelf: "center",
    margin: "5px auto 5px auto",
    paddingBottom: 10,
  },
}));

const CssSelectField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "pink",
      },
      "&:hover fieldset": {
        borderColor: "#EF4183",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#EF4183",
      },
    },
  },
})(FormControl);

function EditDetails(props) {
  const classes = useStyles();
  const [info, setInfo] = useState({
    handle: "",
    bio: "",
    website: "",
    location: "",
    education: "",
    work: "",
    drink: "",
    smoke: "",
    height: "",
    sound: false,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    mapUserDetailsToState(props.credentials);
  }, []);

  const mapUserDetailsToState = (credentials) => {
    setInfo({
      handle: credentials.handle ? credentials.handle : "",
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
      education: credentials.education ? credentials.education : "",
      work: credentials.work ? credentials.work : "",
      drink: credentials.drink ? credentials.drink : "",
      smoke: credentials.smoke ? credentials.smoke : "",
      height: credentials.height ? credentials.height : "",
      sound: localStorage.sound === undefined ? "true" : localStorage.sound,
    });
  };
  const maxLengthCheck = (e) => {
    if (info.height.length > 2) {
      e.target.value = e.target.value.slice(0, 3);
    }
  };
  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(props.credentials);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const handleSound = (e) => {
    setInfo({ ...info, sound: e.target.value });
    localStorage.setItem("sound", e.target.value);
  };
  const handleSubmit = () => {
    const userDetails = {
      handle: info.handle,
      bio: info.bio,
      website: info.website,
      location: info.location,
      education: info.education,
      work: info.work,
      drink: info.drink,
      smoke: info.smoke,
      height: info.height,
    };
    editUserDetails(userDetails);
    handleClose();
  };
  return (
    <Fragment>
      <MyButton
        tip="Redi????t inform??ciju"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon className={classes.editIcon} />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle> Izmain??t savu inform??ciju </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="handle"
              type="text"
              label="V??rds"
              placeholder="K?? tevi sauc?"
              className={classes.textField}
              value={info.handle}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: "17" }}
            />
            <TextField
              name="bio"
              type="text"
              label="Apraksts"
              multiline
              rows="6"
              placeholder="??ss apraksts par tevi."
              className={classes.textField}
              value={info.bio}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: "260" }}
            />
            <CssSelectField className={classes.formControl} fullWidth>
              <InputLabel>Dz??ves vieta</InputLabel>
              <Select
                margin="dense"
                id="locationSelect"
                value={info.location}
                onChange={handleChange}
                name="location"
                value={info.location}
                onChange={handleChange}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </CssSelectField>
            <TextField
              name="education"
              type="text"
              label="Izgl??t??ba"
              placeholder="Iest??de kuru esi pabeidzis vai kur?? ??obr??d stud??."
              className={classes.textField}
              value={info.education}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: "32" }}
            />
            <TextField
              name="work"
              type="text"
              label="Darba vieta"
              placeholder="Kur tu str??da?"
              className={classes.textField}
              value={info.work}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: "32" }}
            />
            <CssSelectField className={classes.formControl} fullWidth>
              <InputLabel>Vai tu dzer alkaholu?</InputLabel>
              <Select
                margin="dense"
                name="drink"
                value={info.drink}
                onChange={handleChange}
              >
                <MenuItem value="Nedzeru">Nedzeru</MenuItem>
                <MenuItem value="Tikai sv??tkos">Tikai sv??tkos</MenuItem>
                <MenuItem value="Da??reiz">Da??reiz</MenuItem>
                <MenuItem value="Bie??i">Bie??i</MenuItem>
              </Select>
            </CssSelectField>
            <CssSelectField className={classes.formControl} fullWidth>
              <InputLabel>Vai tu sm???????</InputLabel>
              <Select
                margin="dense"
                name="smoke"
                value={info.smoke}
                onChange={handleChange}
              >
                <MenuItem value="Nesm??????ju">Nesm??????ju</MenuItem>
                <MenuItem value="Da??reiz">Da??reiz</MenuItem>
                <MenuItem value="Bie??i">Bie??i</MenuItem>
              </Select>
            </CssSelectField>
            <TextField
              name="height"
              label="Garums (cm)"
              placeholder="Tavs augums cm"
              className={classes.textField}
              value={info.height}
              onChange={handleChange}
              fullWidth
              type="number"
              onInput={maxLengthCheck}
            />
            <CssSelectField className={classes.formControl} fullWidth>
              <InputLabel>Ska??a</InputLabel>
              <Select
                margin="dense"
                name="sound"
                value={info.sound}
                onChange={handleSound}
              >
                <MenuItem value={"true"}>Iesl??gta</MenuItem>
                <MenuItem value={"false"}>Izsl??gta</MenuItem>
              </Select>
            </CssSelectField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Atcelt</Button>
          <Button onClick={handleSubmit}>Saglab??t</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default EditDetails;
