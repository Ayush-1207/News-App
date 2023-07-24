import React from "react";
import { Link } from "react-router-dom";
// import classes from './NavItem.module.css';

const NavItem = (props) => {
  if (props.hide) return null;

  return (
    <li>
      <Link
        to={{
          pathname: props.to,
          hash: props.hash || "",
          search: props.search || "",
        }}
      >
        {props.label}
      </Link>
    </li>
  );
};

export default NavItem;
