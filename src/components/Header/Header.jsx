import React from 'react'
import { PrevLink } from './PrevLink/PrevLink'
import { Date } from './Date/Date'
import { UserPanel } from './UserPanel/UserPanel'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
        <PrevLink/>
        <Date/>
        <UserPanel/>
    </header>
  )
}
