import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as HomeIcon } from "../../images/icons/home.svg";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";
import styles from './NavBar.module.scss'

export const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.navLink}>
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink to="/schedule" className={styles.navLink}>
        <GridIcon />
        <span>Schedule</span>
      </NavLink>
      <NavLink to="/courses" className={styles.navLink}>
        <GridIcon />
        <span>Courses</span>
      </NavLink>
      <NavLink to="/task" className={styles.navLink}>
        <GridIcon />
        <span>My tasks</span>
      </NavLink>
      <NavLink to="/register" className={styles.navLink}>
        <GridIcon />
        <span>Register</span>
      </NavLink>
    </nav>
  );
}