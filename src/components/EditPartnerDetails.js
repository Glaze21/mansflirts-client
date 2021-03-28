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
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, withStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    verticalAlign: "middle",
    float: "right",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      margin: 0,
      width: "unset",
    },
    margin: "auto",
    width: "fit-content",
  },
  box: {
    [theme.breakpoints.down("xs")]: {
      padding: "16px 8px",
    },
  },
  text: {
    verticalAlign: "middle",
    marginRight: 6,
    marginLeft: 6,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  formControl: {
    alignSelf: "center",
    minWidth: 85,
    marginRight: 8,
    [theme.breakpoints.down("xs")]: {
      flex: 1,
      marginRight: 0,
    },
  },
  submit: {
    margin: "0 16px 12px 0",
    "&:hover": {
      backgroundColor: "#bb1354",
    },
  },
  cancel: {
    margin: "0 16px 16px 0",
    "&:hover": {
      backgroundColor: "#757575",
      borderColor: "#757575",
    },
    borderColor: "grey",
    color: "white",
    backgroundColor: "grey",
  },
  age: {
    marginRight: 8,
    maxWidth: 65,
    alignSelf: "center",
    [theme.breakpoints.down("xs")]: {
      minWidth: "unset",
      maxWidth: "inherit",
    },
  },
}));

const CssTextField = withStyles({
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
})(TextField);

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

function EditPartnerDetails(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    idealPartner: "",
    gender: "any",
    minAge: 18,
    maxAge: 35,
  });

  useEffect(() => {
    mapUserDetailsToState(props.credentials);
  }, []);

  const mapUserDetailsToState = (credentials) => {
    setInfo({
      idealPartner: credentials.idealPartner ? credentials.idealPartner : "",
      gender: credentials.lookingFor ? credentials.lookingFor : "any",
      minAge: credentials.minAge ? credentials.minAge : 18,
      maxAge: credentials.maxAge ? credentials.maxAge : 35,
    });
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
  const handleSubmit = () => {
    const userDetails = {
      lookingFor: info.gender,
      minAge:
        info.minAge > 99 ? "18" : info.minAge < 18 ? "18" : info.minAge + "",
      maxAge:
        info.maxAge > 99 ? "95" : info.maxAge < 18 ? "35" : info.maxAge + "",
      idealPartner: info.idealPartner,
    };
    editUserDetails(userDetails);
    handleClose();
  };
  return (
    <Fragment>
      <MyButton
        tip="Rediģēt informāciju"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle className={classes.box}>
          <form className={classes.form} noValidate>
            <div style={{ display: "inline-flex" }}>
              <p className={classes.text}>Es meklēju: </p>
              <CssSelectField
                className={classes.formControl}
                variant="outlined"
              >
                <Select
                  margin="dense"
                  name="gender"
                  value={info.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="any">Jebkuru</MenuItem>
                  <MenuItem value="female">Sievieti</MenuItem>
                  <MenuItem value="male">Vīrieti</MenuItem>
                </Select>
              </CssSelectField>
            </div>
            <div style={{ display: "inline-flex" }}>
              <p className={classes.text}>Vecumā no: </p>
              <CssTextField
                margin="dense"
                name="minAge"
                variant="outlined"
                className={classes.age}
                value={info.minAge}
                onChange={handleChange}
                type="number"
              />
              <p className={classes.text}>līdz </p>
              <CssTextField
                margin="dense"
                name="maxAge"
                variant="outlined"
                className={classes.age}
                style={{ marginRight: 0 }}
                value={info.maxAge}
                onChange={handleChange}
                type="number"
              />
            </div>
          </form>
        </DialogTitle>
        <DialogContent className={classes.box}>
          <form>
            <CssTextField
              label="Ideālais partneris"
              autoFocus
              name="idealPartner"
              type="text"
              multiline
              variant="outlined"
              rows="3"
              inputProps={{ maxLength: "240" }}
              placeholder="Kāds ir jūsu ideālais partneris?"
              value={info.idealPartner}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.cancel}
            variant="outlined"
            color="primary"
            onClick={handleClose}
          >
            Atcelt
          </Button>
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Saglabāt
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default EditPartnerDetails;
