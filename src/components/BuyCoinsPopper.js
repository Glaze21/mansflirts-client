import React, { Fragment, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { buyCoinsDialog } from "../redux/actions/dataActions";
import { useFirestore } from "react-redux-firebase";

// MUI
import { Button, Dialog } from "@material-ui/core";
import { goToCheckout } from "../redux/actions/userActions";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  banner: {
    padding: "4rem 0",
    background: "url(/banner.webp) no-repeat center center",
    backgroundSize: "cover",
  },
  bannerText: {
    backgroundColor: "rgba(255,255,255,.5)",
    padding: 10,
    margin: "0 77px",
    [theme.breakpoints.down("xs")]: {
      margin: "0 45px",
      fontSize: 21,
    },
    color: "#b75379",
    fontSize: 27,
    textAlign: "center",
  },
  main: {
    width: "100%",
    overflow: "hidden",
  },
  bottom: {
    width: "100%",
    overflow: "hidden",
  },
  confirmWrapper: {
    padding: "10px 10px",
    display: "flex",
    flexDirection: "column",
  },
  coinWrapper: {
    padding: "10px 10px",
    display: "flex",
    flexDirection: "column",
  },
  coinBtn: {
    margin: "0.25rem",
    height: "45px",
  },
  coinTxt: {
    display: "flex",
    fontSize: 16,
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
    textTransform: "none",
    flex: "auto",
    padding: "0 16px",
  },
  buyCoinsButton: {
    marginLeft: "auto",
    marginRight: "0.25rem",
    color: "white",
    backgroundColor: "#EF4183",
    "&:hover": {
      backgroundColor: "#c72b66",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 11,
    },
  },
}));

function BuyCoinsPopper(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const firestore = useFirestore();
  const userId = useSelector((state) => state.firebase.auth.uid);

  const [selectedCoin, setSelectedCoin] = useState(null);

  const handleClose = () => {
    dispatch(buyCoinsDialog());
  };
  const handleClick = (coin, event) => {
    if (selectedCoin !== null) {
      if (selectedCoin[0] !== coin[0]) {
        document.getElementById(selectedCoin[0]).style.backgroundColor =
          "white";
      }
    }
    setSelectedCoin(coin);
    document.getElementById(coin[0]).style.backgroundColor = "#fddce9e0";
  };
  const handleSubmit = async () => {
    firestore.get({ collection: "customers", doc: userId }).then((doc) => {
      goToCheckout({
        customerId: doc.data().stripeId,
        unit_amount: selectedCoin[1].unit_amount,
        desc: selectedCoin[1].description,
      });
    });
  };
  const {
    UI: { openCoinsPopper },
    data: { allCoins },
  } = props;
  return !allCoins === [] ? (
    <Fragment />
  ) : (
    <Fragment>
      <Dialog
        open={openCoinsPopper}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <div>
          <div className={classes.banner}>
            <div className={classes.bannerText}>Iegādāties Monētas</div>
          </div>
          <div className={classes.main}>
            <div
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "#757575",
                padding: "6px 52px 0px",
                display: "flex",
              }}
            >
              <span>ziņa - 30 Monētas</span>
              <span style={{ flex: 1 }} />
              <span>dāvana - 50 Monētas</span>
            </div>
            <div className={classes.coinWrapper}>
              {allCoins.map((coin) => {
                return (
                  <Button
                    id={coin[0]}
                    key={coin[0]}
                    variant="outlined"
                    color="secondary"
                    className={classes.coinBtn}
                    onClick={handleClick.bind(this, coin)}
                  >
                    <div className={classes.coinTxt}>
                      <div>
                        {coin[1].unit_amount.toString().length === 4
                          ? coin[1].unit_amount.toString().substring(0, 2) +
                            ",99 EUR"
                          : coin[1].unit_amount.toString().substring(0, 1) +
                            ",99 EUR"}
                      </div>
                      <div style={{ flex: 1 }} />
                      <div>{coin[1].description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
          <div className={classes.bottom}>
            {selectedCoin !== null ? (
              <div className={classes.confirmWrapper}>
                <Button
                  className={classes.buyCoinsButton}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Turpināt
                </Button>
              </div>
            ) : (
              <Fragment />
            )}
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

export default connect(mapStateToProps, {})(BuyCoinsPopper);
