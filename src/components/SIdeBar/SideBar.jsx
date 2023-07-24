import React from 'react'
import { NavBar } from './NavBar/NavBar'
import { NotificationBar } from './NotificationBar/NotificationBar'
import { LogoutButton } from './LogoutButton/LogoutButton'
import styles from './SideBar.module.scss'

export const SideBar = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.logo}>logo</p>
      <NavBar />
      <NotificationBar/>
      <LogoutButton/>
    </div>
  )
}

