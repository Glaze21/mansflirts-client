import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

function MyButton({
  children,
  onClick,
  tip,
  btnClassName,
  style,
  tipClassName,
  component,
  to,
  edge,
  href,
}) {
  return (
    <Tooltip title={tip} className={tipClassName} placement="top">
      <IconButton
        edge={edge}
        onClick={onClick}
        className={btnClassName}
        style={style}
        component={component}
        to={to}
        href={href}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}

export default MyButton;
