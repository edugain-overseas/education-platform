import React from 'react'
import {ReactComponent as LogoutIcon} from '../../images/icons/logout.svg'
import styles from './LogoutButton.module.scss'

export const LogoutButton = () => {
  return (
    <button className={styles.LogoutButton}>
      <LogoutIcon />
      <span>Log out</span>
    </button>
  );
}
