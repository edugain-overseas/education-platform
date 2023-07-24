import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../../../images/icons/arrow-left.svg'
import styles from './PrevLink.module.scss'

export const PrevLink = () => {
  return (
    <Link to='/' className={styles.link}>
        <ArrowLeft/>
        Prev
    </Link>
  )
}
