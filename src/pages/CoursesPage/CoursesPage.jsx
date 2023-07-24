import React from "react";
import styles from "./CoursesPage.module.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserGroup } from "../../redux/user/userSelectors";

export default function CoursesPage() {
  const groupName = useSelector(getUserGroup);

  const navLinkActiveHandler = ({ isActive }) => {
    const classes = [styles.navLink];
    if (isActive) classes.push(styles["navLink--active"]);
    return classes.join(" ");
  };
  return (
    <div>
      <div className={styles.navBarWrapper}>
        <NavLink className={navLinkActiveHandler} to={groupName}>
          courses group {groupName}
        </NavLink>
        <NavLink className={navLinkActiveHandler} to="dopcourses">
          dop courses
        </NavLink>
        <NavLink className={navLinkActiveHandler} to="archive">
          archive
        </NavLink>
      </div>
      <Outlet/>
    </div>
  );
}
