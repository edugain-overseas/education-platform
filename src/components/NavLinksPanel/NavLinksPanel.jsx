import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserType } from "../../redux/user/userSelectors";
import styles from "./NavLinksPanel.module.scss";

export default function NavLinksPanel({ renderLinks }) {
  const userType = useSelector(getUserType)

  const navLinkActiveHandler = ({ isActive }) => {
    const classes = [styles.navLink];
    if (isActive) classes.push(styles["navLink--active"]);
    return classes.join(" ");
  };
  return (
    <div className={userType === 'student' ? styles.navBarWrapper : `${styles.navBarWrapper} ${styles.teacherNavBarWrapper}`}>
      {renderLinks.map((link, index) => (
        <NavLink key={index} className={navLinkActiveHandler} to={link.to}>
          {link.content}
        </NavLink>
      ))}
    </div>
  );
}
