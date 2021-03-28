import React, { Fragment, useState } from "react";
import {
  uploadImage,
  addImage,
  removeImage,
} from "../redux/actions/userActions";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FsLightbox from "fslightbox-react";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  mainProfile: {
    position: "relative",
    marginBottom: theme.spacing(3),
    backgroundSize: "cover",
  },
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1),
    },
  },
  profileDetails: {
    display: "flex",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      paddingTop: 10,
    },
  },
  imageWrapper: {
    paddingRight: 16,
    flex: "0 0 16rem",
    overflow: "hidden",
    position: "relative",
    maxWidth: "100%",
    [theme.breakpoints.down(980)]: {
      flex: "0 0 23rem",
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 0,
      flex: "0 0 34rem",
    },
  },
  imageBtn: {
    paddingTop: "90%",
    display: "block",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
  },
  userTitle: {
    display: "flex",
    fontSize: 26,
    [theme.breakpoints.only("xs")]: {
      fontSize: 20,
    },
  },
  userBio: {
    wordBreak: "break-word",
    fontSize: 20,
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  addPhotos: {
    display: "inline-block",
    minWidth: "165px",
    fontSize: 17,
    textAlign: "center",
    marginTop: 50,
  },
  addPhotosTxt: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    marginBottom: 25,
    marginLeft: 25,
    width: "70%",
  },
  addPhotosBtn: {
    letterSpacing: 0.2,
    fontSize: 13,
    width: "85%",
    color: "white",
    backgroundColor: "#7f7f7f",
    "&:hover": {
      backgroundColor: "#424141",
    },
  },
  wrapper: {
    display: "flex",
    position: "relative",
    width: "100%",
  },
  photosWrapper: {
    position: "relative",
    display: "inline-block",
  },
  userImages: {
    boxSizing: "border-box",
    "&:hover": {
      border: "solid 2px #ef4183",
    },
    padding: theme.spacing(0),
    width: 183.6,
    height: 173.6,
    objectFit: "cover",
    marginLeft: "auto",
    marginRight: "auto",
  },
  removePhoto: {
    fontSize: 20,
    color: "#000000cf",
    position: "absolute",
    top: 0,
    right: 0,
  },
  rightArrow: {
    position: "absolute",
    right: -5,
    top: 62,
    color: "white",
  },
  leftArrow: {
    position: "absolute",
    left: 170,
    top: 62,
    color: "white",
  },
  mobileHandle: {
    [theme.breakpoints.down(400)]: {
      fontSize: "5vw",
    },
  },
}));

const AddPhotoBtn = styled.div`
  width: -webkit-fill-available;
  width: -moz-available;
  position: absolute;
  bottom: 0;
  left: 0;
  letter-spacing: 0.2;
  fontsize: 15px;
  border-radius: 4px;
  padding: 6px;
  color: white;
  background-color: #7f7f7f;
  :hover {
    background-color: #424141;
  }
`;

function StaticProfile(props) {
  const { handle, imageUrl, height, age, bio, userImages } = props.profile;

  const classes = useStyles();
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  const openLightboxOnSlide = (number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    uploadImage(formData);
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  const handlePhotosChange = (event) => {
    var files = event.target.files;
    var fileLength = event.target.files.length;
    const formData = new FormData();
    for (var i = 0; i < fileLength; i++) {
      if (i < 8) {
        const image = files[i];
        formData.append("image", image, image.name);
      }
    }
    addImage(formData);
  };
  const handleEditPhotos = () => {
    const fileInput = document.getElementById("photosInput");
    fileInput.click();
  };
  const handleRemovePhoto = (link) => {
    removeImage(link);
  };
  const handleScroll = (direction) => (e) => {
    var element = document.getElementById("images");
    element.scrollBy(direction, 0);
  };

  return (
    <Fragment>
      <Paper className={classes.mainProfile}>
        <Grid container className={classes.container}>
          <Grid item className={classes.imageWrapper}>
            <div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="imageInput"
                hidden="hidden"
                onChange={handleImageChange}
              />
              <Button
                onClick={handleEditPicture}
                className={classes.imageBtn}
                style={{ backgroundImage: `url(${imageUrl})` }}
              >
                {imageUrl.includes(
                  "https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/no-img_512x512.png?alt=media"
                ) && <AddPhotoBtn>Pievieno bildi</AddPhotoBtn>}
              </Button>
            </div>
          </Grid>
          <Grid item xs sm md style={{ minWidth: "62%" }}>
            <div className={classes.profileDetails}>
              <div>
                <Typography
                  component="h1"
                  className={classes.userTitle}
                  gutterBottom
                >
                  <div>
                    {handle},{" "}
                    <span className={classes.mobileHandle}>
                      {age}
                      {height && <Fragment>,</Fragment>} {height}
                      {height && <Fragment>cm</Fragment>}
                    </span>
                  </div>
                </Typography>
                <Typography className={classes.userBio} paragraph>
                  {bio}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ marginBottom: 24, height: 173.6 }}>
        <div className={classes.wrapper}>
          <div className={classes.photosWrapper}>
            <Grid item xs className={classes.addPhotos}>
              <div className={classes.addPhotosTxt}>
                Pievienot vēl <br /> bildes
              </div>
              <Fragment>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple="multiple"
                  id="photosInput"
                  hidden="hidden"
                  onChange={handlePhotosChange}
                />
                <Button
                  onClick={handleEditPhotos}
                  className={classes.addPhotosBtn}
                >
                  Pievienot bildes
                </Button>
              </Fragment>
            </Grid>
          </div>
          <div className="scrolls" id="images">
            {userImages !== undefined ? (
              <div style={{ width: 183.64 * userImages.length }}>
                {userImages.map((image, key) => {
                  return (
                    <div
                      id={`profile_image#${key}`}
                      key={key}
                      className={classes.photosWrapper}
                    >
                      <img
                        src={image}
                        alt="Profila bilde"
                        className={classes.userImages}
                        onClick={() => openLightboxOnSlide(key + 2)}
                      />
                      <IconButton
                        size="small"
                        disableRipple
                        disableFocusRipple
                        className={classes.removePhoto}
                        onClick={handleRemovePhoto.bind(this, image)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  );
                })}
                {userImages.length > 5 ? (
                  <Fragment>
                    <IconButton
                      size="small"
                      disableRipple
                      disableFocusRipple
                      className={classes.leftArrow}
                      onClick={handleScroll(-200)}
                    >
                      <ArrowBackIosIcon style={{ fontSize: 35 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      disableRipple
                      disableFocusRipple
                      className={classes.rightArrow}
                      onClick={handleScroll(200)}
                    >
                      <ArrowForwardIosIcon style={{ fontSize: 35 }} />
                    </IconButton>
                  </Fragment>
                ) : (
                  <Fragment />
                )}
              </div>
            ) : (
              <div style={{ width: 0 }} />
            )}
          </div>
        </div>
      </Paper>
      <FsLightbox
        disableLocalStorage
        toggler={lightboxController.toggler}
        type="image"
        sources={[imageUrl].concat(userImages)}
        slide={lightboxController.slide}
        key={[imageUrl].concat(userImages).length}
      />
    </Fragment>
  );
}

export default StaticProfile;
