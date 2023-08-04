import React from "react";
import { NavBar } from "./NavBar/NavBar";
import { NotificationBar } from "./NotificationBar/NotificationBar";
import { LogoutButton } from "./LogoutButton/LogoutButton";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.scss";

export const SideBar = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.logo}>
        logo
      </Link>
      <NavBar />
      <NotificationBar />
      <LogoutButton />
    </div>
  );
};
