import React from 'react'
import LessonCardItem from './LessonCardItem/LessonCardItem'
import styles from './LessonsCardList.module.scss'

export default function LessonsCardList({lessons}) {
  return (
    <ul className={styles.lessonsCardList}>
        {lessons.map(lesson=><LessonCardItem key={lesson.lesson_id} lesson={lesson}/>)}
    </ul>
  )
}
