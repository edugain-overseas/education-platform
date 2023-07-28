import React from "react";
import styles from "./NavLinksPanel.module.scss";
import { NavLink } from "react-router-dom";

export default function NavLinksPanel({ renderLinks }) {
  const navLinkActiveHandler = ({ isActive }) => {
    const classes = [styles.navLink];
    if (isActive) classes.push(styles["navLink--active"]);
    return classes.join(" ");
  };
  return (
    <div className={styles.navBarWrapper}>
      {renderLinks.map((link, index) => (
        <NavLink key={index} className={navLinkActiveHandler} to={link.to}>
          {link.content}
        </NavLink>
      ))}
    </div>
  );
}
