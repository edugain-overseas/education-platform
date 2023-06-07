import React from 'react'
import { UserInfoPanel } from '../../components/UserInfoPanel/UserInfoPanel'
import styles from './HomePage.module.scss'
import { SchedulePanel } from '../../components/SchedulePanel/SchedulePanel'
// import { Chat } from '../../components/Chat/Chat'

export function HomePage() {
  return (
    <div className={styles.mainWrapper}>
      <UserInfoPanel/>
      <SchedulePanel/>
      {/* <Chat/> */}
    </div>
  )
}
