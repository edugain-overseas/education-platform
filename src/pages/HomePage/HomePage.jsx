import React from 'react'
import { UserInfoPanel } from '../../components/UserInfoPanel/UserInfoPanel'
import styles from './HomePage.module.scss'
import { SchedulePanel } from '../../components/SchedulePanel/SchedulePanel'

export function HomePage() {
  return (
    <div className={styles.mainWrapper}>
      <UserInfoPanel/>
      <SchedulePanel/>
    </div>
  )
}
