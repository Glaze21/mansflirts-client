import React from "react";
import MuiAppBar from "@material-ui/core/AppBar";

function AppBar(props) {
  return <MuiAppBar elevation={0} position="static" {...props} />;
}

export default AppBar;
